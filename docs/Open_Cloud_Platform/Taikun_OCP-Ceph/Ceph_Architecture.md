# **Ceph Architecture**

## **Architecture**

[Ceph](https://docs.ceph.com/en/latest/glossary/#term-Ceph) uniquely delivers **object, block, and file storage** in one unified system. Ceph is highly reliable, easy to manage, and free. The power of Ceph can transform your company’s IT infrastructure and your ability to manage vast amounts of data. Ceph delivers extraordinary scalability–thousands of clients accessing petabytes to exabytes of data. A [Ceph Node](https://docs.ceph.com/en/latest/glossary/#term-Ceph-Node) leverages commodity hardware and intelligent daemons, and a [Ceph Storage Cluster](https://docs.ceph.com/en/latest/glossary/#term-Ceph-Storage-Cluster) accommodates large numbers of nodes, which communicate with each other to replicate and redistribute data dynamically.

![../\_images/stack.png](https://docs.ceph.com/en/latest/_images/stack.png)
/// caption 
Stack
///

---

## **The ceph storage cluster**

Ceph provides an infinitely scalable [Ceph Storage Cluster](https://docs.ceph.com/en/latest/glossary/#term-Ceph-Storage-Cluster) based upon RADOS, a reliable, distributed storage service that uses the intelligence in each of its nodes to secure the data it stores and to provide that data to client. See Sage Weil’s “[The RADOS Object Store](https://ceph.io/en/news/blog/2009/the-rados-distributed-object-store/)” blog post for a brief explanation of RADOS and see [RADOS – A Scalable, Reliable Storage Service for Petabyte-scale Storage Clusters](https://ceph.io/assets/pdfs/weil-rados-pdsw07.pdf) for an exhaustive explanation of [RADOS](https://docs.ceph.com/en/latest/glossary/#term-RADOS).

A Ceph Storage Cluster consists of multiple types of daemons:

* [Ceph Monitor](https://docs.ceph.com/en/latest/glossary/#term-Ceph-Monitor)

* [Ceph OSD Daemon](https://docs.ceph.com/en/latest/glossary/#term-Ceph-OSD-Daemon)

* [Ceph Manager](https://docs.ceph.com/en/latest/glossary/#term-Ceph-Manager)

* [Ceph Metadata Server](https://docs.ceph.com/en/latest/glossary/#term-Ceph-Metadata-Server)

Ceph Monitors maintain the master copy of the cluster map, which they provide to Ceph clients. The existence of multiple monitors in the Ceph cluster ensures availability if one of the monitor daemons or its host fails.

A Ceph OSD Daemon checks its own state and the state of other OSDs and reports back to monitors.

A Ceph Manager serves as an endpoint for monitoring, orchestration, and plug-in modules.

A Ceph Metadata Server (MDS) manages file metadata when CephFS is used to provide file services.

Storage cluster clients and [Ceph OSD Daemon](https://docs.ceph.com/en/latest/glossary/#term-Ceph-OSD-Daemon)s use the CRUSH algorithm to compute information about the location of data. Use of the CRUSH algoritm means that clients and OSDs are not bottlenecked by a central lookup table. Ceph’s high-level features include a native interface to the Ceph Storage Cluster via `librados`, and a number of service interfaces built on top of `librados`.

### Storing data

The Ceph Storage Cluster receives data from [Ceph Client](https://docs.ceph.com/en/latest/glossary/#term-Ceph-Client)s–whether it comes through a [Ceph Block Device](https://docs.ceph.com/en/latest/glossary/#term-Ceph-Block-Device), [Ceph Object Storage](https://docs.ceph.com/en/latest/glossary/#term-Ceph-Object-Storage), the [Ceph File System](https://docs.ceph.com/en/latest/glossary/#term-Ceph-File-System), or a custom implementation that you create by using `librados`. The data received by the Ceph Storage Cluster is stored as RADOS objects. Each object is stored on an [Object Storage Device](https://docs.ceph.com/en/latest/glossary/#term-Object-Storage-Device) (this is also called an “OSD”). Ceph OSDs control read, write, and replication operations on storage drives. The default BlueStore back end stores objects in a monolithic, database-like fashion.

Ceph OSD Daemons store data as objects in a flat namespace. This means that objects are not stored in a hierarchy of directories. An object has an identifier, binary data, and metadata consisting of name/value pairs. [Ceph Client](https://docs.ceph.com/en/latest/glossary/#term-Ceph-Client)s determine the semantics of the object data. For example, CephFS uses metadata to store file attributes such as the file owner, the created date, and the last modified date.

!!! Note
	An object ID is unique across the entire cluster, not just the local filesystem.

### Scalability and high availability

In traditional architectures, clients talk to a centralized component. This centralized component might be a gateway, a broker, an API, or a facade. A centralized component of this kind acts as a single point of entry to a complex subsystem. Architectures that rely upon such a centralized component have a single point of failure and incur limits to performance and scalability. If the centralized component goes down, the whole system becomes unavailable.

Ceph eliminates this centralized component. This enables clients to interact with Ceph OSDs directly. Ceph OSDs create object replicas on other Ceph Nodes to ensure data safety and high availability. Ceph also uses a cluster of monitors to ensure high availability. To eliminate centralization, Ceph uses an algorithm called CRUSH.

#### Crush introduction

Ceph Clients and Ceph OSD Daemons both use the CRUSH algorithm to compute information about object location instead of relying upon a central lookup table. CRUSH provides a better data management mechanism than do older approaches, and CRUSH enables massive scale by distributing the work to all the OSD daemons in the cluster and all the clients that communicate with them. CRUSH uses intelligent data replication to ensure resiliency, which is better suited to hyper-scale storage. The following sections provide additional details on how CRUSH works. For a detailed discussion of CRUSH, see [CRUSH – Controlled, Scalable, Decentralized Placement of Replicated Data](https://ceph.io/assets/pdfs/weil-crush-sc06.pdf).

#### Cluster map

In order for a Ceph cluster to function properly, Ceph Clients and Ceph OSDs must have current information about the cluster’s topology. Current information is stored in the “Cluster Map”, which is in fact a collection of five maps. The five maps that constitute the cluster map are:

1. **The Monitor Map:** Contains the cluster `fsid`, the position, the name, the address, and the TCP port of each monitor. The monitor map specifies the current epoch, the time of the monitor map’s creation, and the time of the monitor map’s last modification. To view a monitor map, run `ceph mon dump`.

2. **The OSD Map:** Contains the cluster `fsid`, the time of the OSD map’s creation, the time of the OSD map’s last modification, a list of pools, a list of replica sizes, a list of PG numbers, and a list of OSDs and their statuses (for example, `up`, `in`). To view an OSD map, run `ceph osd dump`.

3. **The PG Map:** Contains the PG version, its time stamp, the last OSD map epoch, the full ratios, and the details of each placement group. This includes the PG ID, the Up Set, the Acting Set, the state of the PG (for example, `active + clean`), and data usage statistics for each pool.

4. **The CRUSH Map:** Contains a list of storage devices, the failure domain hierarchy (for example, `device`, `host`, `rack`, `row`, `room`), and rules for traversing the hierarchy when storing data. To view a CRUSH map, run `ceph osd getcrushmap -o {filename}` and then decompile it by running `crushtool -d {comp-crushmap-filename} -o {decomp-crushmap-filename}`. Use a text editor or `cat` to view the decompiled map.

5. **The MDS Map:** Contains the current MDS map epoch, when the map was created, and the last time it changed. It also contains the pool for storing metadata, a list of metadata servers, and which metadata servers are `up` and `in`. To view an MDS map, execute `ceph fs dump`.

Each map maintains a history of changes to its operating state. Ceph Monitors maintain a master copy of the cluster map. This master copy includes the cluster members, the state of the cluster, changes to the cluster, and information recording the overall health of the Ceph Storage Cluster.

#### High availability Monitors

A Ceph Client must contact a Ceph Monitor and obtain a current copy of the cluster map in order to read data from or to write data to the Ceph cluster.

It is possible for a Ceph cluster to function properly with only a single monitor, but a Ceph cluster that has only a single monitor has a single point of failure: if the monitor goes down, Ceph clients will be unable to read data from or write data to the cluster.

Ceph leverages a cluster of monitors in order to increase reliability and fault tolerance. When a cluster of monitors is used, however, one or more of the monitors in the cluster can fall behind due to latency or other faults. Ceph mitigates these negative effects by requiring multiple monitor instances to agree about the state of the cluster. To establish consensus among the monitors regarding the state of the cluster, Ceph uses the [Paxos](https://en.wikipedia.org/wiki/Paxos_\(computer_science\)) algorithm and a majority of monitors (for example, one in a cluster that contains only one monitor, two in a cluster that contains three monitors, three in a cluster that contains five monitors, four in a cluster that contains six monitors, and so on).

See the [Monitor Config Reference](https://docs.ceph.com/en/latest/rados/configuration/mon-config-ref) for more detail on configuring monitors.

#### High Availability authentication

The `cephx` authentication system is used by Ceph to authenticate users and daemons and to protect against man-in-the-middle attacks.

!!! Note
	The `cephx` protocol does not address data encryption in transport (for example, SSL/TLS) or encryption at rest.

`cephx` uses shared secret keys for authentication. This means that both the client and the monitor cluster keep a copy of the client’s secret key.

The `cephx` protocol makes it possible for each party to prove to the other that it has a copy of the key without revealing it. This provides mutual authentication and allows the cluster to confirm (1) that the user has the secret key and (2) that the user can be confident that the cluster has a copy of the secret key.

As stated in [Scalability and High Availability](https://docs.ceph.com/en/latest/architecture/#arch-scalability-and-high-availability), Ceph does not have any centralized interface between clients and the Ceph object store. By avoiding such a centralized interface, Ceph avoids the bottlenecks that attend such centralized interfaces. However, this means that clients must interact directly with OSDs. Direct interactions between Ceph clients and OSDs require authenticated connections. The `cephx` authentication system establishes and sustains these authenticated connections.

The `cephx` protocol operates in a manner similar to [Kerberos](https://en.wikipedia.org/wiki/Kerberos_\(protocol\)).

A user invokes a Ceph client to contact a monitor. Unlike Kerberos, each monitor can authenticate users and distribute keys, which means that there is no single point of failure and no bottleneck when using `cephx`. The monitor returns an authentication data structure that is similar to a Kerberos ticket. This authentication data structure contains a session key for use in obtaining Ceph services. The session key is itself encrypted with the user’s permanent secret key, which means that only the user can request services from the Ceph Monitors. The client then uses the session key to request services from the monitors, and the monitors provide the client with a ticket that authenticates the client against the OSDs that actually handle data. Ceph Monitors and OSDs share a secret, which means that the clients can use the ticket provided by the monitors to authenticate against any OSD or metadata server in the cluster.

Like Kerberos tickets, `cephx` tickets expire. An attacker cannot use an expired ticket or session key that has been obtained surreptitiously. This form of authentication prevents attackers who have access to the communications medium from creating bogus messages under another user’s identity and prevents attackers from altering another user’s legitimate messages, as long as the user’s secret key is not divulged before it expires.

An administrator must set up users before using `cephx`. In the following diagram, the `client.admin` user invokes `ceph auth get-or-create-key` from the command line to generate a username and secret key. Ceph’s `auth` subsystem generates the username and key, stores a copy on the monitor(s), and transmits the user’s secret back to the `client.admin` user. This means that the client and the monitor share a secret key.

!!! Note
	The `client.admin` user must provide the user ID and secret key to the user in a secure manner.

Here is how a client authenticates with a monitor. The client passes the user name to the monitor. The monitor generates a session key that is encrypted with the secret key associated with the `username`. The monitor transmits the encrypted ticket to the client. The client uses the shared secret key to decrypt the payload. The session key identifies the user, and this act of identification will last for the duration of the session. The client requests a ticket for the user, and the ticket is signed with the session key. The monitor generates a ticket and uses the user’s secret key to encrypt it. The encrypted ticket is transmitted to the client. The client decrypts the ticket and uses it to sign requests to OSDs and to metadata servers in the cluster.

The `cephx` protocol authenticates ongoing communications between the clients and Ceph daemons. After initial authentication, each message sent between a client and a daemon is signed using a ticket that can be verified by monitors, OSDs, and metadata daemons. This ticket is verified by using the secret shared between the client and the daemon.

This authentication protects only the connections between Ceph clients and Ceph daemons. The authentication is not extended beyond the Ceph client. If a user accesses the Ceph client from a remote host, cephx authentication will not be applied to the connection between the user’s host and the client host.

See [Cephx Config Guide](https://docs.ceph.com/en/latest/rados/configuration/auth-config-ref) for more on configuration details.

See [User Management](https://docs.ceph.com/en/latest/rados/operations/user-management) for more on user management.

See [A Detailed Description of the Cephx Authentication Protocol](https://docs.ceph.com/en/latest/dev/cephx_protocol/#cephx-2012-peter) for more on the distinction between authorization and authentication and for a step-by-step explanation of the setup of `cephx` tickets and session keys.

#### Smart deamons enable hyperscale

A feature of many storage clusters is a centralized interface that keeps track of the nodes that clients are permitted to access. Such centralized architectures provide services to clients by means of a double dispatch. At the petabyte-to-exabyte scale, such double dispatches are a significant bottleneck.

Ceph obviates this bottleneck: Ceph’s OSD Daemons AND Ceph clients are cluster-aware. Like Ceph clients, each Ceph OSD Daemon is aware of other Ceph OSD Daemons in the cluster. This enables Ceph OSD Daemons to interact directly with other Ceph OSD Daemons and to interact directly with Ceph Monitors. Being cluster-aware makes it possible for Ceph clients to interact directly with Ceph OSD Daemons.

Because Ceph clients, Ceph monitors, and Ceph OSD daemons interact with one another directly, Ceph OSD daemons can make use of the aggregate CPU and RAM resources of the nodes in the Ceph cluster. This means that a Ceph cluster can easily perform tasks that a cluster with a centralized interface would struggle to perform. The ability of Ceph nodes to make use of the computing power of the greater cluster provides several benefits:

1. **OSDs Service Clients Directly:** Network devices can support only a limited number of concurrent connections. Because Ceph clients contact Ceph OSD daemons directly without first connecting to a central interface, Ceph enjoys improved perfomance and increased system capacity relative to storage redundancy strategies that include a central interface. Ceph clients maintain sessions only when needed, and maintain those sessions with only particular Ceph OSD daemons, not with a centralized interface.

2. **OSD Membership and Status**: When Ceph OSD Daemons join a cluster, they report their status. At the lowest level, the Ceph OSD Daemon status is `up` or `down`: this reflects whether the Ceph OSD daemon is running and able to service Ceph Client requests. If a Ceph OSD Daemon is `down` and `in` the Ceph Storage Cluster, this status may indicate the failure of the Ceph OSD Daemon. If a Ceph OSD Daemon is not running because it has crashed, the Ceph OSD Daemon cannot notify the Ceph Monitor that it is `down`. The OSDs periodically send messages to the Ceph Monitor (in releases prior to Luminous, this was done by means of `MPGStats`, and beginning with the Luminous release, this has been done with `MOSDBeacon`). If the Ceph Monitors receive no such message after a configurable period of time, then they mark the OSD `down`. This mechanism is a failsafe, however. Normally, Ceph OSD Daemons determine if a neighboring OSD is `down` and report it to the Ceph Monitors. This contributes to making Ceph Monitors lightweight processes. See [Monitoring OSDs](https://docs.ceph.com/en/latest/rados/operations/monitoring-osd-pg/#monitoring-osds) and [Heartbeats](https://docs.ceph.com/en/latest/rados/configuration/mon-osd-interaction) for additional details.

3. **Data Scrubbing:** To maintain data consistency, Ceph OSD Daemons scrub RADOS objects. Ceph OSD Daemons compare the metadata of their own local objects against the metadata of the replicas of those objects, which are stored on other OSDs. Scrubbing occurs on a per-Placement-Group basis, finds mismatches in object size and finds metadata mismatches, and is usually performed daily. Ceph OSD Daemons perform deeper scrubbing by comparing the data in objects, bit-for-bit, against their checksums. Deep scrubbing finds bad sectors on drives that are not detectable with light scrubs. See [Data Scrubbing](https://docs.ceph.com/en/latest/rados/configuration/osd-config-ref#scrubbing) for details on configuring scrubbing.

4. **Replication:** Data replication involves a collaboration between Ceph Clients and Ceph OSD Daemons. Ceph OSD Daemons use the CRUSH algorithm to determine the storage location of object replicas. Ceph clients use the CRUSH algorithm to determine the storage location of an object, then the object is mapped to a pool and to a placement group, and then the client consults the CRUSH map to identify the placement group’s primary OSD.After identifying the target placement group, the client writes the object to the identified placement group’s primary OSD. The primary OSD then consults its own copy of the CRUSH map to identify secondary and tertiary OSDS, replicates the object to the placement groups in those secondary and tertiary OSDs, confirms that the object was stored successfully in the secondary and tertiary OSDs, and reports to the client that the object was stored successfully.

By performing this act of data replication, Ceph OSD Daemons relieve Ceph clients of the burden of replicating data.

### Dynamic cluster management

In the [Scalability and High Availability](https://docs.ceph.com/en/latest/architecture/#scalability-and-high-availability) section, we explained how Ceph uses CRUSH, cluster topology, and intelligent daemons to scale and maintain high availability. Key to Ceph’s design is the autonomous, self-healing, and intelligent Ceph OSD Daemon. Let’s take a deeper look at how CRUSH works to enable modern cloud storage infrastructures to place data, rebalance the cluster, and adaptively place and balance data and recover from faults.

#### About pools

The Ceph storage system supports the notion of ‘Pools’, which are logical partitions for storing objects.

Ceph Clients retrieve a [Cluster Map](https://docs.ceph.com/en/latest/architecture/#cluster-map) from a Ceph Monitor, and write RADOS objects to pools. The way that Ceph places the data in the pools is determined by the pool’s `size` or number of replicas, the CRUSH rule, and the number of placement groups in the pool.

Pools set at least the following parameters:

* Ownership/Access to Objects

* The Number of Placement Groups, and

* The CRUSH Rule to Use.

See [Set Pool Values](https://docs.ceph.com/en/latest/rados/operations/pools#set-pool-values) for details.

#### Mapping pgs to osds

Each pool has a number of placement groups (PGs) within it. CRUSH dynamically maps PGs to OSDs. When a Ceph Client stores objects, CRUSH maps each RADOS object to a PG.

This mapping of RADOS objects to PGs implements an abstraction and indirection layer between Ceph OSD Daemons and Ceph Clients. The Ceph Storage Cluster must be able to grow (or shrink) and redistribute data adaptively when the internal topology changes.

If the Ceph Client “knew” which Ceph OSD Daemons were storing which objects, a tight coupling would exist between the Ceph Client and the Ceph OSD Daemon. But Ceph avoids any such tight coupling. Instead, the CRUSH algorithm maps each RADOS object to a placement group and then maps each placement group to one or more Ceph OSD Daemons. This “layer of indirection” allows Ceph to rebalance dynamically when new Ceph OSD Daemons and their underlying OSD devices come online. The following diagram shows how the CRUSH algorithm maps objects to placement groups, and how it maps placement groups to OSDs.

The client uses its copy of the cluster map and the CRUSH algorithm to compute precisely which OSD it will use when reading or writing a particular object.

#### Calculating pg ids

When a Ceph Client binds to a Ceph Monitor, it retrieves the latest version of the [Cluster Map](https://docs.ceph.com/en/latest/architecture/#cluster-map). When a client has been equipped with a copy of the cluster map, it is aware of all the monitors, OSDs, and metadata servers in the cluster. **However, even equipped with a copy of the latest version of the cluster map, the client doesn’t know anything about object locations.**

**Object locations must be computed.**

The client requires only the object ID and the name of the pool in order to compute the object location.

Ceph stores data in named pools (for example, “liverpool”). When a client stores a named object (for example, “john”, “paul”, “george”, or “ringo”) it calculates a placement group by using the object name, a hash code, the number of PGs in the pool, and the pool name. Ceph clients use the following steps to compute PG IDs.

1. The client inputs the pool name and the object ID. (for example: pool = “liverpool” and object-id = “john”)

2. Ceph hashes the object ID.

3. Ceph calculates the hash, modulo the number of PGs (for example: `58`), to get a PG ID.

4. Ceph uses the pool name to retrieve the pool ID: (for example: “liverpool” = `4`)

5. Ceph prepends the pool ID to the PG ID (for example: `4.58`).

It is much faster to compute object locations than to perform object location query over a chatty session. The CRUSH algorithm allows a client to compute where objects are expected to be stored, and enables the client to contact the primary OSD to store or retrieve the objects.

#### Peering and sets

In previous sections, we noted that Ceph OSD Daemons check each other’s heartbeats and report back to Ceph Monitors. Ceph OSD daemons also ‘peer’, which is the process of bringing all of the OSDs that store a Placement Group (PG) into agreement about the state of all of the RADOS objects (and their metadata) in that PG. Ceph OSD Daemons [Report Peering Failure](https://docs.ceph.com/en/latest/rados/configuration/mon-osd-interaction#osds-report-peering-failure) to the Ceph Monitors. Peering issues usually resolve themselves; however, if the problem persists, you may need to refer to the [Troubleshooting Peering Failure](https://docs.ceph.com/en/latest/rados/troubleshooting/troubleshooting-pg#placement-group-down-peering-failure) section.

!!! Note
	PGs that agree on the state of the cluster do not necessarily have the current data yet.

The Ceph Storage Cluster was designed to store at least two copies of an object (that is, `size = 2`), which is the minimum requirement for data safety. For high availability, a Ceph Storage Cluster should store more than two copies of an object (that is, `size = 3` and `min size = 2`) so that it can continue to run in a `degraded` state while maintaining data safety.

!!! Warning
	Although we say here that R2 (replication with two copies) is the minimum requirement for data safety, R3 (replication with three copies) is recommended. On a long enough timeline, data stored with an R2 strategy will be lost.

As explained in the diagram in [Smart Daemons Enable Hyperscale](https://docs.ceph.com/en/latest/architecture/#smart-daemons-enable-hyperscale), we do not name the Ceph OSD Daemons specifically (for example, `osd.0`, `osd.1`, etc.), but rather refer to them as *Primary*, *Secondary*, and so forth. By convention, the *Primary* is the first OSD in the *Acting Set*, and is responsible for orchestrating the peering process for each placement group where it acts as the *Primary*. The *Primary* is the **ONLY** OSD in a given placement group that accepts client-initiated writes to objects.

The set of OSDs that is responsible for a placement group is called the *Acting Set*. The term “*Acting Set*” can refer either to the Ceph OSD Daemons that are currently responsible for the placement group, or to the Ceph OSD Daemons that were responsible for a particular placement group as of some epoch.

The Ceph OSD daemons that are part of an *Acting Set* might not always be `up`. When an OSD in the *Acting Set* is `up`, it is part of the *Up Set*. The *Up Set* is an important distinction, because Ceph can remap PGs to other Ceph OSD Daemons when an OSD fails.

!!! Note
	Consider a hypothetical *Acting Set* for a PG that contains `osd.25`, `osd.32` and `osd.61`. The first OSD (`osd.25`), is the *Primary*. If that OSD fails, the Secondary (`osd.32`), becomes the *Primary*, and `osd.25` is removed from the *Up Set*.

#### Rebalancing 

When you add a Ceph OSD Daemon to a Ceph Storage Cluster, the cluster map gets updated with the new OSD. Referring back to [Calculating PG IDs](https://docs.ceph.com/en/latest/architecture/#calculating-pg-ids), this changes the cluster map. Consequently, it changes object placement, because it changes an input for the calculations. The following diagram depicts the rebalancing process (albeit rather crudely, since it is substantially less impactful with large clusters) where some, but not all of the PGs migrate from existing OSDs (OSD 1, and OSD 2) to the new OSD (OSD 3). Even when rebalancing, CRUSH is stable. Many of the placement groups remain in their original configuration, and each OSD gets some added capacity, so there are no load spikes on the new OSD after rebalancing is complete.

#### Data consistency

As part of maintaining data consistency and cleanliness, Ceph OSDs also scrub objects within placement groups. That is, Ceph OSDs compare object metadata in one placement group with its replicas in placement groups stored in other OSDs. Scrubbing (usually performed daily) catches OSD bugs or filesystem errors, often as a result of hardware issues. OSDs also perform deeper scrubbing by comparing data in objects bit-for-bit. Deep scrubbing (by default performed weekly) finds bad blocks on a drive that weren’t apparent in a light scrub.

See [Data Scrubbing](https://docs.ceph.com/en/latest/rados/configuration/osd-config-ref#scrubbing) for details on configuring scrubbing.
