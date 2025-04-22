# **Routers**

A **router** is a logical component that forwards data packets between networks. It also provides Layer 3 and NAT forwarding to provide external network access for servers on project networks.

Network v2

---

## **router add port**

Add a port to a router

openstack router add port \<router> \<port>

router

Router to which port will be added (name or ID)

port

Port to be added (name or ID)

---

## **router add route**

Add extra static routes to a router’s routing table.

openstack router add route
&#x20;   \[--route destination=\<subnet>,gateway=\<ip-address>]
&#x20;   \<router>

–route destination=\<subnet>,gateway=\<ip-address>

Add extra static route to the router. destination: destination subnet (in CIDR notation), gateway: nexthop IP address. Repeat option to add multiple routes. Trying to add a route that’s already present (exactly, including destination and nexthop) in the routing table is allowed and is considered a successful operation.

router

Router to which extra static routes will be added (name or ID).

---

## **router add subnet**

Add a subnet to a router

openstack router add subnet \<router> \<subnet>

router

Router to which subnet will be added (name or ID)

subnet

Subnet to be added (name or ID)

---

## **router create**

Create a new router

openstack router create
&#x20;   \[--extra-property type=\<property\_type>,name=\<property\_name>,value=\<property\_value>]
&#x20;   \[--enable | --disable]
&#x20;   \[--distributed | --centralized]
&#x20;   \[--ha | --no-ha]
&#x20;   \[--description \<description>]
&#x20;   \[--project \<project>]
&#x20;   \[--project-domain \<project-domain>]
&#x20;   \[--availability-zone-hint \<availability-zone>]
&#x20;   \[--tag \<tag> | --no-tag]
&#x20;   \[--external-gateway \<network>]
&#x20;   \[--fixed-ip subnet=\<subnet>,ip-address=\<ip-address>]
&#x20;   \[--enable-snat | --disable-snat]
&#x20;   \<name>

–extra-property type=\<property\_type>,name=\<property\_name>,value=\<property\_value>

Additional parameters can be passed using this property. Default type of the extra property is string (‘str’), but other types can be used as well. Available types are: ‘dict’, ‘list’, ‘str’, ‘bool’, ‘int’. In case of ‘list’ type, ‘value’ can be semicolon-separated list of values. For ‘dict’ value is semicolon-separated list of the key:value pairs.

–enable

Enable router (default)

–disable

Disable router

–distributed

Create a distributed router

–centralized

Create a centralized router

–ha

Create a highly available router

–no-ha

Create a legacy router

–description \<description>

Set router description

–project \<project>

Owner’s project (name or ID)

–project-domain \<project-domain>

Domain the project belongs to (name or ID). This can be used in case collisions between project names exist.

–availability-zone-hint \<availability-zone>

Availability Zone in which to create this router (Router Availability Zone extension required, repeat option to set multiple availability zones)

–tag \<tag>

Tag to be added to the router (repeat option to set multiple tags)

–no-tag

No tags associated with the router

–external-gateway \<network>

External Network used as router’s gateway (name or ID)

–fixed-ip subnet=\<subnet>,ip-address=\<ip-address>

Desired IP and/or subnet (name or ID) on external gateway: subnet=\<subnet>,ip-address=\<ip-address> (repeat option to set multiple fixed IP addresses)

–enable-snat

Enable Source NAT on external gateway

–disable-snat

Disable Source NAT on external gateway

name

New router name

---

## **router delete**

Delete router(s)

openstack router delete \<router> \[\<router> ...]

router

Router(s) to delete (name or ID)

## **router list**

List routers

openstack router list
&#x20;   \[--sort-column SORT\_COLUMN]
&#x20;   \[--sort-ascending | --sort-descending]
&#x20;   \[--name \<name>]
&#x20;   \[--enable | --disable]
&#x20;   \[--long]
&#x20;   \[--project \<project>]
&#x20;   \[--project-domain \<project-domain>]
&#x20;   \[--agent \<agent-id>]
&#x20;   \[--tags \<tag>\[,\<tag>,...]]
&#x20;   \[--any-tags \<tag>\[,\<tag>,...]]
&#x20;   \[--not-tags \<tag>\[,\<tag>,...]]
&#x20;   \[--not-any-tags \<tag>\[,\<tag>,...]]

–sort-column SORT\_COLUMN

specify the column(s) to sort the data (columns specified first have a priority, non-existing columns are ignored), can be repeated

–sort-ascending

sort the column(s) in ascending order

–sort-descending

sort the column(s) in descending order

–name \<name>

List routers according to their name

–enable

List enabled routers

–disable

List disabled routers

–long

List additional fields in output

–project \<project>

List routers according to their project (name or ID)

–project-domain \<project-domain>

Domain the project belongs to (name or ID). This can be used in case collisions between project names exist.

–agent \<agent-id>

List routers hosted by an agent (ID only)

–tags \<tag>\[,\<tag>,…]

List routers which have all given tag(s) (Comma-separated list of tags)

–any-tags \<tag>\[,\<tag>,…]

List routers which have any given tag(s) (Comma-separated list of tags)

–not-tags \<tag>\[,\<tag>,…]

Exclude routers which have all given tag(s) (Comma-separated list of tags)

–not-any-tags \<tag>\[,\<tag>,…]

Exclude routers which have any given tag(s) (Comma-separated list of tags)

---

## **router remove port**

Remove a port from a router

openstack router remove port \<router> \<port>

router

Router from which port will be removed (name or ID)

port

Port to be removed and deleted (name or ID)

## **router remove route**

Remove extra static routes from a router’s routing table.

openstack router remove route
&#x20;   \[--route destination=\<subnet>,gateway=\<ip-address>]
&#x20;   \<router>

–route destination=\<subnet>,gateway=\<ip-address>

Remove extra static route from the router. destination: destination subnet (in CIDR notation), gateway: nexthop IP address. Repeat option to remove multiple routes. Trying to remove a route that’s already missing (fully, including destination and nexthop) from the routing table is allowed and is considered a successful operation.

router

Router from which extra static routes will be removed (name or ID).

---

## **router remove subnet**

Remove a subnet from a router

openstack router remove subnet \<router> \<subnet>

router

Router from which the subnet will be removed (name or ID)

subnet

Subnet to be removed (name or ID)

## **router set**

Set router properties

openstack router set
&#x20;   \[--extra-property type=\<property\_type>,name=\<property\_name>,value=\<property\_value>]
&#x20;   \[--name \<name>]
&#x20;   \[--description \<description>]
&#x20;   \[--enable | --disable]
&#x20;   \[--distributed | --centralized]
&#x20;   \[--route destination=\<subnet>,gateway=\<ip-address>]
&#x20;   \[--no-route]
&#x20;   \[--ha | --no-ha]
&#x20;   \[--external-gateway \<network>]
&#x20;   \[--fixed-ip subnet=\<subnet>,ip-address=\<ip-address>]
&#x20;   \[--enable-snat | --disable-snat]
&#x20;   \[--qos-policy \<qos-policy> | --no-qos-policy]
&#x20;   \[--tag \<tag>]
&#x20;   \[--no-tag]
&#x20;   \<router>

–extra-property type=\<property\_type>,name=\<property\_name>,value=\<property\_value>

Additional parameters can be passed using this property. Default type of the extra property is string (‘str’), but other types can be used as well. Available types are: ‘dict’, ‘list’, ‘str’, ‘bool’, ‘int’. In case of ‘list’ type, ‘value’ can be semicolon-separated list of values. For ‘dict’ value is semicolon-separated list of the key:value pairs.

–name \<name>

Set router name

–description \<description>

Set router description

–enabl

Enable router

–disable

Disable router

–distributed

Set router to distributed mode (disabled router only)

–centralized

Set router to centralized mode (disabled router only)

–route destination=\<subnet>,gateway=\<ip-address>

Add routes to the router destination: destination subnet (in CIDR notation) gateway: nexthop IP address (repeat option to add multiple routes). This is deprecated in favor of ‘router add/remove route’ since it is prone to race conditions between concurrent clients when not used together with –no-route to overwrite the current value of ‘routes’.

–no-route

Clear routes associated with the router. Specify both –route and –no-route to overwrite current value of routes.

–ha

Set the router as highly available (disabled router only)

–no-ha

Clear high availability attribute of the router (disabled router only)

–external-gateway \<network>

External Network used as router’s gateway (name or ID)

–fixed-ip subnet=\<subnet>,ip-address=\<ip-address>

Desired IP and/or subnet (name or ID) on external gateway: subnet=\<subnet>,ip-address=\<ip-address> (repeat option to set multiple fixed IP addresses)

–enable-snat

Enable Source NAT on external gateway

–disable-snat

Disable Source NAT on external gateway

–qos-policy \<qos-policy>

Attach QoS policy to router gateway IPs

–no-qos-policy

Remove QoS policy from router gateway IPs

–tag \<tag>

Tag to be added to the router (repeat option to set multiple tags)

–no-tag

Clear tags associated with the router. Specify both –tag and –no-tag to overwrite current tags

router

Router to modify (name or ID)

---

## **router show**

Display router details

openstack router show \<router>

router

Router to display (name or ID)

---

## **router unset**

Unset router properties

openstack router unset
&#x20;   \[--extra-property type=\<property\_type>,name=\<property\_name>,value=\<property\_value>]
&#x20;   \[--route destination=\<subnet>,gateway=\<ip-address>]
&#x20;   \[--external-gateway]
&#x20;   \[--qos-policy]
&#x20;   \[--tag \<tag> | --all-tag]
&#x20;   \<router>

–extra-property type=\<property\_type>,name=\<property\_name>,value=\<property\_value>

Additional parameters can be passed using this property. Default type of the extra property is string (‘str’), but other types can be used as well. Available types are: ‘dict’, ‘list’, ‘str’, ‘bool’, ‘int’. In case of ‘list’ type, ‘value’ can be semicolon-separated list of values. For ‘dict’ value is semicolon-separated list of the key:value pairs.

–route destination=\<subnet>,gateway=\<ip-address>

Routes to be removed from the router destination: destination subnet (in CIDR notation) gateway: nexthop IP address (repeat option to unset multiple routes)

–external-gateway

Remove external gateway information from the router

–qos-policy

Remove QoS policy from router gateway IPs

–tag \<tag>

Tag to be removed from the router (repeat option to remove multiple tags)

–all-tag

Clear all tags associated with the router

router

Router to modify (name or ID)
