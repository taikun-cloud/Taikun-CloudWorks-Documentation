# **KubeVirt VM + Ollama + Open WebUI**

This document records the full, working setup we built: a KubeVirt VM running **Ollama** (via Docker) and Open WebUI exposed through **ingress-nginx** (IngressClass taikun) on a Kubernetes cluster backed by OpenStack.

* **Outcome**: Open WebUI reachable at `http://<access-ip>.sslip.io/`, chatting with Ollama running inside a KubeVirt VM; optional public Ollama endpoint at http://api.<access-ip>.sslip.io/ (recommend keeping private).

---

## 0. Environment Snapshot

* **Kubernetes**: v1.31.x (controller logs showed v1.31.4)
* **CNI**: Calico
* **Cloud**: OpenStack (OpenStack Cloud Controller + Cinder CSI present)
* **Ingress**: NGINX in namespace taikun-ingress, Service type NodePort
    * HTTP **80 → 31746**, HTTPS **443 → 31747**
    * Controller pod scheduled on **worker** node
* **Public IP**: `<access-ip>` on the **master** VM
* **StorageClass**: cinder-csi (default)
* **KubeVirt**: Installed; virt-api, virt-controller, virt-handler, virt-operator running
* **CDI**: Installed (cdi-apiserver, cdi-deployment, cdi-uploadproxy, cdi-operator)
* **Namespaces used**:
    * vms — KubeVirt VM + Ollama
    * ai-ui — Open WebUI
* **IngressClass**: taikun

!!! Note 
	on NodePort: External access required opening TCP **31746** in the VM/cloud Security Group (OpenStack).

---

## 1. Pre-flight & Node Checks

**Check virtualization on nodes** (nested KVM if on a cloud VM):

```
egrep -o 'vmx|svm' /proc/cpuinfo | sort -u
lsmod | grep kvm
cat /sys/module/kvm_intel/parameters/nested 2>/dev/null || true
cat /sys/module/kvm_amd/parameters/nested 2>/dev/null || true
```

**virt-handler readiness / logs** if needed:

```
kubectl -n kubevirt describe pod -l kubevirt.io=virt-handler
kubectl -n kubevirt logs -l kubevirt.io=virt-handler
```

**Enable software emulation (temporary/slow)** only if KVM isn’t available:

```
kubectl -n kubevirt patch kubevirt kubevirt \
  --type=merge -p '{"spec":{"configuration":{"developerConfiguration":{"useEmulation":true}}}}'
```

**Confirm StorageClass:**

```
kubectl get sc
```

---

## 2. Install CDI (Containerized Data Importer)

```
kubectl apply -f https://github.com/kubevirt/containerized-data-importer/releases/latest/download/cdi-operator.yaml
kubectl apply -f https://github.com/kubevirt/containerized-data-importer/releases/latest/download/cdi-cr.yaml
kubectl -n cdi get pods
```

---

## 3. Namespaces

```
kubectl create ns vms || true
kubectl create ns ai-ui || true
```

---

## 4. Import Ubuntu Cloud Image (DataVolume)

(30Gi RWO, Jammy cloud image):

```
apiVersion: cdi.kubevirt.io/v1beta1
kind: DataVolume
metadata:
  name: ubuntu-22-dv
  namespace: vms
spec:
  source:
    http:
      url: "https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img"
  pvc:
    accessModes: ["ReadWriteOnce"]
    resources:
      requests:
        storage: 30Gi
    # storageClassName: cinder-csi   # set explicitly if no default
```

**Apply & wait:**

```
kubectl apply -f dv-ubuntu.yaml
kubectl -n vms wait dv/ubuntu-22-dv --for=condition=Ready --timeout=20m
```

Expect **WaitForFirstConsumer** until a pod (the VM launcher) is scheduled. That’s normal.

---

## 5. Create the KubeVirt VM (with cloud-init installing Ollama)

(2 vCPU, 6–8Gi RAM; masquerade network; Docker + Ollama):

```
apiVersion: kubevirt.io/v1
kind: VirtualMachine
metadata:
  name: ollama-vm
  namespace: vms
spec:
  running: false
  template:
    metadata:
      labels:
        kubevirt.io/domain: ollama-vm
    spec:
      domain:
        cpu:
          cores: 2
          model: host-passthrough
        resources:
          requests:
            memory: 6Gi          # bump to 8Gi if you can
        devices:
          disks:
            - name: rootdisk
              disk: { bus: virtio }
            - name: cloudinitdisk
              disk: { bus: virtio }
          interfaces:
            - name: default
              masquerade: {}
      networks:
        - name: default
          pod: {}
      volumes:
        - name: rootdisk
          dataVolume:
            name: ubuntu-22-dv
        - name: cloudinitdisk
          cloudInitNoCloud:
            userData: |
              #cloud-config
              hostname: ollama-vm
              users:
                - name: ubuntu
                  sudo: ALL=(ALL) NOPASSWD:ALL
                  groups: sudo
                  ssh_authorized_keys:
                    - "ssh-ed25519 AAAA...PUT_YOUR_PUBLIC_KEY_HERE..."
              package_update: true
              packages:
                - docker.io
                - qemu-guest-agent
                - curl
              runcmd:
                - systemctl enable --now qemu-guest-agent
                - systemctl enable --now docker
                - docker run -d --name ollama -p 11434:11434 \
                    -v /opt/ollama:/root/.ollama --restart=always \
                    ollama/ollama:latest
                - sleep 10
                # Pull a small model first (fits 6–8Gi)
                - docker exec ollama ollama pull llama3.2:3b
```

**Apply:**

```
kubectl apply -f vm-ollama.yaml
# Start it
kubectl -n vms patch vm/ollama-vm --type=merge -p '{"spec":{"running":true}}'
```

**Watch boot/import:**

```
kubectl -n vms get vmis,pods,dv,pvc -w
```

**If scheduling fails**: reduce memory to 4–6Gi, remove master taints or add tolerations, and ensure a node has enough allocatable memory.

**Master taints** (remove or tolerate):

```
# Remove taints (system-wide)
kubectl taint nodes <master-node> node-role.kubernetes.io/master-
kubectl taint nodes <master-node> node-role.kubernetes.io/control-plane-
# OR add tolerations on the VM template (we used tolerations when needed)
```

---

## 6. Internal Service to the VM (Ollama API)

```
apiVersion: v1
kind: Service
metadata:
  name: ollama-internal
  namespace: vms
spec:
  type: ClusterIP
  selector:
    kubevirt.io/domain: ollama-vm
  ports:
    - name: http
      port: 11434
      targetPort: 11434
```

**Apply:**

```yaml
kubectl apply -f - <<'YAML'
# (paste manifest above)
```

---

## 7. Deploy Open WebUI

**Deployment + Service:**

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: open-webui
  namespace: ai-ui
spec:
  replicas: 1
  selector:
    matchLabels: {app: open-webui}
  template:
    metadata:
      labels: {app: open-webui}
    spec:
      containers:
        - name: webui
          image: ghcr.io/open-webui/open-webui:latest
          env:
            - name: OLLAMA_BASE_URL
              value: http://ollama-internal.vms.svc.cluster.local:11434
          ports:
            - name: http
              containerPort: 8080
          readinessProbe:
            httpGet: { path: "/", port: http }
            initialDelaySeconds: 5
            periodSeconds: 5
          livenessProbe:
            httpGet: { path: "/", port: http }
            initialDelaySeconds: 20
            periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: open-webui
  namespace: ai-ui
spec:
  selector:
    app: open-webui
  ports:
    - name: http
      port: 80
      targetPort: http
```

**Apply & verify:**

```
kubectl apply -f open-webui.yaml
kubectl -n ai-ui rollout status deploy/open-webui
kubectl -n ai-ui get endpoints open-webui
```

Endpoint should show `POD_IP:8080` once Ready.

---

## 8. Ingress (IngressClass taikun) via NodePort Controller

**Open WebUI Ingress:**

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: open-webui
  namespace: ai-ui
  annotations:
    nginx.ingress.kubernetes.io/proxy-body-size: "64m"
spec:
  ingressClassName: taikun
  rules:
    - host: <access-ip>.sslip.io
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: open-webui
                port:
                  number: 80
```

**Apply:**

```
kubectl apply -f open-webui-ingress.yaml
```

**NodePort service (ingress-nginx)**: 80 → **31746**, 443 → **31747**.

OpenStack **Security Group** rule required:

* Allow inbound **TCP 31746** to the master’s public IP (185.22.97.124). Optionally 31747.

**Sanity tests:**

```
# From a node (Host header must match)
curl -I -H 'Host: <access-ip>.sslip.io' http://<access-ip>:31746/
# From laptop/browser
http://<access-ip>.sslip.io/
```

**If you see 502/503:**

* Ensure open-webui Service targetPort matches container port (8080).
* Check endpoint exists (kubectl -n ai-ui get endpoints open-webui).
* Ensure ingress Service externalTrafficPolicy: Cluster to accept on any node.
* Open SG/ufw for 31746.

---

## 9. (Optional) Public Ollama Ingress (recommended: keep private)

**If needed, expose the VM’s API via Ingress:**

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ollama
  namespace: vms
  annotations:
    nginx.ingress.kubernetes.io/proxy-read-timeout: "3600"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "3600"
spec:
  ingressClassName: taikun
  rules:
    - host: api.<access-ip>.sslip.io
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: ollama-internal
                port:
                  number: 11434
```

**Secure it** (basic auth):

```
printf "admin:$(openssl passwd -apr1 'changeme')\n" > auth
kubectl -n vms create secret generic ollama-basic-auth --from-file=auth
kubectl -n vms patch ingress ollama --type=merge -p '{
  "metadata":{"annotations":{
    "nginx.ingress.kubernetes.io/auth-type":"basic",
    "nginx.ingress.kubernetes.io/auth-secret":"ollama-basic-auth",
    "nginx.ingress.kubernetes.io/auth-realm":"Authentication Required"
  }}
}'
```

---

## 10. Network Policies (lock down the VM)

**Default deny** for vms and **allow only WebUI → VM**:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny
  namespace: vms
spec:
  podSelector: {}
  policyTypes: ["Ingress"]
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-openwebui-to-ollama
  namespace: vms
spec:
  podSelector:
    matchLabels:
      kubevirt.io/domain: ollama-vm
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: ai-ui
      podSelector:
        matchLabels:
          app: open-webui
    ports:
    - protocol: TCP
      port: 11434
```

**If using public Ollama Ingress**, also allow ingress-nginx → VM:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-ingressnginx-to-ollama
  namespace: vms
spec:
  podSelector:
    matchLabels:
      kubevirt.io/domain: ollama-vm
  ingress:
  - from:
      - namespaceSelector:
          matchLabels:
            kubernetes.io/metadata.name: taikun-ingress
        podSelector:
          matchLabels:
            app.kubernetes.io/name: ingress-nginx
    ports:
      - protocol: TCP
        port: 11434
```

---

## 11. Models & Memory Tuning

**Pull a small model** (fits 6–8Gi RAM):

```
kubectl -n vms run curl --rm -it --image=curlimages/curl -- \
  curl -sN -X POST -H 'Content-Type: application/json' \
  --data '{"name":"llama3.2:3b"}' \
  http://ollama-internal.vms.svc.cluster.local:11434/api/pull
```

**Generate test** with smaller context:

```
curl -s -X POST http://ollama-internal.vms.svc.cluster.local:11434/api/generate \
  -H 'Content-Type: application/json' \
  -d '{"model":"llama3.2:3b","prompt":"Say hi","options":{"num_ctx":512}}'
```

If you see model requires more memory, either increase VM memory (e.g., to **8Gi**), reduce num_ctx, or use a smaller model.

---

## 12. Troubleshooting

**PVC stuck Pending / WaitForFirstConsumer**: This is expected until the VM launcher pod schedules; start the VM to trigger binding and CDI import.

**Pod won’t schedule / Insufficient memory:**

* Reduce VM memory request to 4–6Gi or pick a larger node.
* Remove master taints or add VM tolerations.
* Check allocatable:

```
kubectl get nodes -o custom-columns=NAME:.metadata.name,ALLOC_MEM:.status.allocatable.memory
```

**Ingress 404/502:**

* Ensure spec.ingressClassName: taikun.
* Host mismatch? Test with Host header:

```
curl -I -H 'Host: <access-ip>.sslip.io' http://<NODE_IP>:31746/
```

* Service targetPort matches container port (8080) and endpoint exists.
* externalTrafficPolicy: Cluster on ingress Service.
* Open SG/ufw for NodePort 31746.

**NodePort connection refused on one node**: controller pod is on the other node and Service uses Local; switch to Cluster.
**NetworkPolicy blocked traffic**: default-deny in vms requires explicit allow rules (WebUI and/or ingress-nginx).
**Open WebUI not Ready / wrong port**: verify it listens on 8080 (ss -lntp inside pod) and Service targetPort matches.

---

## 13. Optional: Persistence for Models

Attach an additional disk to the VM and mount it at `/opt/ollama` (mapped to `/root/.ollama` inside Docker):

1) Create a PVC (e.g., 50Gi) in vms.

2) Add a new volume + disk to the VM template referencing that PVC.

3) Inside the VM, partition/format (mkfs.ext4), mount at `/opt/ollama`, and add to `/etc/fstab`.

This preserves models across VM rebuilds.

---

## 14. Optional: GitOps (Flux) Skeleton

If using Flux, create a kustomization per namespace (vms, ai-ui) with the manifests above. Keep secrets (e.g., basic-auth) in SOPS.

---

## 15. Useful One-Liners

```
# Watch VM & importer activity
kubectl -n vms get vmis,pods,dv,pvc -w
```

```
# Tail VM console via launcher pod
kubectl -n vms logs -f pod/$(kubectl -n vms get pod -l kubevirt.io=virt-launcher -o name) -c compute
```

```
# Test Ollama from any pod
kubectl -n vms run curl --rm -it --image=curlimages/curl -- \
  curl -s http://ollama-internal.vms.svc.cluster.local:11434/api/tags
```

```
# Ingress sanity
kubectl -n ai-ui describe ingress open-webui | egrep -i 'Class|Rules|Backends|Address'
```

```
# Ingress controller logs
kubectl -n taikun-ingress logs deploy/taikun-ingress-nginx-controller --tail=200
```

```
# Check NodePort mapping
kubectl -n taikun-ingress get svc taikun-ingress-nginx-controller -o wide
```

---

## 16. Final URLs (for this setup)

* **Open WebUI**: `http://<access-ip>.sslip.io:31746/`
* **(Optional) Ollama API**: `http://api.<access-ip>.sslip.io:31746/api/tags`

In Open WebUI → Settings → Connections: `http://ollama-internal.vms.svc.cluster.local:11434`

