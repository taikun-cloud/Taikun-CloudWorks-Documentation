# **02 - LoadBalancer**

## **LoadBalancer Services in Kubernetes**

A Kubernetes `LoadBalancer` service is used to expose applications running in the cluster to external clients over the internet. It extends the functionality of a `ClusterIP` service by allocating a public IP address or domain, allowing inbound traffic from outside the cluster.

### **Key Characteristics**

- Retains all core features of a `ClusterIP` service (name, selector, internal IP).
- Adds external accessibility through a provisioned load balancer and public endpoint.
- Manages traffic routing from the public interface to backend pods in the cluster.

### **Cloud-Native Integration**

`LoadBalancer` services are designed to be cloud-native. Kubernetes does not handle the infrastructure for the load balancer directly. Instead, it interacts with the underlying cloud provider through configured **Cloud Credentials**. Each cloud provider implements its own mechanism for creating and managing load balancers.

When a `LoadBalancer` service is deployed:

1. Kubernetes requests the cloud provider to provision a load balancer.
2. The cloud provider allocates an external IP address or DNS name.
3. External traffic is routed through the load balancer to the Kubernetes service.
4. The service forwards traffic to the appropriate pods based on label selectors.

!!! Note
	When the service is deleted, Kubernetes notifies the cloud provider to decommission the load balancer and release its associated resources.

### **DNS Configuration**

For long-term services, it is recommended to configure your DNS records to point to the external IP or hostname assigned by the cloud provider. This ensures a stable entry point for users, even if the underlying infrastructure changes.

### **Load Balancers in Taikun CloudWorks**

Users of **Taikun CloudWorks** with **OpenStack** cloud credentials can choose between two types of load balancers:

- **Octavia** (default OpenStack LB)
- **Taikun LB** (custom implementation)

Both are fully compatible with Kubernetes `LoadBalancer` services and are provisioned automatically based on the cloud provider integration defined in the project’s Cloud Credentials.

!!! Note 
	taikun-lb is only available for **OpenStack** with **Octavia disabled**. You need to add the image **https://repo.itera.io/repository/images/taikun-lb.qcow2** to OpenStack with the tag “taikun-lb”.

![chart](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Expose_with_LB/02-LB_chart.webp)
/// caption
How it works
///

---

## **Lab excercise:**

### **1\. Create a deployment and service in LiveOps**

* Expose deployment and service of type LoadBalancer
* the labels on pods **MUST** match the selector in the service

**Example of nginx deployment**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: lb-test
spec:
  replicas: 3
  selector:
    matchLabels:
      app: lb-test
  template:
    metadata:
      labels:
        app: lb-test #All pods created by this deployment will have label app:lb-test
    spec:
      containers:
        - name: my-container
          image: nginx:latest
          ports:
            - containerPort: 80
```

**Example of LoadBalancer service**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: lb-test-svc
spec:
  selector:
    app: lb-test #Send packets to pods that have the app:lb-test label.
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

### **2\. Wait for the exteral IP and access in your browser**

![get external IP](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Expose_with_LB/externalIP.webp)
/// caption
Wait for External IP
///

![Search from browser](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Expose_with_LB/browser.webp)
/// caption
Access from browser
///

### **3\. (optional)** Edit your DNS to point on the LB provided external IP. Access the domain. If you have no domain to test this with use x.x.x.x.sslip.io to verify.
