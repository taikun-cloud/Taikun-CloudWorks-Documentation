# **Security Group Rules in CLI**

A **security group rule** specifies the network access rules for servers and other resources on the network.

Compute v2, Network v2

---

## **security group rule create**

Create a new security group rule

openstack security group rule create
&#x20;   \[--extra-property type=\<property\_type>,name=\<property\_name>,value=\<property\_value>]

&#x20;   \[--remote-ip \<ip-address> | --remote-group \<group>]

&#x20;   \[--dst-port \<port-range>]

&#x20;   \[--protocol \<protocol>]
&#x20;   \[--description \<description>]
&#x20;   \[--icmp-type \<icmp-type>]
&#x20;   \[--icmp-code \<icmp-code>]
&#x20;   \[--ingress | --egress]
&#x20;   \[--ethertype \<ethertype>]
&#x20;   \[--project \<project>]
&#x20;   \[--project-domain \<project-domain>]
&#x20;   \<group>

–extra-property type=\<property\_type>,name=\<property\_name>,value=\<property\_value>

Additional parameters can be passed using this property. Default type of the extra property is string (‘str’), but other types can be used as well. Available types are: ‘dict’, ‘list’, ‘str’, ‘bool’, ‘int’. In case of ‘list’ type, ‘value’ can be semicolon-separated list of values. For ‘dict’ value is semicolon-separated list of the key:value pairs.

–remote-ip \<ip-address>

Remote IP address block (may use CIDR notation; default for IPv4 rule: 0.0.0.0/0, default for IPv6 rule: ::/0)

–remote-group \<group>

Remote security group (name or ID)

–dst-port \<port-range>

Destination port, may be a single port or a starting and ending port range: 137:139. Required for IP protocols TCP and UDP. Ignored for ICMP IP protocols.

–protocol \<protocol>

*Network version 2:*

IP protocol (ah, dccp, egp, esp, gre, icmp, igmp, ipv6-encap, ipv6-frag, ipv6-icmp, ipv6-nonxt, ipv6-opts, ipv6-route, ospf, pgm, rsvp, sctp, tcp, udp, udplite, vrrp and integer representations \[0-255] or any; default: any (all protocols))

*Compute version 2:*

IP protocol (icmp, tcp, udp; default: tcp)

–description \<description>

Set security group rule description

*Network version 2 only*

–icmp-type \<icmp-type>

ICMP type for ICMP IP protocols

*Network version 2 only*

–icmp-code \<icmp-code>

ICMP code for ICMP IP protocols

*Network version 2 only*

–ingress

Rule applies to incoming network traffic (default)

*Network version 2 only*

–egress

Rule applies to outgoing network traffic

*Network version 2 only*

–ethertype \<ethertype>

Ethertype of network traffic (IPv4, IPv6; default: based on IP protocol)

*Network version 2 only*

–project \<project>

Owner’s project (name or ID)

*Network version 2 only*

–project-domain \<project-domain>

Domain the project belongs to (name or ID). This can be used in case collisions between project names exist.

*Network version 2 only*

group

Create rule in this security group (name or ID)

---

## **security group rule delete**

Delete security group rule(s)

openstack security group rule delete \<rule> \[\<rule> ...]

rule

Security group rule(s) to delete (ID only)

---

## **security group rule list**

List security group rules

openstack security group rule list
&#x20;   \[--sort-column SORT\_COLUMN]
&#x20;   \[--sort-ascending | --sort-descending]
&#x20;   \[--protocol \<protocol>]
&#x20;   \[--ethertype \<ethertype>]
&#x20;   \[--ingress | --egress]
&#x20;   \[--long]
&#x20;   \[--all-projects]
&#x20;   \[\<group>]

–sort-column SORT\_COLUMN

specify the column(s) to sort the data (columns specified first have a priority, non-existing columns are ignored), can be repeated

–sort-ascending

sort the column(s) in ascending order

–sort-descending

sort the column(s) in descending order

–protocol \<protocol>

List rules by the IP protocol (ah, dhcp, egp, esp, gre, icmp, igmp, ipv6-encap, ipv6-frag, ipv6-icmp, ipv6-nonxt, ipv6-opts, ipv6-route, ospf, pgm, rsvp, sctp, tcp, udp, udplite, vrrp and integer representations \[0-255] or any; default: any (all protocols))

*Network version 2 only*

–ethertype \<ethertype>

List rules by the Ethertype (IPv4 or IPv6)

*Network version 2 only*

–ingress

List rules applied to incoming network traffic

*Network version 2 only*

–egress

List rules applied to outgoing network traffic

*Network version 2 only*

–long

**Deprecated** This argument is no longer needed

*Network version 2 only*

–all-projects

Display information from all projects (admin only)

*Compute version 2 only*

group

List all rules in this security group (name or ID)

---

## **security group rule show**

Display security group rule details

openstack security group rule show \<rule>

rule

Security group rule to display (ID only)
