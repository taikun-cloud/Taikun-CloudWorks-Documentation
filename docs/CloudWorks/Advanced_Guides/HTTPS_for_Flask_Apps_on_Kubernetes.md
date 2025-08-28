# **Enable HTTPS for Flask Apps on Kubernetes (Full Guide)**

This guide walks you through setting up HTTPS for a Flask web application running on Kubernetes using **NGINX Ingress** and **cert-manager** with **Let's Encrypt** as the certificate authority.

---

## 1. Prerequisites

- A running Kubernetes cluster with access to the internet
- A working Flask app exposed as a Kubernetes Service
- A domain or sslip.io-compatible IP (e.g., `185.22.97.138.sslip.io`)
- NGINX Ingress Controller installed with support for ingressClass (e.g., `taikun`)
- cert-manager installed and configured

---

## 2. Deploy Your Flask App and Service

Ensure your Flask app is packaged in a container and deployed as a Kubernetes Deployment and Service.

**Example Service:**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: kubetestify-service
spec:
  selector:
    app: kubetestify
  ports:
    - protocol: TCP
      port: 80
      targetPort: 5000
```

---

## 3. Install cert-manager

Install cert-manager using Helm:

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager   --namespace cert-manager   --create-namespace   --set installCRDs=true
```

---

## 4. Create ClusterIssuer for Let's Encrypt

**Example ClusterIssuer** (edit the email field):

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: your-email@example.com
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-prod-account-key
    solvers:
    - http01:
        ingress:
          class: taikun
```

---

## 5. Create an Ingress Resource

**Example Ingress** using cert-manager and nginx:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: kubetestify-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/configuration-snippet: |
      if ($request_uri ~* "^/.well-known/acme-challenge/") {
        return 200;
      }
spec:
  ingressClassName: taikun
  rules:
  - host: kubetestify.185.22.97.138.sslip.io
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: kubetestify-service
            port:
              number: 80
  tls:
  - hosts:
    - kubetestify.185.22.97.138.sslip.io
    secretName: kubetestify-tls
```

---

## 6. Validate Certificate Creation

Check that cert-manager has created the Certificate and that it is marked as Ready:

```bash
kubectl get certificate kubetestify-tls
kubectl describe certificaterequest kubetestify-tls-1
kubectl get challenges
```

---

## 7. Verify HTTPS Access

Run the following to verify the HTTPS connection:

```bash
curl -v https://kubetestify.185.22.97.138.sslip.io
```

You should see output indicating a successful TLS handshake with Let's Encrypt as the issuer.

---

## 8. Automatic HTTP to HTTPS Redirect

This is handled by the nginx annotation:

```yaml
nginx.ingress.kubernetes.io/ssl-redirect: "true"
```

---

## 9. Final Notes

- Ensure DNS (or nip.io IP) resolves publicly.
- Ensure port 80 and 443 are open in your firewall.
- The token challenge path `/.well-known/acme-challenge/` must resolve to a 200 during cert validation.

### Example Full Ingress Status

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
  creationTimestamp: 2025-07-25T07:40:11.0000000Z
  generation: 5
  name: kubetestify-ingress
  namespace: default
  resourceVersion: "19356"
  uid: 60f725d0-d4cf-4fe8-af53-1ed1561f8adb
spec:
  ingressClassName: taikun
  rules:
  - host: kubetestify.185.22.97.138.sslip.io
    http:
      paths:
      - backend:
          service:
            name: kubetestify-service
            port:
              number: 80
        path: /
        pathType: Prefix
  tls:
  - hosts:
    - kubetestify.185.22.97.138.sslip.io
    secretName: kubetestify-tls
status:
  loadBalancer:
    ingress:
    - ip: 10.233.62.33
```

