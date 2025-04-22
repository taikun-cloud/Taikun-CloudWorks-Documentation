# **Services, Load Balancing, and Networking in Kubernetes**

## **The Kubernetes network model**

Every [`Pod`](https://kubernetes.io/docs/concepts/workloads/pods/) in a cluster gets its own unique cluster-wide IP address. This means you do not need to explicitly create links between `Pods` and you almost never need to deal with mapping container ports to host ports.
This creates a clean, backwards-compatible model where `Pods` can be treated much like VMs or physical hosts from the perspectives of port allocation, naming, service discovery, [load balancing](https://kubernetes.io/docs/concepts/services-networking/ingress/#load-balancing), application configuration, and migration.

Kubernetes imposes the following fundamental requirements on any networking implementation (barring any intentional network segmentation policies):

* pods can communicate with all other pods on any other [node](https://kubernetes.io/docs/concepts/architecture/nodes/) without NAT

* agents on a node (e.g. system daemons, kubelet) can communicate with all pods on that node

Note: For those platforms that support `Pods` running in the host network (e.g. Linux), when pods are attached to the host network of a node they can still communicate with all pods on all nodes without NAT.

This model is not only less complex overall, but it is principally compatible with the desire for Kubernetes to enable low-friction porting of apps from VMs to containers. If your job previously ran in a VM, your VM had an IP and could talk to other VMs in your project. This is the same basic model.

Kubernetes IP addresses exist at the `Pod` scope – containers within a `Pod` share their network namespaces – including their IP address and MAC address. This means that containers within a `Pod` can all reach each other’s ports on `localhost`. This also means that containers within a `Pod` must coordinate port usage, but this is no different from processes in a VM. This is called the “IP-per-pod” model.

How this is implemented is a detail of the particular container runtime in use.

It is possible to request ports on the `Node` itself which forward to your `Pod` (called host ports), but this is a very niche operation. How that forwarding is implemented is also a detail of the container runtime. The `Pod` itself is blind to the existence or non-existence of host ports.

Kubernetes networking addresses four concerns:

* Containers within a Pod [use networking to communicate](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/) via loopback.

* Cluster networking provides communication between different Pods.

* The [Service](https://kubernetes.io/docs/concepts/services-networking/service/) API lets you [expose an application running in Pods](https://kubernetes.io/docs/tutorials/services/connect-applications-service/) to be reachable from outside your cluster.

  * [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) provides extra functionality specifically for exposing HTTP applications, websites and APIs.

  * [Gateway API](https://kubernetes.io/docs/concepts/services-networking/gateway/) is an [add-on](https://kubernetes.io/docs/concepts/cluster-administration/addons/) that provides an expressive, extensible, and role-oriented family of API kinds for modeling service networking.

* You can also use Services to [publish services only for consumption inside your cluster](https://kubernetes.io/docs/concepts/services-networking/service-traffic-policy/).

The [Connecting Applications with Services](https://kubernetes.io/docs/tutorials/services/connect-applications-service/) tutorial lets you learn about Services and Kubernetes networking with a hands-on example.

[Cluster Networking](https://kubernetes.io/docs/concepts/cluster-administration/networking/) explains how to set up networking for your cluster, and also provides an overview of the technologies involved.

---

### [Service](https://kubernetes.io/docs/concepts/services-networking/service/)

Expose an application running in your cluster behind a single outward-facing endpoint, even when the workload is split across multiple backends.

### [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)

Make your HTTP (or HTTPS) network service available using a protocol-aware configuration mechanism, that understands web concepts like URIs, hostnames, paths, and more. The Ingress concept lets you map traffic to different backends based on rules you define via the Kubernetes API.

### [Ingress Controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/)

In order for an [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) to work in your cluster, there must be an *ingress controller* running. You need to select at least one ingress controller and make sure it is set up in your cluster. This page lists common ingress controllers that you can deploy.

### [Gateway API](https://kubernetes.io/docs/concepts/services-networking/gateway/)

Gateway API is a family of API kinds that provide dynamic infrastructure provisioning and advanced traffic routing.

### [EndpointSlices](https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/)

The EndpointSlice API is the mechanism that Kubernetes uses to let your Service scale to handle large numbers of backends, and allows the cluster to update its list of healthy backends efficiently.

### [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)

If you want to control traffic flow at the IP address or port level (OSI layer 3 or 4), NetworkPolicies allow you to specify rules for traffic flow within your cluster, and also between Pods and the outside world. Your cluster must use a network plugin that supports NetworkPolicy enforcement.

### [DNS for Services and Pods](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)

Your workload can discover Services within your cluster using DNS; this page explains how that works.

### [IPv4/IPv6 dual-stack](https://kubernetes.io/docs/concepts/services-networking/dual-stack/)

Kubernetes lets you configure single-stack IPv4 networking, single-stack IPv6 networking, or dual stack networking with both network families active. This page explains how.

### [Topology Aware Routing](https://kubernetes.io/docs/concepts/services-networking/topology-aware-routing/)

*Topology Aware Routing* provides a mechanism to help keep network traffic within the zone where it originated. Preferring same-zone traffic between Pods in your cluster can help with reliability, performance (network latency and throughput), or cost.

### [Networking on Windows](https://kubernetes.io/docs/concepts/services-networking/windows-networking/)

### [Service ClusterIP allocation](https://kubernetes.io/docs/concepts/services-networking/cluster-ip-allocation/)

### [Service Internal Traffic Policy](https://kubernetes.io/docs/concepts/services-networking/service-traffic-policy/)

If two Pods in your cluster want to communicate, and both Pods are actually running on the same node, use *Service Internal Traffic Policy* to keep network traffic within that node. Avoiding a round trip via the cluster network can help with reliability, performance (network latency and throughput), or cost.
