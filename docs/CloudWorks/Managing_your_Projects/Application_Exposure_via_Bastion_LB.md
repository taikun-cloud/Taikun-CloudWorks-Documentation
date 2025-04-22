# **Application Exposure via Bastion LB**

When you deploy an application to the cluster, you can expose it externally through the bastion, which serves as a load balancer. You must configure specific parameters in the application’s settings to do this.

---

## **Instructions**

### 1. Define Service Type as NodePort
In the application’s parameters, set the `service.type` to `NodePort`.

```yaml
service:
  type: NodePort
```

---

### 2. Enable Ingress for the Application
Enable ingress by setting `ingress.enabled` to `true`.

```yaml
ingress:
  enabled: true
```

---

### 3. Specify the Ingress Class Name
Define the ingress class name as `taikun`. This informs the cluster that the application should be exposed via the Taikun ingress controller.

```yaml
ingressClassName: taikun
```

---

### 4. Set the Ingress Hostname

**For Standard Clusters**

If you’re working with a standard cluster, define the `ingress.hostName` with the following pattern:

```
name.<access-ip>.nip.io
```

where:
- `name` is a user-defined name for the application.
- `<access-ip>` is the IP address through which the application will be accessible.

**Example:**

```yaml
ingress:
  hostName: myapp.192.168.1.100.nip.io
```

In this example, `myapp` is the user-defined name, and `192.168.1.100` is the access IP.

**For vcluster**

If you are using vcluster, which has an access IP of the form `vc-01.vcluster.b916618f.nip.io`, you do not need to add `nip.io` to the `ingress.hostName`. Use the vcluster’s specific hostname directly.

**Example:**

```yaml
ingress:
  hostName: myapp.vc-01.vcluster.b916618f.nip.io
```

---

### 5. Accessing the Application

Once the application is deployed and the above settings are configured, you can access the application using the URL:

- **For standard clusters:** `http://name.<access-ip>.nip.io`
- **For vcluster:** `http://myapp.vc-01.vcluster.b916618f.nip.io`

Replace `name` and `<access-ip>` with the actual values used in your configuration.

**Example Configuration:**
Here’s a sample of how the parameters might look in your application’s YAML configuration:

```yaml
service:
  type: NodePort

ingress:
  enabled: true
  ingressClassName: taikun
  hostName: myapp.192.168.1.100.nip.io
```

---

### Additional Notes
- Ensure that the DNS resolution is correctly configured to point `<access-ip>` to your bastion’s public IP.
- The `nip.io` service provides wildcard DNS for any IP address, simplifying access to your application.
- For vcluster, the hostname is already in the correct format, so no additional suffix is needed.
