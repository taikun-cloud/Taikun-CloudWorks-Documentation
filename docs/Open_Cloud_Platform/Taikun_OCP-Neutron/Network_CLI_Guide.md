# **Network CLI Guide**

A **network** is an isolated Layer 2 networking segment. There are two types of networks, project and provider networks. Project networks are fully isolated and are not shared with other projects. Provider networks map to existing physical networks in the data center and provide external network access for servers and other resources. Only an OpenStack administrator can create provider networks. Networks can be connected via routers.

Compute v2, Network v2

---

## **network create**

Create new network

```
openstack network create
     \[--extra-property type=\<property\_type>,name=\<property\_name>,value=\<property\_value>]
     \[--share | --no-share]
     \[--enable | --disable]
     \[--project \<project>]
     \[--description \<description>]
     \[--mtu \<mtu>]
     \[--project-domain \<project-domain>]
     \[--availability-zone-hint \<availability-zone>]
     \[--enable-port-security | --disable-port-security]
     \[--external | --internal]
     \[--default | --no-default]
     \[--qos-policy \<qos-policy>]
     \[--transparent-vlan | --no-transparent-vlan]
     \[--provider-network-type \<provider-network-type>]
     \[--provider-physical-network \<provider-physical-network>]
     \[--provider-segment \<provider-segment>]
     \[--dns-domain \<dns-domain>]
     \[--tag \<tag> | --no-tag]
     \--subnet \<subnet>
     \<name>
```

extra-property type=\<property\_type>,name=\<property\_name>,value=\<property\_value>

* Additional parameters can be passed using this property. Default type of the extra property is string (‘str’), but other types can be used as well. Available types are: ‘dict’, ‘list’, ‘str’, ‘bool’, ‘int’. In case of ‘list’ type, ‘value’ can be semicolon-separated list of values. For ‘dict’ value is semicolon-separated list of the key:value pairs.

share

* Share the network between projects

no-share

* Do not share the network between projects

enable

* Enable network (default)

*Network version 2 only*

disable

* Disable network

*Network version 2 only*

project \<project>

* Owner’s project (name or ID)

*Network version 2 only*

description \<description>

* Set network description

*Network version 2 only*

mtu \<mtu>

* Set network mtu

*Network version 2 only*

project-domain \<project-domain>

* Domain the project belongs to (name or ID). This can be used in case collisions between project names exist.

availability-zone-hint \<availability-zone>

* Availability Zone in which to create this network (Network Availability Zone extension required, repeat option to set multiple availability zones)

*Network version 2 only*

enable-port-security

* Enable port security by default for ports created on this network (default)

*Network version 2 only*

disable-port-security

* Disable port security by default for ports created on this network

*Network version 2 only*

external

* Set this network as an external network (external-net extension required)

*Network version 2 only*

internal

* Set this network as an internal network (default)

*Network version 2 only*

default

* Specify if this network should be used as the default external network

*Network version 2 only*

no-default

* Do not use the network as the default external network (default)

*Network version 2 only*

qos-policy \<qos-policy>

* QoS policy to attach to this network (name or ID)

*Network version 2 only*

transparent-vlan

* Make the network VLAN transparent

*Network version 2 only*

no-transparent-vlan

* Do not make the network VLAN transparent

*Network version 2 only*

provider-network-type \<provider-network-type>

* The physical mechanism by which the virtual network is implemented. For example: flat, geneve, gre, local, vlan, vxlan.

provider-physical-network \<provider-physical-network>

* Name of the physical network over which the virtual network is implemented

provider-segment \<provider-segment>

* VLAN ID for VLAN networks or Tunnel ID for GENEVE/GRE/VXLAN networks

dns-domain \<dns-domain>

* Set DNS domain for this network (requires DNS integration extension)

tag \<tag>

* Tag to be added to the network (repeat option to set multiple tags)

*Network version 2 only*

no-tag

* No tags associated with the network

*Network version 2 only*

subnet \<subnet>

* IPv4 subnet for fixed IPs (in CIDR notation)

*Compute version 2 only*

name

* New network name

---

## **network delete**

Delete network(s)

* openstack network delete \<network> \[\<network> ...]

network

* Network(s) to delete (name or ID)

---

## **network list**

List networks

```
openstack network list

     \[--sort-column SORT\_COLUMN]
     \[--sort-ascending | --sort-descending]
     \[--external | --internal]
     \[--long]
     \[--name \<name>]
     \[--enable | --disable]
     \[--project \<project>]
     \[--project-domain \<project-domain>]
     \[--share | --no-share]
     \[--status \<status>]
     \[--provider-network-type \<provider-network-type>]
     \[--provider-physical-network \<provider-physical-network>]
     \[--provider-segment \<provider-segment>]
     \[--agent \<agent-id>]
     \[--tags \<tag>\[,\<tag>,...]]
     \[--any-tags \<tag>\[,\<tag>,...]]
     \[--not-tags \<tag>\[,\<tag>,...]]
     \[--not-any-tags \<tag>\[,\<tag>,...]]
```

sort-column SORT\_COLUMN

* specify the column(s) to sort the data (columns specified first have a priority, non-existing columns are ignored), can be repeated

sort-ascending

* sort the column(s) in ascending order

sort-descending

* sort the column(s) in descending order

external

* List external networks

*Network version 2 only*

internal

* List internal networks

*Network version 2 only*

long

* List additional fields in output

*Network version 2 only*

name \<name>

* List networks according to their name

*Network version 2 only*

enable

* List enabled networks

*Network version 2 only*

disable

* List disabled networks

*Network version 2 only*

project \<project>

* List networks according to their project (name or ID)

project-domain \<project-domain>

* Domain the project belongs to (name or ID). This can be used in case collisions between project names exist.

*Network version 2 only*

share

* List networks shared between projects

*Network version 2 only*

no-share

* List networks not shared between projects

*Network version 2 only*

status \<status>

* List networks according to their status (‘ACTIVE’, ‘BUILD’, ‘DOWN’, ‘ERROR’)

*Network version 2 only*

provider-network-type \<provider-network-type>

* List networks according to their physical mechanisms. The supported options are: flat, geneve, gre, local, vlan, vxlan.

*Network version 2 only*

provider-physical-network \<provider-physical-network>

* List networks according to name of the physical network

*Network version 2 only*

provider-segment \<provider-segment>

* List networks according to VLAN ID for VLAN networks or Tunnel ID for GENEVE/GRE/VXLAN networks

*Network version 2 only*

agent \<agent-id>

* List networks hosted by agent (ID only)

*Network version 2 only*

tags \<tag>\[,\<tag>,…]

* List networks which have all given tag(s) (Comma-separated list of tags)

*Network version 2 only*

any-tags \<tag>\[,\<tag>,…]

* List networks which have any given tag(s) (Comma-separated list of tags)

*Network version 2 only*

not-tags \<tag>\[,\<tag>,…]

* Exclude networks which have all given tag(s) (Comma-separated list of tags)

*Network version 2 only*

not-any-tags \<tag>\[,\<tag>,…]

* Exclude networks which have any given tag(s) (Comma-separated list of tags)

*Network version 2 only*

---

## **network set**

Set network properties

```
openstack network set

     \[--extra-property type=\<property\_type>,name=\<property\_name>,value=\<property\_value>]
     \[--name \<name>]
     \[--enable | --disable]
     \[--share | --no-share]
     \[--description \<description]
     \[--mtu \<mtu]
     \[--enable-port-security | --disable-port-security]
     \[--external | --internal]
     \[--default | --no-default]
     \[--qos-policy \<qos-policy> | --no-qos-policy]
     \[--tag \<tag>]
     \[--no-tag]
     \[--provider-network-type \<provider-network-type>]
     \[--provider-physical-network \<provider-physical-network>]
     \[--provider-segment \<provider-segment>]
     \[--dns-domain \<dns-domain>]
     \<network>
```

extra-property type=\<property\_type>,name=\<property\_name>,value=\<property\_value>

* Additional parameters can be passed using this property. Default type of the extra property is string (‘str’), but other types can be used as well. Available types are: ‘dict’, ‘list’, ‘str’, ‘bool’, ‘int’. In case of ‘list’ type, ‘value’ can be semicolon-separated list of values. For ‘dict’ value is semicolon-separated list of the key:value pairs.

name \<name>

* Set network name

enable

* Enable network

disable

* Disable network

share

* Share the network between projects

no-share

* Do not share the network between projects

description \<description

* Set network description

mtu \<mtu

* Set network mtu

enable-port-security

* Enable port security by default for ports created on this network

disable-port-security

* Disable port security by default for ports created on this network

external

* Set this network as an external network (external-net extension required)

internal

* Set this network as an internal network

default

* Set the network as the default external network

no-default

* Do not use the network as the default external network

qos-policy \<qos-policy>

* QoS policy to attach to this network (name or ID)

no-qos-policy

* Remove the QoS policy attached to this network

tag \<tag>

* Tag to be added to the network (repeat option to set multiple tags)

no-tag

* Clear tags associated with the network. Specify both –tag and –no-tag to overwrite current tags

provider-network-type \<provider-network-type>

* The physical mechanism by which the virtual network is implemented. For example: flat, geneve, gre, local, vlan, vxlan.

provider-physical-network \<provider-physical-network>

* Name of the physical network over which the virtual network is implemented

provider-segment \<provider-segment>

* VLAN ID for VLAN networks or Tunnel ID for GENEVE/GRE/VXLAN networks

dns-domain \<dns-domain>

* Set DNS domain for this network (requires DNS integration extension)

network

* Network to modify (name or ID)

---

## **network show**

Show network details

* `openstack network show \<network>`

network

* Network to display (name or ID)

---

## **network unset**

Unset network properties

openstack network unset

* \[--extra-property type=\<property\_type>,name=\<property\_name>,value=\<property\_value>           \[--tag \<tag> | --all-tag]
  &#x20;\<network>

extra-property type=\<property\_type>,name=\<property\_name>,value=\<property\_value>

* Additional parameters can be passed using this property. Default type of the extra property is string (‘str’), but other types can be used as well. Available types are: ‘dict’, ‘list’, ‘str’, ‘bool’, ‘int’. In case of ‘list’ type, ‘value’ can be semicolon-separated list of values. For ‘dict’ value is semicolon-separated list of the key:value pairs.

tag \<tag>

* Tag to be removed from the network (repeat option to remove multiple tags)

all-tag

* Clear all tags associated with the network

network

* Network to modify (name or ID)
