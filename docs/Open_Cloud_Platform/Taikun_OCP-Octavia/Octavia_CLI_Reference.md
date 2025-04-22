# **Octavia CLI Reference**

List of released CLI commands available in openstack client. These commands can be referenced by doing `openstack help loadbalancer`.

---

## **loadbalancer**

### loadbalancer create

Create a load balancer

```
openstack loadbalancer create
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--name <name>]
    [--description <description>]
    [--vip-address <vip_address>]
    [--vip-port-id <vip_port_id>]
    [--vip-subnet-id <vip_subnet_id>]
    [--vip-network-id <vip_network_id>]
    [--vip-qos-policy-id <vip_qos_policy_id>]
    [--additional-vip subnet-id=<name-or-uuid>[,ip-address=<ip>]]
    [--project <project>]
    [--provider <provider>]
    [--availability-zone <availability_zone>]
    [--enable | --disable]
    [--flavor <flavor>]
    [--wait]
    [--tag <tag> | --no-tag]
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–name** \<name>

New load balancer name.**–description** \<description>

Set load balancer description.**–vip-address** \<vip\_address>

Set the VIP IP Address.**–vip-port-id** \<vip\_port\_id>

Set Port for the load balancer (name or ID).**–vip-subnet-id** \<vip\_subnet\_id>

Set subnet for the load balancer (name or ID).**–vip-network-id** \<vip\_network\_id>

Set network for the load balancer (name or ID).**–vip-qos-policy-id** \<vip\_qos\_policy\_id>

Set QoS policy ID for VIP port. Unset with ‘None’.**–additional-vip** subnet-id=\<name-or-uuid>\[,ip-address=\<ip>]

Expose an additional VIP on the load balancer. This parameter can be provided more than once.**–project** \<project>

Project for the load balancer (name or ID).**–provider** \<provider>

Provider name for the load balancer.**–availability-zone** \<availability\_zone>

Availability zone for the load balancer.**–enable**

Enable load balancer (default).**–disable**

Disable load balancer.**–flavor** \<flavor>

The name or ID of the flavor for the load balancer.**–wait**

Wait for action to complete.**–tag** \<tag>

Tag to be added to the load balancer (repeat option to set multiple tags)**–no-tag**

No tags associated with the load balancer

This command is provided by the python-octaviaclient plugin.

### loadbalancer delete

Delete a load balancer

```
openstack loadbalancer delete [--cascade] [--wait] <load_balancer>
```

**–cascade**

Cascade the delete to all child elements of the load balancer.**–wait**

Wait for action to complete.**load\_balancer**

Load balancers to delete (name or ID).

This command is provided by the python-octaviaclient plugin.

### loadbalancer list

List load balancers

```
openstack loadbalancer list
    [-f {csv,json,table,value,yaml}]
    [-c COLUMN]
    [--quote {all,minimal,none,nonnumeric}]
    [--noindent]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--sort-column SORT_COLUMN]
    [--sort-ascending | --sort-descending]
    [--name <name>]
    [--enable | --disable]
    [--project <project-id>]
    [--vip-network-id <vip_network_id>]
    [--vip-subnet-id <vip_subnet_id>]
    [--vip-qos-policy-id <vip_qos_policy_id>]
    [--vip-port-id <vip_port_id>]
    [--provisioning-status {ACTIVE,ERROR,PENDING_CREATE,PENDING_UPDATE,PENDING_DELETE}]
    [--operating-status {ONLINE,DRAINING,OFFLINE,DEGRADED,ERROR,NO_MONITOR}]
    [--provider <provider>]
    [--flavor <flavor>]
    [--availability-zone <availability_zone>]
    [--tags <tag>[,<tag>,...]]
    [--any-tags <tag>[,<tag>,...]]
    [--not-tags <tag>[,<tag>,...]]
    [--not-any-tags <tag>[,<tag>,...]]
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–quote** \<QUOTE\_MODE>

when to include quotes, defaults to nonnumeri&#x63;**–noindent**

whether to disable indenting the JSO&#x4E;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–sort-column** SORT\_COLUMN

specify the column(s) to sort the data (columns specified first have a priority, non-existing columns are ignored), can be repeate&#x64;**–sort-ascending**

sort the column(s) in ascending orde&#x72;**–sort-descending**

sort the column(s) in descending orde&#x72;**–name** \<name>

List load balancers according to their name.**–enable**

List enabled load balancers.**–disable**

List disabled load balancers.**–project** \<project-id>

List load balancers according to their project (name or ID).**–vip-network-id** \<vip\_network\_id>

List load balancers according to their VIP network (name or ID).**–vip-subnet-id** \<vip\_subnet\_id>

List load balancers according to their VIP subnet (name or ID).**–vip-qos-policy-id** \<vip\_qos\_policy\_id>

List load balancers according to their VIP Qos policy (name or ID).**–vip-port-id** \<vip\_port\_id>

List load balancers according to their VIP port (name or ID).**–provisioning-status** \{ACTIVE,ERROR,PENDING\_CREATE,PENDING\_UPDATE,PENDING\_DELETE}

List load balancers according to their provisioning status.**–operating-status** \{ONLINE,DRAINING,OFFLINE,DEGRADED,ERROR,NO\_MONITOR}

List load balancers according to their operating status.**–provider** \<provider>

List load balancers according to their provider.**–flavor** \<flavor>

List load balancers according to their flavor.**–availability-zone** \<availability\_zone>

List load balancers according to their availability zone.**–tags** \<tag>\[,\<tag>,…]

List load balancer which have all given tag(s) (Comma-separated list of tags)**–any-tags** \<tag>\[,\<tag>,…]

List load balancer which have any given tag(s) (Comma-separated list of tags)**–not-tags** \<tag>\[,\<tag>,…]

Exclude load balancer which have all given tag(s) (Comma-separated list of tags)**–not-any-tags** \<tag>\[,\<tag>,…]

Exclude load balancer which have any given tag(s) (Comma-separated list of tags)

This command is provided by the python-octaviaclient plugin.

### loadbalancer set

Update a load balancer

```
openstack loadbalancer set
    [--name <name>]
    [--description <description>]
    [--vip-qos-policy-id <vip_qos_policy_id>]
    [--enable | --disable]
    [--wait]
    [--tag <tag>]
    [--no-tag]
    <load_balancer>
```

**–name** \<name>

Set load balancer name.**–description** \<description>

Set load balancer description.**–vip-qos-policy-id** \<vip\_qos\_policy\_id>

Set QoS policy ID for VIP port. Unset with ‘None’.**–enable**

Enable load balancer.**–disable**

Disable load balancer.**–wait**

Wait for action to complete.**–tag** \<tag>

Tag to be added to the load balancer (repeat option to set multiple tags)**–no-tag**

Clear tags associated with the load balancer. Specify both –tag and –no-tag to overwrite current tags**load\_balancer**

Name or UUID of the load balancer to update.

This command is provided by the python-octaviaclient plugin.

### loadbalancer unset

Clear load balancer settings

```
openstack loadbalancer unset
    [--name]
    [--description]
    [--vip-qos-policy-id]
    [--wait]
    [--tag <tag> | --all-tag]
    <load_balancer>
```

**–name**

Clear the load balancer name.**–description**

Clear the load balancer description.**–vip-qos-policy-id**

Clear the load balancer QoS policy.**–wait**

Wait for action to complete.**–tag** \<tag>

Tag to be removed from the load balancer (repeat option to remove multiple tags)**–all-tag**

Clear all tags associated with the load balancer**load\_balancer**

Name or UUID of the load balancer to update.

This command is provided by the python-octaviaclient plugin.

### loadbalancer show

Show the details for a single load balancer

```
openstack loadbalancer show
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    <load_balancer>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**load\_balancer**

Name or UUID of the load balancer.

This command is provided by the python-octaviaclient plugin.

### loadbalancer stats show

Shows the current statistics for a load balancer

```
openstack loadbalancer stats show
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    <load_balancer>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**load\_balancer**

Name or UUID of the load balancer.

This command is provided by the python-octaviaclient plugin.

### loadbalancer status show

Display load balancer status tree in json format

```
openstack loadbalancer status show <load_balancer>
```

**load\_balancer**

Name or UUID of the load balancer.

This command is provided by the python-octaviaclient plugin.

### loadbalancer failover

Trigger load balancer failover

```
openstack loadbalancer failover [--wait] <load_balancer>
```

**–wait**

Wait for action to complete.**load\_balancer**

Name or UUID of the load balancer.

This command is provided by the python-octaviaclient plugin.

---

## **listener**

### loadbalancer listener create

Create a listener

```
openstack loadbalancer listener create
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--name <name>]
    [--description <description>]
    --protocol
    {TCP,HTTP,HTTPS,TERMINATED_HTTPS,UDP,SCTP,PROMETHEUS}
    [--connection-limit <limit>]
    [--default-pool <pool>]
    [--default-tls-container-ref <container_ref>]
    [--sni-container-refs [<container_ref> ...]]
    [--insert-headers <header=value,...>]
    --protocol-port <port>
    [--timeout-client-data <timeout>]
    [--timeout-member-connect <timeout>]
    [--timeout-member-data <timeout>]
    [--timeout-tcp-inspect <timeout>]
    [--enable | --disable]
    [--client-ca-tls-container-ref <container_ref>]
    [--client-authentication {NONE,OPTIONAL,MANDATORY}]
    [--client-crl-container-ref <client_crl_container_ref>]
    [--allowed-cidr [<allowed_cidr>]]
    [--wait]
    [--tls-ciphers <tls_ciphers>]
    [--tls-version [<tls_versions>]]
    [--alpn-protocol [<alpn_protocols>]]
    [--hsts-max-age <hsts_max_age>]
    [--hsts-include-subdomains]
    [--hsts-preload]
    [--tag <tag> | --no-tag]
    <loadbalancer>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–name** \<name>

Set the listener name.**–description** \<description>

Set the description of this listener.**–protocol** \{TCP,HTTP,HTTPS,TERMINATED\_HTTPS,UDP,SCTP,PROMETHEUS}

The protocol for the listener.**–connection-limit** \<limit>

Set the maximum number of connections permitted for this listener.**–default-pool** \<pool>

Set the name or ID of the pool used by the listener if no L7 policies match.**–default-tls-container-ref** \<container\_ref>

The URI to the key manager service secrets container containing the certificate and key for TERMINATED\_TLS listeners.**–sni-container-refs** \<container\_ref>

A list of URIs to the key manager service secrets containers containing the certificates and keys for TERMINATED\_TLS the listener using Server Name Indication.**–insert-headers** \<header=value,…>

A dictionary of optional headers to insert into the request before it is sent to the backend member.**–protocol-port** \<port>

Set the protocol port number for the listener.**–timeout-client-data** \<timeout>

Frontend client inactivity timeout in milliseconds. Default: 50000.**–timeout-member-connect** \<timeout>

Backend member connection timeout in milliseconds. Default: 5000.**–timeout-member-data** \<timeout>

Backend member inactivity timeout in milliseconds. Default: 50000.**–timeout-tcp-inspect** \<timeout>

Time, in milliseconds, to wait for additional TCP packets for content inspection. Default: 0.**–enable**

Enable listener (default).**–disable**

Disable listener.**–client-ca-tls-container-ref** \<container\_ref>

The URI to the key manager service secrets container containing the CA certificate for TERMINATED\_TLS listeners.**–client-authentication** \{NONE,OPTIONAL,MANDATORY}

The TLS client authentication verify options for TERMINATED\_TLS listeners.**–client-crl-container-ref** \<client\_crl\_container\_ref>

The URI to the key manager service secrets container containting the CA revocation list file for TERMINATED\_TLS listeners.**–allowed-cidr** \<allowed\_cidr>

CIDR to allow access to the listener (can be set multiple times).**–wait**

Wait for action to complete.**–tls-ciphers** \<tls\_ciphers>

Set the TLS ciphers to be used by the listener in OpenSSL format.**–tls-version** \<tls\_versions>

Set the TLS protocol version to be used by the listener (can be set multiple times).**–alpn-protocol** \<alpn\_protocols>

Set the ALPN protocol to be used by the listener (can be set multiple times).**–hsts-max-age** \<hsts\_max\_age>

The value of the max\_age directive for the Strict-Transport-Security HTTP response header. Setting this enables HTTP Strict Transport Security (HSTS) for the TLS-terminated listener.**–hsts-include-subdomains**

Define whether the includeSubDomains directive should be added to the Strict-Transport-Security HTTP response header.**–hsts-preload**

Define whether the preload directive should be added to the Strict-Transport-Security HTTP response header.**–tag** \<tag>

Tag to be added to the listener (repeat option to set multiple tags)**–no-tag**

No tags associated with the listener**loadbalancer**

Load balancer for the listener (name or ID).

This command is provided by the python-octaviaclient plugin.

### loadbalancer listener delete

Delete a listener

```
openstack loadbalancer listener delete [--wait] <listener>
```

**–wait**

Wait for action to complete.**listener**

Listener to delete (name or ID).

This command is provided by the python-octaviaclient plugin.

### loadbalancer listener list

List listeners

```
openstack loadbalancer listener list
    [-f {csv,json,table,value,yaml}]
    [-c COLUMN]
    [--quote {all,minimal,none,nonnumeric}]
    [--noindent]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--sort-column SORT_COLUMN]
    [--sort-ascending | --sort-descending]
    [--name <name>]
    [--loadbalancer <loadbalancer>]
    [--enable | --disable]
    [--project <project>]
    [--tags <tag>[,<tag>,...]]
    [--any-tags <tag>[,<tag>,...]]
    [--not-tags <tag>[,<tag>,...]]
    [--not-any-tags <tag>[,<tag>,...]]
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–quote** \<QUOTE\_MODE>

when to include quotes, defaults to nonnumeri&#x63;**–noindent**

whether to disable indenting the JSO&#x4E;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–sort-column** SORT\_COLUMN

specify the column(s) to sort the data (columns specified first have a priority, non-existing columns are ignored), can be repeate&#x64;**–sort-ascending**

sort the column(s) in ascending orde&#x72;**–sort-descending**

sort the column(s) in descending orde&#x72;**–name** \<name>

List listeners by listener name.**–loadbalancer** \<loadbalancer>

Filter by load balancer (name or ID).**–enable**

List enabled listeners.**–disable**

List disabled listeners.**–project** \<project>

List listeners by project ID.**–tags** \<tag>\[,\<tag>,…]

List listener which have all given tag(s) (Comma-separated list of tags)**–any-tags** \<tag>\[,\<tag>,…]

List listener which have any given tag(s) (Comma-separated list of tags)**–not-tags** \<tag>\[,\<tag>,…]

Exclude listener which have all given tag(s) (Comma-separated list of tags)**–not-any-tags** \<tag>\[,\<tag>,…]

Exclude listener which have any given tag(s) (Comma-separated list of tags)

This command is provided by the python-octaviaclient plugin.

### loadbalancer listener set

Update a listener

```
openstack loadbalancer listener set
    [--name <name>]
    [--description <description>]
    [--connection-limit <limit>]
    [--default-pool <pool>]
    [--default-tls-container-ref <container-ref>]
    [--sni-container-refs [<container-ref> ...]]
    [--insert-headers <header=value>]
    [--timeout-client-data <timeout>]
    [--timeout-member-connect <timeout>]
    [--timeout-member-data <timeout>]
    [--timeout-tcp-inspect <timeout>]
    [--enable | --disable]
    [--client-ca-tls-container-ref <container_ref>]
    [--client-authentication {NONE,OPTIONAL,MANDATORY}]
    [--client-crl-container-ref <client_crl_container_ref>]
    [--allowed-cidr [<allowed_cidr>]]
    [--wait]
    [--tls-ciphers <tls_ciphers>]
    [--tls-version [<tls_versions>]]
    [--alpn-protocol [<alpn_protocols>]]
    [--hsts-max-age <hsts_max_age>]
    [--hsts-include-subdomains]
    [--hsts-preload]
    [--tag <tag>]
    [--no-tag]
    <listener>
```

**–name** \<name>

Set the listener name.**–description** \<description>

Set the description of this listener.**–connection-limit** \<limit>

The maximum number of connections permitted for this listener. Default value is -1 which represents infinite connections.**–default-pool** \<pool>

The ID of the pool used by the listener if no L7 policies match.**–default-tls-container-ref** \<container-ref>

The URI to the key manager service secrets container containing the certificate and key for TERMINATED\_TLS listeners.**–sni-container-refs** \<container-ref>

A list of URIs to the key manager service secrets containers containing the certificates and keys for TERMINATED\_TLS the listener using Server Name Indication.**–insert-headers** \<header=value>

A dictionary of optional headers to insert into the request before it is sent to the backend member.**–timeout-client-data** \<timeout>

Frontend client inactivity timeout in milliseconds. Default: 50000.**–timeout-member-connect** \<timeout>

Backend member connection timeout in milliseconds. Default: 5000.**–timeout-member-data** \<timeout>

Backend member inactivity timeout in milliseconds. Default: 50000.**–timeout-tcp-inspect** \<timeout>

Time, in milliseconds, to wait for additional TCP packets for content inspection. Default: 0.**–enable**

Enable listener.**–disable**

Disable listener.**–client-ca-tls-container-ref** \<container\_ref>

The URI to the key manager service secrets container containing the CA certificate for TERMINATED\_TLS listeners.**–client-authentication** \{NONE,OPTIONAL,MANDATORY}

The TLS client authentication verify options for TERMINATED\_TLS listeners.**–client-crl-container-ref** \<client\_crl\_container\_ref>

The URI to the key manager service secrets container containting the CA revocation list file for TERMINATED\_TLS listeners.**–allowed-cidr** \<allowed\_cidr>

CIDR to allow access to the listener (can be set multiple times).**–wait**

Wait for action to complete.**–tls-ciphers** \<tls\_ciphers>

Set the TLS ciphers to be used by the listener in OpenSSL format.**–tls-version** \<tls\_versions>

Set the TLS protocol version to be used by the listener (can be set multiple times).**–alpn-protocol** \<alpn\_protocols>

Set the ALPN protocol to be used by the listener (can be set multiple times).**–hsts-max-age** \<hsts\_max\_age>

The value of the max\_age directive for the Strict-Transport-Security HTTP response header. Setting this enables HTTP Strict Transport Security (HSTS) for the TLS-terminated listener.**–hsts-include-subdomains**

Defines whether the includeSubDomains directive should be added to the Strict-Transport-Security HTTP response header.**–hsts-preload**

Defines whether the preload directive should be added to the Strict-Transport-Security HTTP response header.**–tag** \<tag>

Tag to be added to the listener (repeat option to set multiple tags)**–no-tag**

Clear tags associated with the listener. Specify both –tag and –no-tag to overwrite current tags**listener**

Listener to modify (name or ID).

This command is provided by the python-octaviaclient plugin.

### loadbalancer listener show

Show the details of a single listener

```
openstack loadbalancer listener show
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    <listener>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**listener**

Name or UUID of the listener.

This command is provided by the python-octaviaclient plugin.

### loadbalancer listener stats show

Shows the current statistics for a listener.

```
openstack loadbalancer listener stats show
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    <listener>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**listener**

Name or UUID of the listener.

This command is provided by the python-octaviaclient plugin.

### loadbalancer listener unset

Clear listener settings

```
openstack loadbalancer listener unset
    [--name]
    [--description]
    [--connection-limit]
    [--default-pool]
    [--default-tls-container-ref]
    [--sni-container-refs]
    [--insert-headers]
    [--timeout-client-data]
    [--timeout-member-connect]
    [--timeout-member-data]
    [--timeout-tcp-inspect]
    [--client-ca-tls-container-ref]
    [--client-authentication]
    [--client-crl-container-ref]
    [--allowed-cidrs]
    [--tls-versions]
    [--tls-ciphers]
    [--wait]
    [--alpn-protocols]
    [--hsts-max-age]
    [--hsts-include-subdomains]
    [--hsts-preload]
    [--tag <tag> | --all-tag]
    <listener>
```

**–name**

Clear the listener name.**–description**

Clear the description of this listener.**–connection-limit**

Reset the connection limit to the API default.**–default-pool**

Clear the default pool from the listener.**–default-tls-container-ref**

Remove the default TLS container reference from the listener.**–sni-container-refs**

Remove the TLS SNI container references from the listener.**–insert-headers**

Clear the insert headers from the listener.**–timeout-client-data**

Reset the client data timeout to the API default.**–timeout-member-connect**

Reset the member connect timeout to the API default.**–timeout-member-data**

Reset the member data timeout to the API default.**–timeout-tcp-inspect**

Reset the TCP inspection timeout to the API default.**–client-ca-tls-container-ref**

Clear the client CA TLS container reference from the listener.**–client-authentication**

Reset the client authentication setting to the API default.**–client-crl-container-ref**

Clear the client CRL container reference from the listener.**–allowed-cidrs**

Clear all allowed CIDRs from the listener.**–tls-versions**

Clear all TLS versions from the listener.**–tls-ciphers**

Clear all TLS ciphers from the listener.**–wait**

Wait for action to complete.**–alpn-protocols**

Clear all ALPN protocols from the listener.**–hsts-max-age**

Disables HTTP Strict Transport Security (HSTS) for the TLS-terminated listener.**–hsts-include-subdomains**

Removes the includeSubDomains directive from the Strict-Transport-Security HTTP response header.**–hsts-preload**

Removes the preload directive from the Strict-Transport-Security HTTP response header.**–tag** \<tag>

Tag to be removed from the listener (repeat option to remove multiple tags)**–all-tag**

Clear all tags associated with the listener**listener**

Listener to modify (name or ID).

This command is provided by the python-octaviaclient plugin.

---

## **pool**

### loadbalancer pool create

Create a pool

```
openstack loadbalancer pool create
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--name <name>]
    [--description <description>]
    --protocol
    {TCP,HTTP,HTTPS,PROXY,PROXYV2,UDP,SCTP}
    (--listener <listener> | --loadbalancer <load_balancer>)
    [--session-persistence <session persistence>]
    --lb-algorithm
    {SOURCE_IP,ROUND_ROBIN,LEAST_CONNECTIONS,SOURCE_IP_PORT}
    [--enable | --disable]
    [--tls-container-ref <container-ref>]
    [--ca-tls-container-ref <ca_tls_container_ref>]
    [--crl-container-ref <crl_container_ref>]
    [--enable-tls | --disable-tls]
    [--wait]
    [--tls-ciphers <tls_ciphers>]
    [--tls-version [<tls_versions>]]
    [--alpn-protocol [<alpn_protocols>]]
    [--tag <tag> | --no-tag]
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–name** \<name>

Set pool name.**–description** \<description>

Set pool description.**–protocol** \{TCP,HTTP,HTTPS,PROXY,PROXYV2,UDP,SCTP}

Set the pool protocol.**–listener** \<listener>

Listener to add the pool to (name or ID).**–loadbalancer** \<load\_balancer>

Load balancer to add the pool to (name or ID).**–session-persistence** \<session persistence>

Set the session persistence for the listener (key=value).**–lb-algorithm** \{SOURCE\_IP,ROUND\_ROBIN,LEAST\_CONNECTIONS,SOURCE\_IP\_PORT}

Load balancing algorithm to use.**–enable**

Enable pool (default).**–disable**

Disable pool.**–tls-container-ref** \<container-ref>

The reference to the key manager service secrets container containing the certificate and key for `tls_enabled` pools to re-encrpt the traffic to backend member servers.**–ca-tls-container-ref** \<ca\_tls\_container\_ref>

The reference to the key manager service secrets container containing the CA certificate for `tls_enabled` pools to check the backend member servers certificates.**–crl-container-ref** \<crl\_container\_ref>

The reference to the key manager service secrets container containting the CA revocation list file for `tls_enabled` pools to validate the backend member servers certificates.**–enable-tls**

Enable backend member re-encryption.**–disable-tls**

Disable backend member re-encryption.**–wait**

Wait for action to complete.**–tls-ciphers** \<tls\_ciphers>

Set the TLS ciphers to be used by the pool in OpenSSL cipher string format.**–tls-version** \<tls\_versions>

Set the TLS protocol version to be used by the pool (can be set multiple times).**–alpn-protocol** \<alpn\_protocols>

Set the ALPN protocol to be used by the pool (can be set multiple times).**–tag** \<tag>

Tag to be added to the pool (repeat option to set multiple tags)**–no-tag**

No tags associated with the pool

This command is provided by the python-octaviaclient plugin.

### loadbalancer pool delete

Delete a pool

`openstack loadbalancer pool delete [--wait] <pool>`

**–wait**

Wait for action to complete.**pool**

Pool to delete (name or ID).

This command is provided by the python-octaviaclient plugin.

### loadbalancer pool list

List pools

```
openstack loadbalancer pool list
    [-f {csv,json,table,value,yaml}]
    [-c COLUMN]
    [--quote {all,minimal,none,nonnumeric}]
    [--noindent]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--sort-column SORT_COLUMN]
    [--sort-ascending | --sort-descending]
    [--loadbalancer <loadbalancer>]
    [--tags <tag>[,<tag>,...]]
    [--any-tags <tag>[,<tag>,...]]
    [--not-tags <tag>[,<tag>,...]]
    [--not-any-tags <tag>[,<tag>,...]]
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–quote** \<QUOTE\_MODE>

when to include quotes, defaults to nonnumeri&#x63;**–noindent**

whether to disable indenting the JSO&#x4E;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–sort-column** SORT\_COLUMN

specify the column(s) to sort the data (columns specified first have a priority, non-existing columns are ignored), can be repeate&#x64;**–sort-ascending**

sort the column(s) in ascending orde&#x72;**–sort-descending**

sort the column(s) in descending orde&#x72;**–loadbalancer** \<loadbalancer>

Filter by load balancer (name or ID).**–tags** \<tag>\[,\<tag>,…]

List pool which have all given tag(s) (Comma-separated list of tags)**–any-tags** \<tag>\[,\<tag>,…]

List pool which have any given tag(s) (Comma-separated list of tags)**–not-tags** \<tag>\[,\<tag>,…]

Exclude pool which have all given tag(s) (Comma-separated list of tags)**–not-any-tags** \<tag>\[,\<tag>,…]

Exclude pool which have any given tag(s) (Comma-separated list of tags)

This command is provided by the python-octaviaclient plugin.

### loadbalancer pool set

Update a pool

```
openstack loadbalancer pool set
    [--name <name>]
    [--description <description>]
    [--session-persistence <session_persistence>]
    [--lb-algorithm {SOURCE_IP,ROUND_ROBIN,LEAST_CONNECTIONS,SOURCE_IP_PORT}]
    [--enable | --disable]
    [--tls-container-ref <container-ref>]
    [--ca-tls-container-ref <ca_tls_container_ref>]
    [--crl-container-ref <crl_container_ref>]
    [--enable-tls | --disable-tls]
    [--wait]
    [--tls-ciphers <tls_ciphers>]
    [--tls-version [<tls_versions>]]
    [--alpn-protocol [<alpn_protocols>]]
    [--tag <tag>]
    [--no-tag]
    <pool>
```

**–name** \<name>

Set the name of the pool.**–description** \<description>

Set the description of the pool.**–session-persistence** \<session\_persistence>

Set the session persistence for the listener (key=value).**–lb-algorithm** \{SOURCE\_IP,ROUND\_ROBIN,LEAST\_CONNECTIONS,SOURCE\_IP\_PORT}

Set the load balancing algorithm to use.**–enable**

Enable pool.**–disable**

Disable pool.**–tls-container-ref** \<container-ref>

The URI to the key manager service secrets container containing the certificate and key for TERMINATED\_TLS pools to re-encrpt the traffic from TERMINATED\_TLS listener to backend servers.**–ca-tls-container-ref** \<ca\_tls\_container\_ref>

The URI to the key manager service secrets container containing the CA certificate for TERMINATED\_TLS listeners to check the backend servers certificates in ssl traffic.**–crl-container-ref** \<crl\_container\_ref>

The URI to the key manager service secrets container containting the CA revocation list file for TERMINATED\_TLS listeners to valid the backend servers certificates in ssl traffic.**–enable-tls**

Enable backend associated members re-encryption.**–disable-tls**

disable backend associated members re-encryption.**–wait**

Wait for action to complete.**–tls-ciphers** \<tls\_ciphers>

Set the TLS ciphers to be used by the pool in OpenSSL cipher string format.**–tls-version** \<tls\_versions>

Set the TLS protocol version to be used by the pool (can be set multiple times).**–alpn-protocol** \<alpn\_protocols>

Set the ALPN protocol to be used by the pool (can be set multiple times).**–tag** \<tag>

Tag to be added to the pool (repeat option to set multiple tags)**–no-tag**

Clear tags associated with the pool. Specify both –tag and –no-tag to overwrite current tags**pool**

Pool to update (name or ID).

This command is provided by the python-octaviaclient plugin.

### loadbalancer pool show

Show the details of a single pool

```
openstack loadbalancer pool show
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    <pool>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**pool**

Name or UUID of the pool.

This command is provided by the python-octaviaclient plugin.

### loadbalancer pool unset

Clear pool settings

```
openstack loadbalancer pool unset
    [--name]
    [--description]
    [--ca-tls-container-ref]
    [--crl-container-ref]
    [--session-persistence]
    [--tls-container-ref]
    [--tls-versions]
    [--tls-ciphers]
    [--wait]
    [--alpn-protocols]
    [--tag <tag> | --all-tag]
    <pool>
```

**–name**

Clear the pool name.**–description**

Clear the description of this pool.**–ca-tls-container-ref**

Clear the certificate authority certificate reference on this pool.**–crl-container-ref**

Clear the certificate revocation list reference on this pool.**–session-persistence**

Disables session persistence on the pool.**–tls-container-ref**

Clear the certificate reference for this pool.**–tls-versions**

Clear all TLS versions from the pool.**–tls-ciphers**

Clear all TLS ciphers from the pool.**–wait**

Wait for action to complete.**–alpn-protocols**

Clear all ALPN protocols from the pool.**–tag** \<tag>

Tag to be removed from the pool (repeat option to remove multiple tags)**–all-tag**

Clear all tags associated with the pool**pool**

Pool to modify (name or ID).

This command is provided by the python-octaviaclient plugin.

---

## **member**

### loadbalancer member create

Creating a member in a pool

```
openstack loadbalancer member create
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--name <name>]
    [--disable-backup | --enable-backup]
    [--weight <weight>]
    --address <ip_address>
    [--subnet-id <subnet_id>]
    --protocol-port <protocol_port>
    [--monitor-port <monitor_port>]
    [--monitor-address <monitor_address>]
    [--enable | --disable]
    [--wait]
    [--tag <tag> | --no-tag]
    <pool>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–name** \<name>

Name of the member.**–disable-backup**

Disable member backup (default).**–enable-backup**

Enable member backup.**–weight** \<weight>

The weight of a member determines the portion of requests or connections it services compared to the other members of the pool.**–address** \<ip\_address>

The IP address of the backend member server.**–subnet-id** \<subnet\_id>

The subnet ID the member service is accessible from.**–protocol-port** \<protocol\_port>

The protocol port number the backend member server is listening on.**–monitor-port** \<monitor\_port>

An alternate protocol port used for health monitoring a backend member.**–monitor-address** \<monitor\_address>

An alternate IP address used for health monitoring a backend member.**–enable**

Enable member (default).**–disable**

Disable member.**–wait**

Wait for action to complete.**–tag** \<tag>

Tag to be added to the member (repeat option to set multiple tags)**–no-tag**

No tags associated with the member**pool**

ID or name of the pool to create the member for.

This command is provided by the python-octaviaclient plugin.

### loadbalancer member delete

Delete a member from a pool

```
openstack loadbalancer member delete [--wait] <pool> <member>
```

**–wait**

Wait for action to complete.**pool**

Pool name or ID to delete the member from.**member**

Name or ID of the member to be deleted.

This command is provided by the python-octaviaclient plugin.

### loadbalancer member list

List members in a pool

```
openstack loadbalancer member list
    [-f {csv,json,table,value,yaml}]
    [-c COLUMN]
    [--quote {all,minimal,none,nonnumeric}]
    [--noindent]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--sort-column SORT_COLUMN]
    [--sort-ascending | --sort-descending]
    [--tags <tag>[,<tag>,...]]
    [--any-tags <tag>[,<tag>,...]]
    [--not-tags <tag>[,<tag>,...]]
    [--not-any-tags <tag>[,<tag>,...]]
    <pool>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–quote** \<QUOTE\_MODE>

when to include quotes, defaults to nonnumeri&#x63;**–noindent**

whether to disable indenting the JSO&#x4E;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–sort-column** SORT\_COLUMN

specify the column(s) to sort the data (columns specified first have a priority, non-existing columns are ignored), can be repeate&#x64;**–sort-ascending**

sort the column(s) in ascending orde&#x72;**–sort-descending**

sort the column(s) in descending orde&#x72;**–tags** \<tag>\[,\<tag>,…]

List member which have all given tag(s) (Comma-separated list of tags)**–any-tags** \<tag>\[,\<tag>,…]

List member which have any given tag(s) (Comma-separated list of tags)**–not-tags** \<tag>\[,\<tag>,…]

Exclude member which have all given tag(s) (Comma-separated list of tags)**–not-any-tags** \<tag>\[,\<tag>,…]

Exclude member which have any given tag(s) (Comma-separated list of tags)**pool**

Pool name or ID to list the members of.

This command is provided by the python-octaviaclient plugin.

### loadbalancer member set

Update a member

```
openstack loadbalancer member set
    [--name <name>]
    [--disable-backup | --enable-backup]
    [--weight <weight>]
    [--monitor-port <monitor_port>]
    [--monitor-address <monitor_address>]
    [--enable | --disable]
    [--wait]
    [--tag <tag>]
    [--no-tag]
    <pool>
    <member>
```

**–name** \<name>

Set the name of the member.**–disable-backup**

Disable member backup (default).**–enable-backup**

Enable member backup.**–weight** \<weight>

Set the weight of member in the pool.**–monitor-port** \<monitor\_port>

An alternate protocol port used for health monitoring a backend member.**–monitor-address** \<monitor\_address>

An alternate IP address used for health monitoring a backend member.**–enable**

Set the admin\_state\_up to True.**–disable**

Set the admin\_state\_up to False.**–wait**

Wait for action to complete.**–tag** \<tag>

Tag to be added to the member (repeat option to set multiple tags)**–no-tag**

Clear tags associated with the member. Specify both –tag and –no-tag to overwrite current tags**pool**

Pool that the member to update belongs to (name or ID).**member**

Name or ID of the member to update.

This command is provided by the python-octaviaclient plugin.

### loadbalancer member show

Shows details of a single Member

```
openstack loadbalancer member show
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    <pool>
    <member>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**pool**

Pool name or ID to show the members of.**member**

Name or ID of the member to show.

This command is provided by the python-octaviaclient plugin.

### loadbalancer member unset

Clear member settings

```
openstack loadbalancer member unset
    [--backup]
    [--monitor-address]
    [--monitor-port]
    [--name]
    [--weight]
    [--wait]
    [--tag <tag> | --all-tag]
    <pool>
    <member>
```

**–backup**

Clear the backup member flag.**–monitor-address**

Clear the member monitor address.**–monitor-port**

Clear the member monitor port.**–name**

Clear the member name.**–weight**

Reset the member weight to the API default.**–wait**

Wait for action to complete.**–tag** \<tag>

Tag to be removed from the member (repeat option to remove multiple tags)**–all-tag**

Clear all tags associated with the member**pool**

Pool that the member to update belongs to (name or ID).**member**

Member to modify (name or ID).

This command is provided by the python-octaviaclient plugin.

---

## **healthmonitor**

### loadbalancer healthmonitor create

Create a health monitor

```
openstack loadbalancer healthmonitor create
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--name <name>]
    --delay <delay>
    [--domain-name <domain_name>]
    [--expected-codes <codes>]
    [--http-method {GET,POST,DELETE,PUT,HEAD,OPTIONS,PATCH,CONNECT,TRACE}]
    [--http-version <http_version>]
    --timeout <timeout>
    --max-retries <max_retries>
    [--url-path <url_path>]
    --type
    {PING,HTTP,TCP,HTTPS,TLS-HELLO,UDP-CONNECT,SCTP}
    [--max-retries-down <max_retries_down>]
    [--enable | --disable]
    [--wait]
    [--tag <tag> | --no-tag]
    <pool>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–name** \<name>

Set the health monitor name.**–delay** \<delay>

Set the time in seconds, between sending probes to members.**–domain-name** \<domain\_name>

Set the domain name, which be injected into the HTTP Host Header to the backend server for HTTP health check.**–expected-codes** \<codes>

Set the list of HTTP status codes expected in response from the member to declare it healthy.**–http-method** \{GET,POST,DELETE,PUT,HEAD,OPTIONS,PATCH,CONNECT,TRACE}

Set the HTTP method that the health monitor uses for requests.**–http-version** \<http\_version>

Set the HTTP version.**–timeout** \<timeout>

Set the maximum time, in seconds, that a monitor waits to connect before it times out. This value must be less than the delay value.**–max-retries** \<max\_retries>

The number of successful checks before changing the operating status of the member to ONLINE.**–url-path** \<url\_path>

Set the HTTP URL path of the request sent by the monitor to test the health of a backend member.**–type** \{PING,HTTP,TCP,HTTPS,TLS-HELLO,UDP-CONNECT,SCTP}

Set the health monitor type.**–max-retries-down** \<max\_retries\_down>

Set the number of allowed check failures before changing the operating status of the member to ERROR.**–enable**

Enable health monitor (default).**–disable**

Disable health monitor.**–wait**

Wait for action to complete.**–tag** \<tag>

Tag to be added to the health monitor (repeat option to set multiple tags)**–no-tag**

No tags associated with the health monitor**pool**

Set the pool for the health monitor (name or ID).

This command is provided by the python-octaviaclient plugin.

### loadbalancer healthmonitor delete

Delete a health monitor

```
openstack loadbalancer healthmonitor delete [--wait] <health_monitor>
```

**–wait**

Wait for action to complete.**health\_monitor**

Health monitor to delete (name or ID).

This command is provided by the python-octaviaclient plugin.

### loadbalancer healthmonitor list

List health monitors

```
openstack loadbalancer healthmonitor list
    [-f {csv,json,table,value,yaml}]
    [-c COLUMN]
    [--quote {all,minimal,none,nonnumeric}]
    [--noindent]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--sort-column SORT_COLUMN]
    [--sort-ascending | --sort-descending]
    [--tags <tag>[,<tag>,...]]
    [--any-tags <tag>[,<tag>,...]]
    [--not-tags <tag>[,<tag>,...]]
    [--not-any-tags <tag>[,<tag>,...]]
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–quote** \<QUOTE\_MODE>

when to include quotes, defaults to nonnumeri&#x63;**–noindent**

whether to disable indenting the JSO&#x4E;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–sort-column** SORT\_COLUMN

specify the column(s) to sort the data (columns specified first have a priority, non-existing columns are ignored), can be repeate&#x64;**–sort-ascending**

sort the column(s) in ascending orde&#x72;**–sort-descending**

sort the column(s) in descending orde&#x72;**–tags** \<tag>\[,\<tag>,…]

List health monitor which have all given tag(s) (Comma-separated list of tags)**–any-tags** \<tag>\[,\<tag>,…]

List health monitor which have any given tag(s) (Comma-separated list of tags)**–not-tags** \<tag>\[,\<tag>,…]

Exclude health monitor which have all given tag(s) (Comma-separated list of tags)**–not-any-tags** \<tag>\[,\<tag>,…]

Exclude health monitor which have any given tag(s) (Comma-separated list of tags)

This command is provided by the python-octaviaclient plugin.

### loadbalancer healthmonitor set

Update a health monitor

```
openstack loadbalancer healthmonitor set
    [--name <name>]
    [--delay <delay>]
    [--domain-name <domain_name>]
    [--expected-codes <codes>]
    [--http-method {GET,POST,DELETE,PUT,HEAD,OPTIONS,PATCH,CONNECT,TRACE}]
    [--http-version <http_version>]
    [--timeout <timeout>]
    [--max-retries <max_retries>]
    [--max-retries-down <max_retries_down>]
    [--url-path <url_path>]
    [--enable | --disable]
    [--wait]
    [--tag <tag>]
    [--no-tag]
    <health_monitor>
```

**–name** \<name>

Set health monitor name.**–delay** \<delay>

Set the time in seconds, between sending probes to members.**–domain-name** \<domain\_name>

Set the domain name, which be injected into the HTTP Host Header to the backend server for HTTP health check.**–expected-codes** \<codes>

Set the list of HTTP status codes expected in response from the member to declare it healthy.**–http-method** \{GET,POST,DELETE,PUT,HEAD,OPTIONS,PATCH,CONNECT,TRACE}

Set the HTTP method that the health monitor uses for requests.**–http-version** \<http\_version>

Set the HTTP version.**–timeout** \<timeout>

Set the maximum time, in seconds, that a monitor waits to connect before it times out. This value must be less than the delay value.**–max-retries** \<max\_retries>

Set the number of successful checks before changing the operating status of the member to ONLINE.**–max-retries-down** \<max\_retries\_down>

Set the number of allowed check failures before changing the operating status of the member to ERROR.**–url-path** \<url\_path>

Set the HTTP URL path of the request sent by the monitor to test the health of a backend member.**–enable**

Enable health monitor.**–disable**

Disable health monitor.**–wait**

Wait for action to complete.**–tag** \<tag>

Tag to be added to the health monitor (repeat option to set multiple tags)**–no-tag**

Clear tags associated with the health monitor. Specify both –tag and –no-tag to overwrite current tags**health\_monitor**

Health monitor to update (name or ID).

This command is provided by the python-octaviaclient plugin.

### loadbalancer healthmonitor show

Show the details of a single health monitor

```
openstack loadbalancer healthmonitor show
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    <health_monitor>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**health\_monitor**

Name or UUID of the health monitor.

This command is provided by the python-octaviaclient plugin.

### loadbalancer healthmonitor unset

Clear health monitor settings

```
openstack loadbalancer healthmonitor unset
    [--domain-name]
    [--expected-codes]
    [--http-method]
    [--http-version]
    [--max-retries-down]
    [--name]
    [--url-path]
    [--wait]
    [--tag <tag> | --all-tag]
    <health_monitor>
```

**–domain-name**

Clear the health monitor domain name.**–expected-codes**

Reset the health monitor expected codes to the API default.**–http-method**

Reset the health monitor HTTP method to the API default.**–http-version**

Reset the health monitor HTTP version to the API default.**–max-retries-down**

Reset the health monitor max retries down to the API default.**–name**

Clear the health monitor name.**–url-path**

Clear the health monitor URL path.**–wait**

Wait for action to complete.**–tag** \<tag>

Tag to be removed from the health monitor (repeat option to remove multiple tags)**–all-tag**

Clear all tags associated with the health monitor**health\_monitor**

Health monitor to update (name or ID).

This command is provided by the python-octaviaclient plugin.

---

## **l7policy**

### loadbalancer l7policy create

Create a l7policy

```
openstack loadbalancer l7policy create
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--name <name>]
    [--description <description>]
    --action
    {REDIRECT_TO_URL,REDIRECT_TO_POOL,REDIRECT_PREFIX,REJECT}
    [--redirect-pool <pool> | --redirect-url <url> | --redirect-prefix <url>]
    [--redirect-http-code <redirect_http_code>]
    [--position <position>]
    [--enable | --disable]
    [--wait]
    [--tag <tag> | --no-tag]
    <listener>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–name** \<name>

Set the l7policy name.**–description** \<description>

Set l7policy description.**–action** \{REDIRECT\_TO\_URL,REDIRECT\_TO\_POOL,REDIRECT\_PREFIX,REJECT}

Set the action of the policy.**–redirect-pool** \<pool>

Set the pool to redirect requests to (name or ID).**–redirect-url** \<url>

Set the URL to redirect requests to.**–redirect-prefix** \<url>

Set the URL Prefix to redirect requests to.**–redirect-http-code** \<redirect\_http\_code>

Set the HTTP response code for REDIRECT\_URL or REDIRECT\_PREFIX action.**–position** \<position>

Sequence number of this L7 Policy.**–enable**

Enable l7policy (default).**–disable**

Disable l7policy.**–wait**

Wait for action to complete.**–tag** \<tag>

Tag to be added to the l7policy (repeat option to set multiple tags)**–no-tag**

No tags associated with the l7policy**listener**

Listener to add l7policy to (name or ID).

This command is provided by the python-octaviaclient plugin.

### loadbalancer l7policy delete

Delete a l7policy

```
openstack loadbalancer l7policy delete [--wait] <policy>
```

**–wait**

Wait for action to complete.**policy**

l7policy to delete (name or ID).

This command is provided by the python-octaviaclient plugin.

### loadbalancer l7policy list

List l7policies

```
openstack loadbalancer l7policy list
    [-f {csv,json,table,value,yaml}]
    [-c COLUMN]
    [--quote {all,minimal,none,nonnumeric}]
    [--noindent]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--sort-column SORT_COLUMN]
    [--sort-ascending | --sort-descending]
    [--listener LISTENER]
    [--tags <tag>[,<tag>,...]]
    [--any-tags <tag>[,<tag>,...]]
    [--not-tags <tag>[,<tag>,...]]
    [--not-any-tags <tag>[,<tag>,...]]
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–quote** \<QUOTE\_MODE>

when to include quotes, defaults to nonnumeri&#x63;**–noindent**

whether to disable indenting the JSO&#x4E;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–sort-column** SORT\_COLUMN

specify the column(s) to sort the data (columns specified first have a priority, non-existing columns are ignored), can be repeate&#x64;**–sort-ascending**

sort the column(s) in ascending orde&#x72;**–sort-descending**

sort the column(s) in descending orde&#x72;**–listener** \<LISTENER>

List l7policies that applied to the given listener (name or ID).**–tags** \<tag>\[,\<tag>,…]

List l7policy which have all given tag(s) (Comma-separated list of tags)**–any-tags** \<tag>\[,\<tag>,…]

List l7policy which have any given tag(s) (Comma-separated list of tags)**–not-tags** \<tag>\[,\<tag>,…]

Exclude l7policy which have all given tag(s) (Comma-separated list of tags)**–not-any-tags** \<tag>\[,\<tag>,…]

Exclude l7policy which have any given tag(s) (Comma-separated list of tags)

This command is provided by the python-octaviaclient plugin.

### loadbalancer l7policy set

Update a l7policy

```
openstack loadbalancer l7policy set
    [--name <name>]
    [--description <description>]
    [--action {REDIRECT_TO_URL,REDIRECT_TO_POOL,REDIRECT_PREFIX,REJECT}]
    [--redirect-pool <pool> | --redirect-url <url> | --redirect-prefix <url>]
    [--redirect-http-code <redirect_http_code>]
    [--position <position>]
    [--enable | --disable]
    [--wait]
    [--tag <tag>]
    [--no-tag]
    <policy>
```

**–name** \<name>

Set l7policy name.**–description** \<description>

Set l7policy description.**–action** \{REDIRECT\_TO\_URL,REDIRECT\_TO\_POOL,REDIRECT\_PREFIX,REJECT}

Set the action of the policy.**–redirect-pool** \<pool>

Set the pool to redirect requests to (name or ID).**–redirect-url** \<url>

Set the URL to redirect requests to.**–redirect-prefix** \<url>

Set the URL Prefix to redirect requests to.**–redirect-http-code** \<redirect\_http\_code>

Set the HTTP response code for REDIRECT\_URL or REDIRECT\_PREFIX action.**–position** \<position>

Set sequence number of this L7 Policy.**–enable**

Enable l7policy.**–disable**

Disable l7policy.**–wait**

Wait for action to complete.**–tag** \<tag>

Tag to be added to the l7policy (repeat option to set multiple tags)**–no-tag**

Clear tags associated with the l7policy. Specify both –tag and –no-tag to overwrite current tags**policy**

L7policy to update (name or ID).

This command is provided by the python-octaviaclient plugin.

### loadbalancer l7policy show

Show the details of a single l7policy

```
openstack loadbalancer l7policy show
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    <policy>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**policy**

Name or UUID of the l7policy.

This command is provided by the python-octaviaclient plugin.

### loadbalancer l7policy unset

Clear l7policy settings

```
openstack loadbalancer l7policy unset
    [--description]
    [--name]
    [--redirect-http-code]
    [--wait]
    [--tag <tag> | --all-tag]
    <policy>
```

**–description**

Clear the l7policy description.**–name**

Clear the l7policy name.**–redirect-http-code**

Clear the l7policy redirect HTTP code.**–wait**

Wait for action to complete.**–tag** \<tag>

Tag to be removed from the l7policy (repeat option to remove multiple tags)**–all-tag**

Clear all tags associated with the l7policy**policy**

L7policy to update (name or ID).

This command is provided by the python-octaviaclient plugin.

---

## **l7rule**

### loadbalancer l7rule create

Create a l7rule

```
openstack loadbalancer l7rule create
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    --compare-type
    {REGEX,EQUAL_TO,CONTAINS,ENDS_WITH,STARTS_WITH}
    [--invert]
    --value <value>
    [--key <key>]
    --type
    {FILE_TYPE,PATH,COOKIE,HOST_NAME,HEADER,SSL_CONN_HAS_CERT,SSL_VERIFY_RESULT,SSL_DN_FIELD}
    [--enable | --disable]
    [--wait]
    [--tag <tag> | --no-tag]
    <l7policy>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–compare-type** \{REGEX,EQUAL\_TO,CONTAINS,ENDS\_WITH,STARTS\_WITH}

Set the compare type for the l7rule.**–invert**

Invert l7rule.**–value** \<value>

Set the rule value to match on.**–key** \<key>

Set the key for the l7rule’s value to match on.**–type** \{FILE\_TYPE,PATH,COOKIE,HOST\_NAME,HEADER,SSL\_CONN\_HAS\_CERT,SSL\_VERIFY\_RESULT,SSL\_DN\_FIELD}

Set the type for the l7rule.**–enable**

Enable l7rule (default).**–disable**

Disable l7rule.**–wait**

Wait for action to complete.**–tag** \<tag>

Tag to be added to the l7rule (repeat option to set multiple tags)**–no-tag**

No tags associated with the l7rule**l7policy**

l7policy to add l7rule to (name or ID).

This command is provided by the python-octaviaclient plugin.

### loadbalancer l7rule delete

Delete a l7rule

```
openstack loadbalancer l7rule delete [--wait] <l7policy> <rule_id>
```

–wait

Wait for action to complete.

l7policy

l7policy to delete rule from (name or ID).

rule\_id

l7rule to delete.

This command is provided by the python-octaviaclient plugin.loadbalancer l7rule listList l7rules for l7policy

```
openstack loadbalancer l7rule list
    [-f {csv,json,table,value,yaml}]
    [-c COLUMN]
    [--quote {all,minimal,none,nonnumeric}]
    [--noindent]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--sort-column SORT_COLUMN]
    [--sort-ascending | --sort-descending]
    [--tags <tag>[,<tag>,...]]
    [--any-tags <tag>[,<tag>,...]]
    [--not-tags <tag>[,<tag>,...]]
    [--not-any-tags <tag>[,<tag>,...]]
    <l7policy>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–quote** \<QUOTE\_MODE>

when to include quotes, defaults to nonnumeri&#x63;**–noindent**

whether to disable indenting the JSO&#x4E;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–sort-column** SORT\_COLUMN

specify the column(s) to sort the data (columns specified first have a priority, non-existing columns are ignored), can be repeate&#x64;**–sort-ascending**

sort the column(s) in ascending orde&#x72;**–sort-descending**

sort the column(s) in descending orde&#x72;**–tags** \<tag>\[,\<tag>,…]

List l7rule which have all given tag(s) (Comma-separated list of tags)**–any-tags** \<tag>\[,\<tag>,…]

List l7rule which have any given tag(s) (Comma-separated list of tags)**–not-tags** \<tag>\[,\<tag>,…]

Exclude l7rule which have all given tag(s) (Comma-separated list of tags)**–not-any-tags** \<tag>\[,\<tag>,…]

Exclude l7rule which have any given tag(s) (Comma-separated list of tags)**l7policy**

l7policy to list rules for (name or ID).

This command is provided by the python-octaviaclient plugin.

### loadbalancer l7rule set

Update a l7rule

```
openstack loadbalancer l7rule set
    [--compare-type {REGEX,EQUAL_TO,CONTAINS,ENDS_WITH,STARTS_WITH}]
    [--invert]
    [--value <value>]
    [--key <key>]
    [--type {FILE_TYPE,PATH,COOKIE,HOST_NAME,HEADER,SSL_CONN_HAS_CERT,SSL_VERIFY_RESULT,SSL_DN_FIELD}]
    [--enable | --disable]
    [--wait]
    [--tag <tag>]
    [--no-tag]
    <l7policy>
    <l7rule_id>
```

**–compare-type** \{REGEX,EQUAL\_TO,CONTAINS,ENDS\_WITH,STARTS\_WITH}

Set the compare type for the l7rule.**–invert**

Invert l7rule.**–value** \<value>

Set the rule value to match on.**–key** \<key>

Set the key for the l7rule’s value to match on.**–type** \{FILE\_TYPE,PATH,COOKIE,HOST\_NAME,HEADER,SSL\_CONN\_HAS\_CERT,SSL\_VERIFY\_RESULT,SSL\_DN\_FIELD}

Set the type for the l7rule.**–enable**

Enable l7rule.**–disable**

Disable l7rule.**–wait**

Wait for action to complete.**–tag** \<tag>

Tag to be added to the l7rule (repeat option to set multiple tags)**–no-tag**

Clear tags associated with the l7rule. Specify both –tag and –no-tag to overwrite current tags**l7policy**

L7policy to update l7rule on (name or ID).**l7rule\_id**

l7rule to update.

This command is provided by the python-octaviaclient plugin.

### loadbalancer l7rule show

Show the details of a single l7rule

```
openstack loadbalancer l7rule show
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    <l7policy>
    <l7rule_id>
```

-f \<FORMATTER>, –format \<FORMATTER>

the output format, defaults to table

-c COLUMN, –column COLUMN

specify the column(s) to include, can be repeated to show multiple columns

–noindent

whether to disable indenting the JSON

–prefix \<PREFIX>

add a prefix to all variable names

–max-width \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.

–fit-width

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enable

–print-empty

Print empty table if there is no data to show.

l7policy

l7policy to show rule from (name or ID).

l7rule\_id

l7rule to show.

This command is provided by the python-octaviaclient plugin.loadbalancer l7rule unsetClear l7rule settings

```
openstack loadbalancer l7rule unset
    [--invert]
    [--key]
    [--wait]
    [--tag <tag> | --all-tag]
    <l7policy>
    <l7rule_id>
```

**–invert**

Reset the l7rule invert to the API default.**–key**

Clear the l7rule key.**–wait**

Wait for action to complete.**–tag** \<tag>

Tag to be removed from the l7rule (repeat option to remove multiple tags)**–all-tag**

Clear all tags associated with the l7rule**l7policy**

L7policy to update (name or ID).**l7rule\_id**

l7rule to update.

This command is provided by the python-octaviaclient plugin.

---

## **quota**

### loadbalancer quota defaults show

Show quota defaults

```
openstack loadbalancer quota defaults show
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.

This command is provided by the python-octaviaclient plugin.

### loadbalancer quota list

List quotas

```
openstack loadbalancer quota list
    [-f {csv,json,table,value,yaml}]
    [-c COLUMN]
    [--quote {all,minimal,none,nonnumeric}]
    [--noindent]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--sort-column SORT_COLUMN]
    [--sort-ascending | --sort-descending]
    [--project <project-id>]
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–quote** \<QUOTE\_MODE>

when to include quotes, defaults to nonnumeri&#x63;**–noindent**

whether to disable indenting the JSO&#x4E;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–sort-column** SORT\_COLUMN

specify the column(s) to sort the data (columns specified first have a priority, non-existing columns are ignored), can be repeate&#x64;**–sort-ascending**

sort the column(s) in ascending orde&#x72;**–sort-descending**

sort the column(s) in descending orde&#x72;**–project** \<project-id>

Name or UUID of the project.

This command is provided by the python-octaviaclient plugin.

### loadbalancer quota reset

Resets quotas to default quotas

```
openstack loadbalancer quota reset <project>
```

**project**

Project to reset quotas (name or ID).

This command is provided by the python-octaviaclient plugin.

### loadbalancer quota set

Update a quota

```
openstack loadbalancer quota set
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--healthmonitor <health_monitor>]
    [--listener <listener>]
    [--loadbalancer <load_balancer>]
    [--member <member>]
    [--pool <pool>]
    [--l7policy <l7policy>]
    [--l7rule <l7rule>]
    <project>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–healthmonitor** \<health\_monitor>

New value for the health monitor quota. Value -1 means unlimited.**–listener** \<listener>

New value for the listener quota. Value -1 means unlimited.**–loadbalancer** \<load\_balancer>

New value for the load balancer quota limit. Value -1 means unlimited.**–member** \<member>

New value for the member quota limit. Value -1 means unlimited.**–pool** \<pool>

New value for the pool quota limit. Value -1 means unlimited.**–l7policy** \<l7policy>

New value for the l7policy quota limit. Value -1 means unlimited.**–l7rule** \<l7rule>

New value for the l7rule quota limit. Value -1 means unlimited.**project**

Name or UUID of the project.

This command is provided by the python-octaviaclient plugin.

### loadbalancer quota show

Show the quota details for a project

```
openstack loadbalancer quota show
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    <project>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**project**

Name or UUID of the project.

This command is provided by the python-octaviaclient plugin.

### loadbalancer quota unset

Clear quota settings

```
openstack loadbalancer quota unset
    [--loadbalancer]
    [--listener]
    [--pool]
    [--member]
    [--healthmonitor]
    [--l7policy]
    [--l7rule]
    <project>
```

**–loadbalancer**

Reset the load balancer quota to the default.**–listener**

Reset the listener quota to the default.**–pool**

Reset the pool quota to the default.**–member**

Reset the member quota to the default.**–healthmonitor**

Reset the health monitor quota to the default.**–l7policy**

Reset the l7policy quota to the default.**–l7rule**

Reset the l7rule quota to the default.**project**

Name or UUID of the project.

This command is provided by the python-octaviaclient plugin.

---

## **amphora**

### loadbalancer amphora configure

Update the amphora agent configuration

```
openstack loadbalancer amphora configure [--wait] <amphora-id>
```

**–wait**

Wait for action to complete.**amphora-id**

UUID of the amphora to configure.

This command is provided by the python-octaviaclient plugin.

### loadbalancer amphora delete

Delete a amphora

```
openstack loadbalancer amphora delete [--wait] <amphora-id>
```

**–wait**

Wait for action to complete.**amphora-id**

UUID of the amphora to delete.

This command is provided by the python-octaviaclient plugin.

### loadbalancer amphora failover

Force failover an amphora

```
openstack loadbalancer amphora failover [--wait] <amphora-id>
```

**–wait**

Wait for action to complete.**amphora-id**

UUID of the amphora.

This command is provided by the python-octaviaclient plugin.

### loadbalancer amphora list

List amphorae

```
openstack loadbalancer amphora list
    [-f {csv,json,table,value,yaml}]
    [-c COLUMN]
    [--quote {all,minimal,none,nonnumeric}]
    [--noindent]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--sort-column SORT_COLUMN]
    [--sort-ascending | --sort-descending]
    [--loadbalancer <loadbalancer>]
    [--compute-id <compute-id>]
    [--role {BACKUP,MASTER,STANDALONE}]
    [--status {ALLOCATED,BOOTING,DELETED,ERROR,PENDING_CREATE,PENDING_DELETE,READY}]
    [--long]
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–quote** \<QUOTE\_MODE>

when to include quotes, defaults to nonnumeri&#x63;**–noindent**

whether to disable indenting the JSO&#x4E;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–sort-column** SORT\_COLUMN

specify the column(s) to sort the data (columns specified first have a priority, non-existing columns are ignored), can be repeate&#x64;**–sort-ascending**

sort the column(s) in ascending orde&#x72;**–sort-descending**

sort the column(s) in descending orde&#x72;**–loadbalancer** \<loadbalancer>

Filter by load balancer (name or ID).**–compute-id** \<compute-id>

Filter by compute ID.**–role** \{BACKUP,MASTER,STANDALONE}

Filter by role.**–status** \{ALLOCATED,BOOTING,DELETED,ERROR,PENDING\_CREATE,PENDING\_DELETE,READY}, **–provisioning-status** \{ALLOCATED,BOOTING,DELETED,ERROR,PENDING\_CREATE,PENDING\_DELETE,READY}

Filter by amphora provisioning status.**–long**

Show additional fields.

This command is provided by the python-octaviaclient plugin.

### loadbalancer amphora show

Show the details of a single amphora

```
openstack loadbalancer amphora show
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    <amphora-id>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**amphora-id**

UUID of the amphora.

This command is provided by the python-octaviaclient plugin.

### loadbalancer amphora stats show

Shows the current statistics for an amphora.

```
openstack loadbalancer amphora stats show
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--listener <listener>]
    <amphora-id>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–listener** \<listener>

Filter by listener (name or ID).**amphora-id**

UUID of the amphora.

This command is provided by the python-octaviaclient plugin.

---

## **provider**

### loadbalancer provider capability list

List specified provider driver’s capabilities.

```
openstack loadbalancer provider capability list
    [-f {csv,json,table,value,yaml}]
    [-c COLUMN]
    [--quote {all,minimal,none,nonnumeric}]
    [--noindent]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--sort-column SORT_COLUMN]
    [--sort-ascending | --sort-descending]
    [--flavor | --availability-zone]
    <provider_name>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–quote** \<QUOTE\_MODE>

when to include quotes, defaults to nonnumeri&#x63;**–noindent**

whether to disable indenting the JSO&#x4E;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–sort-column** SORT\_COLUMN

specify the column(s) to sort the data (columns specified first have a priority, non-existing columns are ignored), can be repeate&#x64;**–sort-ascending**

sort the column(s) in ascending orde&#x72;**–sort-descending**

sort the column(s) in descending orde&#x72;**–flavor**

Get capabilities for flavor only.**–availability-zone**

Get capabilities for availability zone only.**provider\_name**

Name of the provider driver.

This command is provided by the python-octaviaclient plugin.

### loadbalancer provider list

List all providers

```
openstack loadbalancer provider list
    [-f {csv,json,table,value,yaml}]
    [-c COLUMN]
    [--quote {all,minimal,none,nonnumeric}]
    [--noindent]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--sort-column SORT_COLUMN]
    [--sort-ascending | --sort-descending]
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–quote** \<QUOTE\_MODE>

when to include quotes, defaults to nonnumeri&#x63;**–noindent**

whether to disable indenting the JSO&#x4E;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–sort-column** SORT\_COLUMN

specify the column(s) to sort the data (columns specified first have a priority, non-existing columns are ignored), can be repeate&#x64;**–sort-ascending**

sort the column(s) in ascending orde&#x72;**–sort-descending**

sort the column(s) in descending order

This command is provided by the python-octaviaclient plugin.

---

## **flavor**

### loadbalancer flavor create

Create a octavia flavor

```
openstack loadbalancer flavor create
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    --name <name>
    --flavorprofile <flavor_profile>
    [--description <description>]
    [--enable | --disable]
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–name** \<name>

New flavor name.**–flavorprofile** \<flavor\_profile>

Flavor profile to add the flavor to (name or ID).**–description** \<description>

Set flavor description.**–enable**

Enable flavor.**–disable**

Disable flavor.

This command is provided by the python-octaviaclient plugin.

### loadbalancer flavor delete

Delete a flavor

```
openstack loadbalancer flavor delete <flavor>
```

**flavor**

Flavor to delete (name or ID).

This command is provided by the python-octaviaclient plugin.

### loadbalancer flavor list

List flavor

```
openstack loadbalancer flavor list
    [-f {csv,json,table,value,yaml}]
    [-c COLUMN]
    [--quote {all,minimal,none,nonnumeric}]
    [--noindent]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--sort-column SORT_COLUMN]
    [--sort-ascending | --sort-descending]
    [--name <name>]
    [--flavorprofile <flavor_profile>]
    [--enable | --disable]
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–quote** \<QUOTE\_MODE>

when to include quotes, defaults to nonnumeri&#x63;**–noindent**

whether to disable indenting the JSO&#x4E;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–sort-column** SORT\_COLUMN

specify the column(s) to sort the data (columns specified first have a priority, non-existing columns are ignored), can be repeate&#x64;**–sort-ascending**

sort the column(s) in ascending orde&#x72;**–sort-descending**

sort the column(s) in descending orde&#x72;**–name** \<name>

List flavors according to their name.**–flavorprofile** \<flavor\_profile>

List flavors according to their flavor profile.**–enable**

List enabled flavors.**–disable**

List disabled flavors.

This command is provided by the python-octaviaclient plugin.

### loadbalancer flavor set

Update a flavor

```
openstack loadbalancer flavor set
    [--name <name>]
    [--description <description>]
    [--enable | --disable]
    <flavor>
```

–name \<name>

Set the name of the flavor.

–description \<description>

Set flavor description.

–enable

Enable flavor.

–disable

Disable flavor.

flavor

Name or UUID of the flavor to update.

This command is provided by the python-octaviaclient plugin.loadbalancer flavor showShow the details for a single flavor

```
openstack loadbalancer flavor show
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    <flavor>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**flavor**

Name or UUID of the flavor.

This command is provided by the python-octaviaclient plugin.

### loadbalancer flavor unset

Clear flavor settings

```
openstack loadbalancer flavor unset [--description] <flavor>
```

**–description**

Clear the flavor description.**flavor**

Flavor to update (name or ID).

This command is provided by the python-octaviaclient plugin.

---

## **flavorprofile**

### loadbalancer flavorprofile create

Create a octavia flavor profile

```
openstack loadbalancer flavorprofile create
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    --name <name>
    --provider <provider
    name>
    --flavor-data <flavor_data>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–name** \<name>

New octavia flavor profile name.**–provider** \<provider name>

Provider name for the flavor profile.**–flavor-data** \<flavor\_data>

The JSON string containing the flavor metadata.

This command is provided by the python-octaviaclient plugin.

### loadbalancer flavorprofile delete

Delete a flavor profile

```
openstack loadbalancer flavorprofile delete <flavor_profile>
```

**flavor\_profile**

Flavor profiles to delete (name or ID).

This command is provided by the python-octaviaclient plugin.

### loadbalancer flavorprofile list

List flavor profile

```
openstack loadbalancer flavorprofile list
    [-f {csv,json,table,value,yaml}]
    [-c COLUMN]
    [--quote {all,minimal,none,nonnumeric}]
    [--noindent]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--sort-column SORT_COLUMN]
    [--sort-ascending | --sort-descending]
    [--name <name>]
    [--provider <provider_name>]
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–quote** \<QUOTE\_MODE>

when to include quotes, defaults to nonnumeri&#x63;**–noindent**

whether to disable indenting the JSO&#x4E;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–sort-column** SORT\_COLUMN

specify the column(s) to sort the data (columns specified first have a priority, non-existing columns are ignored), can be repeate&#x64;**–sort-ascending**

sort the column(s) in ascending orde&#x72;**–sort-descending**

sort the column(s) in descending orde&#x72;**–name** \<name>

List flavor profiles by flavor profile name.**–provider** \<provider\_name>

List flavor profiles according to their provider.

This command is provided by the python-octaviaclient plugin.

### loadbalancer flavorprofile set

Update a flavor profile

```
openstack loadbalancer flavorprofile set
    [--name <name>]
    [--provider <provider_name>]
    [--flavor-data <flavor_data>]
    <flavor_profile>
```

**–name** \<name>

Set the name of the flavor profile.**–provider** \<provider\_name>

Set the provider of the flavor profile.**–flavor-data** \<flavor\_data>

Set the flavor data of the flavor profile.**flavor\_profile**

Name or UUID of the flavor profile to update.

This command is provided by the python-octaviaclient plugin.

### loadbalancer flavorprofile show

Show the details for a single flavor profile

```
openstack loadbalancer flavorprofile show
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    <flavor_profile>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**flavor\_profile**

Name or UUID of the flavor profile to show.

This command is provided by the python-octaviaclient plugin.

---

## **availabilityzone**

### loadbalancer availabilityzone create

Create an octavia availability zone

```
openstack loadbalancer availabilityzone create
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    --name <name>
    --availabilityzoneprofile <availabilityzone_profile>
    [--description <description>]
    [--enable | --disable]
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–name** \<name>

New availability zone name.**–availabilityzoneprofile** \<availabilityzone\_profile>

Availability zone profile to add the AZ to (name or ID).**–description** \<description>

Set the availability zone description.**–enable**

Enable the availability zone.**–disable**

Disable the availability zone.

This command is provided by the python-octaviaclient plugin.

### loadbalancer availabilityzone delete

Delete an availability zone

```
openstack loadbalancer availabilityzone delete <availabilityzone>
```

**availabilityzone**

Name of the availability zone to delete.

This command is provided by the python-octaviaclient plugin.

### loadbalancer availabilityzone list

List availability zones

```
openstack loadbalancer availabilityzone list
    [-f {csv,json,table,value,yaml}]
    [-c COLUMN]
    [--quote {all,minimal,none,nonnumeric}]
    [--noindent]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--sort-column SORT_COLUMN]
    [--sort-ascending | --sort-descending]
    [--name <name>]
    [--availabilityzoneprofile <availabilityzone_profile>]
    [--enable | --disable]
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–quote** \<QUOTE\_MODE>

when to include quotes, defaults to nonnumeri&#x63;**–noindent**

whether to disable indenting the JSO&#x4E;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–sort-column** SORT\_COLUMN

specify the column(s) to sort the data (columns specified first have a priority, non-existing columns are ignored), can be repeate&#x64;**–sort-ascending**

sort the column(s) in ascending orde&#x72;**–sort-descending**

sort the column(s) in descending orde&#x72;**–name** \<name>

List availability zones according to their name.**–availabilityzoneprofile** \<availabilityzone\_profile>

List availability zones according to their AZ profile.**–enable**

List enabled availability zones.**–disable**

List disabled availability zones.

This command is provided by the python-octaviaclient plugin.

### loadbalancer availabilityzone set

Update an availability zone

```
openstack loadbalancer availabilityzone set
    [--description <description>]
    [--enable | --disable]
    <availabilityzone>
```

**–description** \<description>

Set the description of the availability zone.**–enable**

Enable the availability zone.**–disable**

Disable the availability zone.**availabilityzone**

Name of the availability zone to update.

This command is provided by the python-octaviaclient plugin.

### loadbalancer availabilityzone show

Show the details for a single availability zone

```
openstack loadbalancer availabilityzone show
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    <availabilityzone>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**availabilityzone**

Name of the availability zone.

This command is provided by the python-octaviaclient plugin.

### loadbalancer availabilityzone unset

Clear availability zone settings

```
openstack loadbalancer availabilityzone unset
    [--description]
    <availabilityzone>
```

**–description**

Clear the availability zone description.**availabilityzone**

Name of the availability zone to update.

This command is provided by the python-octaviaclient plugin.

---

## **availabilityzoneprofile**

### loadbalancer availabilityzoneprofile create

Create an octavia availability zone profile

```
openstack loadbalancer availabilityzoneprofile create
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    --name <name>
    --provider <provider
    name>
    --availability-zone-data <availability_zone_data>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**–name** \<name>

New octavia availability zone profile name.**–provider** \<provider name>

Provider name for the availability zone profile.**–availability-zone-data** \<availability\_zone\_data>

The JSON string containing the availability zone metadata.

This command is provided by the python-octaviaclient plugin.

### loadbalancer availabilityzoneprofile delete

Delete an availability zone profile

```
openstack loadbalancer availabilityzoneprofile delete
    <availabilityzone_profile>
```

**availabilityzone\_profile**

Availability zone profile to delete (name or ID).

This command is provided by the python-octaviaclient plugin.

### loadbalancer availabilityzoneprofile list

List availability zone profiles

```
openstack loadbalancer availabilityzoneprofile list
    [-f {csv,json,table,value,yaml}]
    [-c COLUMN]
    [--quote {all,minimal,none,nonnumeric}]
    [--noindent]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    [--sort-column SORT_COLUMN]
    [--sort-ascending | --sort-descending]
    [--name <name>]
    [--provider <provider_name>]
```

-f \<FORMATTER>, –format \<FORMATTER>

the output format, defaults to table

-c COLUMN, –column COLUMN

specify the column(s) to include, can be repeated to show multiple columns

–quote \<QUOTE\_MODE>

when to include quotes, defaults to nonnumeric

–noindent

whether to disable indenting the JSON

–max-width \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.

–fit-width

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enable

–print-empty

Print empty table if there is no data to show.

–sort-column SORT\_COLUMN

specify the column(s) to sort the data (columns specified first have a priority, non-existing columns are ignored), can be repeated

–sort-ascending

sort the column(s) in ascending order

–sort-descending

sort the column(s) in descending order

–name \<name>

List availability zone profiles by profile name.

–provider \<provider\_name>

List availability zone profiles according to their provider.

This command is provided by the python-octaviaclient plugin.loadbalancer availabilityzoneprofile setUpdate an availability zone profile

```
openstack loadbalancer availabilityzoneprofile set
    [--name <name>]
    [--provider <provider_name>]
    [--availability-zone-data <availability_zone_data>]
    <availabilityzone_profile>
```

**–name** \<name>

Set the name of the availability zone profile.**–provider** \<provider\_name>

Set the provider of the availability zone profile.**–availability-zone-data** \<availability\_zone\_data>

Set the availability zone data of the profile.**availabilityzone\_profile**

Name or UUID of the availability zone profile to update.

This command is provided by the python-octaviaclient plugin.

### loadbalancer availabilityzoneprofile show

Show the details of a single availability zone profile

```
openstack loadbalancer availabilityzoneprofile show
    [-f {json,shell,table,value,yaml}]
    [-c COLUMN]
    [--noindent]
    [--prefix PREFIX]
    [--max-width <integer>]
    [--fit-width]
    [--print-empty]
    <availabilityzone_profile>
```

**-f** \<FORMATTER>, **–format** \<FORMATTER>

the output format, defaults to tabl&#x65;**-c** COLUMN, **–column** COLUMN

specify the column(s) to include, can be repeated to show multiple column&#x73;**–noindent**

whether to disable indenting the JSO&#x4E;**–prefix** \<PREFIX>

add a prefix to all variable name&#x73;**–max-width** \<integer>

Maximum display width, \<1 to disable. You can also use the CLIFF\_MAX\_TERM\_WIDTH environment variable, but the parameter takes precedence.**–fit-width**

Fit the table to the display width. Implied if –max-width greater than 0. Set the environment variable CLIFF\_FIT\_WIDTH=1 to always enabl&#x65;**–print-empty**

Print empty table if there is no data to show.**availabilityzone\_profile**

Name or UUID of the availability zone profile to show.

This command is provided by the python-octaviaclient plugin.
