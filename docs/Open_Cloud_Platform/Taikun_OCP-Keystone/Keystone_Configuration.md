# **Keystone Configuration**

Information and recommendations for general configuration of keystone for keystone administrators. See the main [Configuration](https://docs.openstack.org/keystone/zed/configuration/index.html#keystone-configuration-options) section for complete keystone configuration documentation and sample config files.

---

## **Troubleshoot the Identity service**

To troubleshoot the Identity service, review the logs in the `/var/log/keystone/keystone.log` file.

Use the `/etc/keystone/logging.conf` file to configure the location of log files.

??? Note
	The `insecure_debug` flag is unique to the Identity service. If you enable `insecure_debug`, error messages from the API change to return security-sensitive information. For example, the error message on failed authentication includes information on why your authentication failed.

The logs show the components that have come in to the WSGI request, and ideally show an error that explains why an authorization request failed. If you do not see the request in the logs, run keystone with the `--debug` parameter. Pass the `--debug` parameter before the command parameters.

---

## **Logging**

You configure logging externally to the rest of Identity. The name of the file specifying the logging configuration is set using the `log_config_append` option in the `[DEFAULT]` section of the `/etc/keystone/keystone.conf` file. To route logging through syslog, set `use_syslog=true` in the `[DEFAULT]` section.

A sample logging configuration file is available with the project in `etc/logging.conf.sample`. Like other OpenStack projects, Identity uses the [Python logging module](https://docs.python.org/library/logging.html), which provides extensive configuration options that let you define the output levels and formats.

---

## **Domain-specific configuration**

The Identity service supports domain-specific Identity drivers. The drivers allow a domain to have its own LDAP or SQL back end. By default, domain-specific drivers are disabled.

Domain-specific Identity configuration options can be stored in domain-specific configuration files, or in the Identity SQL database using API REST calls.

!!! Note
	Storing and managing configuration options in an SQL database is experimental in Kilo, and added to the Identity service in the Liberty release.

### Enable drivers for domain-specific configuration files

To enable domain-specific drivers, set these options in the `/etc/keystone/keystone.conf` file:

```
[identity]
domain_specific_drivers_enabled = True
domain_config_dir = /etc/keystone/domains
```

When you enable domain-specific drivers, Identity looks in the `domain_config_dir` directory for configuration files that are named as `keystone.DOMAIN_NAME.conf`. A domain without a domain-specific configuration file uses options in the primary configuration file.

### Enable drivers for storing configuration options in SQL database

To enable domain-specific drivers, set these options in the `/etc/keystone/keystone.conf` file:

```
[identity]
domain_specific_drivers_enabled = True
domain_configurations_from_database = True
```

Any domain-specific configuration options specified through the Identity v3 API will override domain-specific configuration files in the `/etc/keystone/domains` directory.

Unlike the file-based method of specifying domain-specific configurations, options specified via the Identity API will become active without needing to restart the keystone server. For performance reasons, the current state of configuration options for a domain are cached in the keystone server, and in multi-process and multi-threaded keystone configurations, the new configuration options may not become active until the cache has timed out. The cache settings for domain config options can be adjusted in the general keystone configuration file (option `cache_time` in the `domain_config` group).

??? Note
	It is important to notice that when using either of these methods of specifying domain-specific configuration options, the main keystone configuration file is still maintained. Only those options that relate to the Identity driver for users and groups (i.e. specifying whether the driver for this domain is SQL or LDAP, and, if LDAP, the options that define that connection) are supported in a domain-specific manner. Further, when using the configuration options via the Identity API, the driver option must be set to an LDAP driver (attempting to set it to an SQL driver will generate an error when it is subsequently used).

For existing installations that already use file-based domain-specific configurations who wish to migrate to the SQL-based approach, the `keystone-manage` command can be used to upload all configuration files to the SQL database:

```
$ keystone-manage domain_config_upload --all
```

Once uploaded, these domain-configuration options will be visible via the Identity API as well as applied to the domain-specific drivers. It is also possible to upload individual domain-specific configuration files by specifying the domain name:

```
$ keystone-manage domain_config_upload --domain-name DOMAINA
```

??? Note
	It is important to notice that by enabling either of the domain-specific configuration methods, the operations of listing all users and listing all groups are not supported, those calls will need either a domain filter to be specified or usage of a domain scoped token.

	Keystone does not support moving the contents of a domain (i.e. “its” users and groups) from one backend to another, nor group membership across backend boundaries.

	When using the file-based domain-specific configuration method, to delete a domain that uses a domain specific backend, it’s necessary to first disable it, remove its specific configuration file (i.e. its corresponding keystone.\<domain\_name>.conf) and then restart the Identity server. When managing configuration options via the Identity API, the domain can simply be disabled and deleted via the Identity API; since any domain-specific configuration options will automatically be removed.

	Although keystone supports multiple LDAP backends via the above domain-specific configuration methods, it currently only supports one SQL backend. This could be either the default driver or a single domain-specific backend, perhaps for storing service users in a predominantly LDAP installation.

	Keystone has deprecated the `keystone-manage domain_config_upload` option. The keystone team recommends setting domain config options via the API instead.

Due to the need for user and group IDs to be unique across an OpenStack installation and for keystone to be able to deduce which domain and backend to use from just a user or group ID, it dynamically builds a persistent identity mapping table from a public ID to the actual domain, local ID (within that backend) and entity type. The public ID is automatically generated by keystone when it first encounters the entity. If the local ID of the entity is from a backend that does not guarantee to generate UUIDs, a hash algorithm will generate a public ID for that entity, which is what will be exposed by keystone.

The use of a hash will ensure that if the public ID needs to be regenerated then the same public ID will be created. This is useful if you are running multiple keystones and want to ensure the same ID would be generated whichever server you hit.

!!! Note
	In case of the LDAP backend, the names of users and groups are not hashed. As a result, these are length limited to 255 characters. Longer names will result in an error.

While keystone will dynamically maintain the identity mapping, including removing entries when entities are deleted via the keystone, for those entities in backends that are managed outside of keystone (e.g. a read-only LDAP), keystone will not know if entities have been deleted and hence will continue to carry stale identity mappings in its table. While benign, keystone provides an ability for operators to purge the mapping table of such stale entries using the keystone-manage command, for example:

```
$ keystone-manage mapping_purge --domain-name DOMAINA --local-id abc@de.com
```

A typical usage would be for an operator to obtain a list of those entries in an external backend that had been deleted out-of-band to keystone, and then call keystone-manage to purge those entries by specifying the domain and local-id. The type of the entity (i.e. user or group) may also be specified if this is needed to uniquely identify the mapping.

Since public IDs can be regenerated **with the correct generator implementation**, if the details of those entries that have been deleted are not available, then it is safe to simply bulk purge identity mappings periodically, for example:

```
$ keystone-manage mapping_purge --domain-name DOMAINA
```

will purge all the mappings for DOMAINA. The entire mapping table can be purged with the following command:

```
$ keystone-manage mapping_purge --all
```

Generating public IDs in the first run may take a while, and most probably first API requests to fetch user list will fail by timeout. To prevent this, `mapping_populate` command should be executed. It should be executed right after LDAP has been configured or after `mapping_purge`.

```
$ keystone-manage mapping_populate --domain DOMAINA
```

### Public ID Generators

Keystone supports a customizable public ID generator and it is specified in the `[identity_mapping]` section of the configuration file. Keystone provides a sha256 generator as default, which produces regenerable public IDs. The generator algorithm for public IDs is a balance between key size (i.e. the length of the public ID), the probability of collision and, in some circumstances, the security of the public ID. The maximum length of public ID supported by keystone is 64 characters, and the default generator (sha256) uses this full capability. Since the public ID is what is exposed externally by keystone and potentially stored in external systems, some installations may wish to make use of other generator algorithms that have a different trade-off of attributes. A different generator can be installed by configuring the following property:

* `generator` – identity mapping generator. Defaults to `sha256` (implemented by [`keystone.identity.id_generators.sha256.Generator`](https://docs.openstack.org/keystone/zed/api/keystone.identity.id_generators.sha256.html#keystone.identity.id_generators.sha256.Generator))

!!! Warning
	Changing the generator may cause all existing public IDs to be become invalid, so typically the generator selection should be considered immutable for a given installation.

### Migrate domain-specific configuration files to the SQL database

You can use the `keystone-manage` command to migrate configuration options in domain-specific configuration files to the SQL database:

```
# keystone-manage domain_config_upload --all
```

To upload options from a specific domain-configuration file, specify the domain name:

```
# keystone-manage domain_config_upload --domain-name DOMAIN_NAME
```

---

## **Integrate Identity with LDAP**

The OpenStack Identity service supports integration with existing LDAP directories for authentication and authorization services. LDAP back ends require initialization before configuring the OpenStack Identity service to work with it. For more information, see [Setting up LDAP for use with Keystone](https://wiki.openstack.org/wiki/OpenLDAP).

When the OpenStack Identity service is configured to use LDAP back ends, you can split authentication (using the *identity* feature) and authorization (using the *assignment* feature). OpenStack Identity only supports read-only LDAP integration.

The *identity* feature enables administrators to manage users and groups by each domain or the OpenStack Identity service entirely.

The *assignment* feature enables administrators to manage project role authorization using the OpenStack Identity service SQL database, while providing user authentication through the LDAP directory.

??? Note
	It is possible to isolate identity related information to LDAP in a deployment and keep resource information in a separate datastore. It is not possible to do the opposite, where resource information is stored in LDAP and identity information is stored in SQL. If the resource or assignment back ends are integrated with LDAP, the identity back end must also be integrated with LDAP.

Identity LDAP server set up

??? Important
	If you are using SELinux (enabled by default on RHEL derivatives), then in order for the OpenStack Identity service to access LDAP servers, you must enable the `authlogin_nsswitch_use_ldap` boolean value for SELinux on the server running the OpenStack Identity service. To enable and make the option persistent across reboots, set the following boolean value as the root user:

```
# setsebool -P authlogin_nsswitch_use_ldap on
```

The Identity configuration is split into two separate back ends; identity (back end for users and groups), and assignments (back end for domains, projects, roles, role assignments). To configure Identity, set options in the `/etc/keystone/keystone.conf` file. See [Integrate Identity back end with LDAP](https://docs.openstack.org/keystone/zed/admin/configuration.html#integrate-identity-back-end-with-ldap) for Identity back end configuration examples. Modify these examples as needed.

**To define the destination LDAP server**

Define the destination LDAP server in the `/etc/keystone/keystone.conf` file:

```
[ldap]
url = ldap://localhost
user = dc=Manager,dc=example,dc=org
password = samplepassword
suffix = dc=example,dc=org
```

Although it’s not recommended (see note below), multiple LDAP servers can be supplied to `url` to provide high-availability support for a single LDAP backend. By default, these will be tried in order of apperance, but an additional option, `randomize_urls` can be set to true, to randomize the list in each process (when it starts). To specify multiple LDAP servers, simply change the `url` option in the `[ldap]` section to be a list, separated by commas:

```
url = "ldap://localhost,ldap://backup.localhost"
randomize_urls = true
```

??? Note
	Failover mechanisms in the LDAP backend can cause delays when switching over to the next working LDAP server. Randomizing the order in which the servers are tried only makes the failure behavior not dependent on which of the ordered servers fail. Individual processes can still be delayed or time out, so this doesn’t fix the issue at hand, but only makes the failure mode more gradual. This behavior cannot be easily fixed inside the service, because keystone would have to monitor the status of each LDAP server, which is in fact a task for a load balancer. Because of this, it is recommended to use a load balancer in front of the LDAP servers, which can monitor the state of the cluster and instantly redirect connections to the working LDAP server.

**Additional LDAP integration settings**

Set these options in the `/etc/keystone/keystone.conf` file for a single LDAP server, or `/etc/keystone/domains/keystone.DOMAIN_NAME.conf` files for multiple back ends. Example configurations appear below each setting summary:

**Query option**

Use `query_scope` to control the scope level of data presented (search only the first level or search an entire sub-tree) through LDAP.Use `page_size` to control the maximum results per page. A value of zero disables paging.Use `alias_dereferencing` to control the LDAP dereferencing option for queries.

```
[ldap]
query_scope = sub
page_size = 0
alias_dereferencing = default
chase_referrals =
```

**Debug**

Use `debug_level` to set the LDAP debugging level for LDAP calls. A value of zero means that debugging is not enabled.

```
[ldap]
debug_level = 4095
```

This setting sets `OPT_DEBUG_LEVEL` in the underlying python library. This field is a bit mask (integer), and the possible flags are documented in the OpenLDAP manpages. Commonly used values include 255 and 4095, with 4095 being more verbose and 0 being disabled. We recommend consulting the documentation for your LDAP back end when using this option.

??? Warning
	Enabling `debug_level` will negatively impact performance.

**Connection pooling**

Various LDAP back ends use a common LDAP module to interact with LDAP data. By default, a new connection is established for each LDAP operation. This is expensive when TLS support is enabled, which is a likely configuration in an enterprise setup. Reusing connections from a connection pool drastically reduces overhead of initiating a new connection for every LDAP operation.

Use `use_pool` to enable LDAP connection pooling. Configure the connection pool size, maximum retry, reconnect trials, timeout (-1 indicates indefinite wait) and lifetime in seconds.

```
[ldap]
use_pool = true
pool_size = 10
pool_retry_max = 3
pool_retry_delay = 0.1
pool_connection_timeout = -1
pool_connection_lifetime = 600
```

**Connection pooling for end user authentication**

LDAP user authentication is performed via an LDAP bind operation. In large deployments, user authentication can use up all available connections in a connection pool. OpenStack Identity provides a separate connection pool specifically for user authentication.

Use `use_auth_pool` to enable LDAP connection pooling for end user authentication. Configure the connection pool size and lifetime in seconds. Both `use_pool` and `use_auth_pool` must be enabled to pool connections for user authentication.

```
[ldap]
use_auth_pool = false
auth_pool_size = 100
auth_pool_connection_lifetime = 60
```

When you have finished the configuration, restart the OpenStack Identity service.

!!! Warning
	During the service restart, authentication and authorization are unavailable.

**To integrate one Identity back end with LDAP**

1. Enable the LDAP Identity driver in the `/etc/keystone/keystone.conf` file. This allows LDAP as an identity back end:

```
[identity]
#driver = sql
driver = ldap
```

Create the organizational units (OU) in the LDAP directory, and define the corresponding location in the `/etc/keystone/keystone.conf` file:

```
[ldap]
user_tree_dn = ou=Users,dc=example,dc=org
user_objectclass = inetOrgPerson

group_tree_dn = ou=Groups,dc=example,dc=org
group_objectclass = groupOfNames
```

!!! Note
	These schema attributes are extensible for compatibility with various schemas. For example, this entry maps to the person attribute in Active Directory:

```
user_objectclass = person
```

Restart the OpenStack Identity service.

!!! Warning
	During service restart, authentication and authorization are unavailable.

**To integrate multiple Identity back ends with LDAP**

1\. Set the following options in the `/etc/keystone/keystone.conf` file:

a. Enable the LDAP driver:

```
[identity]
#driver = sql
driver = ldap
```

b. Enable domain-specific drivers:

```
[identity]
domain_specific_drivers_enabled = True
domain_config_dir = /etc/keystone/domains
```

2\. Restart the OpenStack Identity service.

!!! Warning
	During service restart, authentication and authorization are unavailable.

3\. List the domains using the dashboard, or the OpenStackClient CLI. Refer to the [Command List](https://docs.openstack.org/python-openstackclient/latest/cli/command-list.html) for a list of OpenStackClient commands.

4\. Create domains using OpenStack dashboard, or the OpenStackClient CLI.

5\. For each domain, create a domain-specific configuration file in the `/etc/keystone/domains` directory. Use the file naming convention `keystone.DOMAIN_NAME.conf`, where DOMAIN\_NAME is the domain name assigned in the previous step

!!! Note
	The options set in the `/etc/keystone/domains/keystone.DOMAIN_NAME.conf` file will override options in the `/etc/keystone/keystone.conf` file.

6\. Define the destination LDAP server in the `/etc/keystone/domains/keystone.DOMAIN_NAME.conf` file. For example:

```
[ldap]
url = ldap://localhost
user = dc=Manager,dc=example,dc=org
password = samplepassword
suffix = dc=example,dc=org
```

7\. Create the organizational units (OU) in the LDAP directories, and define their corresponding locations in the `/etc/keystone/domains/keystone.DOMAIN_NAME.conf` file. For example:

```
[ldap]
user_tree_dn = ou=Users,dc=example,dc=org
user_objectclass = inetOrgPerson

group_tree_dn = ou=Groups,dc=example,dc=org
group_objectclass = groupOfNames
```

!!! Note
	These schema attributes are extensible for compatibility with various schemas. For example, this entry maps to the person attribute in Active Directory:

```
user_objectclass = person
```

8\. Restart the OpenStack Identity service.

!!! Warning
	During service restart, authentication and authorization are unavailable.

**Additional LDAP integration settings**

Set these options in the `/etc/keystone/keystone.conf` file for a single LDAP server, or `/etc/keystone/domains/keystone.DOMAIN_NAME.conf` files for multiple back ends. Example configurations appear below each setting summary:Filters

Use filters to control the scope of data presented through LDAP.

```
[ldap]
user_filter = (memberof=cn=openstack-users,ou=workgroups,dc=example,dc=org)
group_filter =
```

Identity attribute mapping

Mask account status values (include any additional attribute mappings) for compatibility with various directory services. Superfluous accounts are filtered with `user_filter`.

Setting attribute ignore to list of attributes stripped off on update.

For example, you can mask Active Directory account status attributes in the `/etc/keystone/keystone.conf` file:

```
[ldap]
user_id_attribute      = cn
user_name_attribute    = sn
user_mail_attribute    = mail
user_pass_attribute    = userPassword
user_enabled_attribute = userAccountControl
user_enabled_mask      = 2
user_enabled_invert    = false
user_enabled_default   = 512
user_default_project_id_attribute =
user_additional_attribute_mapping =

group_id_attribute     = cn
group_name_attribute   = ou
group_member_attribute = member
group_desc_attribute   = description
group_additional_attribute_mapping =
```

It is possible to model more complex LDAP schemas. For example, in the user object, the objectClass posixAccount from [RFC2307](https://tools.ietf.org/html/rfc2307) is very common. If this is the underlying objectClass, then the `uid` field should probably be `uidNumber` and the `username` field should be either `uid` or `cn`. The following illustrates the configuration:

```
[ldap]
user_id_attribute = uidNumber
user_name_attribute = cn
```

Enabled emulation

OpenStack Identity supports emulation for integrating with LDAP servers that do not provide an `enabled` attribute for users. This allows OpenStack Identity to advertise `enabled` attributes when the user entity in LDAP does not. The `user_enabled_emulation` option must be enabled and the `user_enabled_emulation_dn` option must be a valid LDAP group. Users in the group specified by `user_enabled_emulation_dn` will be marked as `enabled`. For example, the following will mark any user who is a member of the `enabled_users` group as enabled:

```
[ldap]
user_enabled_emulation = True
user_enabled_emulation_dn = cn=enabled_users,cn=groups,dc=openstack,dc=org
```

If the directory server has an enabled attribute, but it is not a boolean type, a mask can be used to convert it. This is useful when the enabled attribute is an integer value. The following configuration highlights the usage:

```
[ldap]
user_enabled_attribute = userAccountControl
user_enabled_mask = 2
user_enabled_default = 512
```

In this case, the attribute is an integer and the enabled attribute is listed in bit 1. If the mask configured `user_enabled_mask` is different from 0, it retrieves the attribute from `user_enabled_attribute` and performs an add operation with the `user_enabled_mask`. If the sum of the operation matches the mask, then the account is disabled.

The value of `user_enabled_attribute` is also saved before applying the add operation in `enabled_nomask`. This is done in case the user needs to be enabled or disabled. Lastly, setting `user_enabled_default` is needed in order to create a default value on the integer attribute (512 = NORMAL ACCOUNT in Active Directory).

When you have finished configuration, restart the OpenStack Identity service.

!!! Warning
	During service restart, authentication and authorization are unavailable.

### Secure the OpenStack Identity service connection to an LDAP back end

We recommend securing all connections between OpenStack Identity and LDAP. The Identity service supports the use of TLS to encrypt LDAP traffic. Before configuring this, you must first verify where your certificate authority file is located. For more information, see the [OpenStack Security Guide SSL introduction](https://docs.openstack.org/security-guide/secure-communication/introduction-to-ssl-and-tls.html).

Once you verify the location of your certificate authority file:

**To configure TLS encryption on LDAP traffic**

1. Open the `/etc/keystone/keystone.conf` configuration file.

2. Find the `[ldap]` section.

3. In the `[ldap]` section, set the `use_tls` configuration key to `True`. Doing so will enable TLS.

4. Configure the Identity service to use your certificate authorities file. To do so, set the `tls_cacertfile` configuration key in the `ldap` section to the certificate authorities file’s path.

!!! Note
	You can also set the `tls_cacertdir` (also in the `ldap` section) to the directory where all certificate authorities files are kept. If both `tls_cacertfile` and `tls_cacertdir` are set, then the latter will be ignored.

5\. Specify what client certificate checks to perform on incoming TLS sessions from the LDAP server. To do so, set the `tls_req_cert` configuration key in the `[ldap]` section to `demand`, `allow`, or `never`:

* `demand` – The LDAP server always receives certificate requests. The session terminates if no certificate is provided, or if the certificate provided cannot be verified against the existing certificate authorities file.

* `allow` – The LDAP server always receives certificate requests. The session will proceed as normal even if a certificate is not provided. If a certificate is provided but it cannot be verified against the existing certificate authorities file, the certificate will be ignored and the session will proceed as normal.

* `never` – A certificate will never be requested.

When you have finished configuration, restart the OpenStack Identity service

!!! Note
	If you are unable to connect to LDAP via OpenStack Identity, or observe a *SERVER DOWN* error, set the `TLS_CACERT` in `/etc/ldap/ldap.conf` to the same value specified in the `[ldap] tls_certificate` section of `keystone.conf`.

On distributions that include openstack-config, you can configure TLS encryption on LDAP traffic by running the following commands instead.

```
# openstack-config --set /etc/keystone/keystone.conf \
  ldap use_tls True
# openstack-config --set /etc/keystone/keystone.conf \
  ldap tls_cacertfile ``CA_FILE``
# openstack-config --set /etc/keystone/keystone.conf \
  ldap tls_req_cert ``CERT_BEHAVIOR``
```

Where:

* `CA_FILE` is the absolute path to the certificate authorities file that should be used to encrypt LDAP traffic.

* `CERT_BEHAVIOR` specifies what client certificate checks to perform on an incoming TLS session from the LDAP server (`demand`, `allow`, or `never`).

---

## **Caching layer**

OpenStack Identity supports a caching layer that is above the configurable subsystems (for example, token). This gives you the flexibility to setup caching for all or some subsystems. OpenStack Identity uses the [oslo.cache](https://docs.openstack.org/oslo.cache/latest/) library which allows flexible cache back ends. The majority of the caching configuration options are set in the `[cache]` section of the `/etc/keystone/keystone.conf` file. The `enabled` option of the `[cache]` section must be set to `True` in order for any subsystem to cache responses. Each section that has the capability to be cached will have a `caching` boolean value that toggles caching behavior of that particular subsystem.

So to enable only the token back end caching, set the values as follows:

```
[cache]
enabled=true

[catalog]
caching=false

[domain_config]
caching=false

[federation]
caching=false

[resource]
caching=false

[revoke]
caching=false

[role]
caching=false

[token]
caching=true
```

!!! Note
	Each subsystem is configured to cache by default. However, the global toggle for caching defaults to `False`. A subsystem is only able to cache responses if the global toggle is enabled.

Current functional back ends are:`dogpile.cache.null`

A “null” backend that effectively disables all cache operations.(Default)`dogpile.cache.memcached`

Memcached back end using the standard `python-memcached` library.`dogpile.cache.pylibmc`

Memcached back end using the `pylibmc` library.`dogpile.cache.bmemcached`

Memcached using the `python-binary-memcached` library.`dogpile.cache.redis`

Redis back end.`dogpile.cache.dbm`

Local DBM file back end.`dogpile.cache.memory`

In-memory cache, not suitable for use outside of testing as it does not cleanup its internal cache on cache expiration and does not share cache between processes. This means that caching and cache invalidation will not be consistent or reliable.`dogpile.cache.memory_pickle`

In-memory cache, but serializes objects with pickle lib. It’s not suitable for use outside of testing. The reason is the same with `dogpile.cache.memoryoslo_cache.mongo`

MongoDB as caching back end.`oslo_cache.memcache_pool`

Memcached backend that does connection pooling.`oslo_cache.etcd3gw`

Uses etcd 3.x for storage.`oslo_cache.dict`

A DictCacheBackend based on dictionary, not suitable for use outside of testing as it does not share cache between processes.This means that caching and cache invalidation will not be consistent or reliable.

### Caching for tokens and tokens validation

The token subsystem is OpenStack Identity’s most heavily used API. As a result, all types of tokens benefit from caching, including Fernet tokens. Although Fernet tokens do not need to be persisted, they should still be cached for optimal token validation performance.

The token system has a separate `cache_time` configuration option, that can be set to a value above or below the global `expiration_time` default, allowing for different caching behavior from the other systems in OpenStack Identity. This option is set in the `[token]` section of the configuration file.

The token revocation list cache time is handled by the configuration option `revocation_cache_time` in the `[token]` section. The revocation list is refreshed whenever a token is revoked. It typically sees significantly more requests than specific token retrievals or token validation calls.

Here is a list of actions that are affected by the cached time:

* getting a new token

* revoking tokens

* validating tokens

* checking v3 tokens

The delete token API calls invalidate the cache for the tokens being acted upon, as well as invalidating the cache for the revoked token list and the validate/check token calls.

Token caching is configurable independently of the `revocation_list` caching. Lifted expiration checks from the token drivers to the token manager. This ensures that cached tokens will still raise a `TokenNotFound` flag when expired.

For cache consistency, all token IDs are transformed into the short token hash at the provider and token driver level. Some methods have access to the full ID (PKI Tokens), and some methods do not. Cache invalidation is inconsistent without token ID normalization.

### Caching for non-token resources

Various other keystone components have a separate `cache_time` configuration option, that can be set to a value above or below the global `expiration_time` default, allowing for different caching behavior from the other systems in Identity service. This option can be set in various sections (for example, `[role]` and `[resource]`) of the configuration file. The create, update, and delete actions for domains, projects and roles will perform proper invalidations of the cached methods listed above.

For more information about the different back ends (and configuration options), see:

* [dogpile.cache.memory](https://dogpilecache.sqlalchemy.org/en/latest/api.html#memory-backends)

* [dogpile.cache.memcached](https://dogpilecache.sqlalchemy.org/en/latest/api.html#memcached-backends)

!!! Note
	The memory back end is not suitable for use in a production environment.

* [dogpile.cache.redis](https://dogpilecache.sqlalchemy.org/en/latest/api.html#redis-backends)

* [dogpile.cache.dbm](https://dogpilecache.sqlalchemy.org/en/latest/api.html#file-backends)

### Cache invalidation

A common concern with caching is relaying inaccurate information after updating or deleting a resource. Most subsystems within OpenStack Identity invalidate specific cache entries once they have changed. In cases where a specific cache entry cannot be invalidated from the cache, the cache region will be invalidated instead. This invalidates all entries within the cache to prevent returning stale or misleading data. A subsequent request for the resource will be fully processed and cached.

??? Warning
	Be aware that if a read-only back end is in use for a particular subsystem, the cache will not immediately reflect changes performed through the back end. Any given change may take up to the `cache_time` (if set in the subsystem section of the configuration) or the global `expiration_time` (set in the `[cache]` section of the configuration) before it is reflected. If this type of delay is an issue, we recommend disabling caching for that particular subsystem.

### Configure the Memcached back end example

The following example shows how to configure the memcached back end:

```
[cache]

enabled = true
backend = dogpile.cache.memcached
backend_argument = url:127.0.0.1:11211
```

You need to specify the URL to reach the `memcached` instance with the `backend_argument` parameter.

### Verbose cache logging

We do not recommend using verbose cache logging by default in production systems since it’s extremely noisy. However, you may need to debug cache issues. One way to see how keystone is interacting with a cache backend is to enhance logging. The following configuration will aggregate oslo and dogpile logs into keystone’s log file with increased verbosity:

```
[DEFAULT]
default_log_levels = oslo.cache=DEBUG,dogpile.core.dogpile=DEBUG

[cache]
debug_cache_backend = True
```

These logs will include cache hits and misses, making it easier to diagnose cache configuration and connectivity issues.

---

## **Security compliance and PCI-DSS**

As of the Newton release, the Identity service contains additional security compliance features, specifically to satisfy Payment Card Industry – Data Security Standard (PCI-DSS) v3.1 requirements. See [Security Hardening PCI-DSS](https://specs.openstack.org/openstack/keystone-specs/specs/keystone/newton/pci-dss.html) for more information on PCI-DSS.

Security compliance features are disabled by default and most of the features only apply to the SQL backend for the identity driver. Other identity backends, such as LDAP, should implement their own security controls.

Enable these features by changing the configuration settings under the `[security_compliance]` section in `keystone.conf`.

### Setting an account lockout threshold

The account lockout feature limits the number of incorrect password attempts. If a user fails to authenticate after the maximum number of attempts, the service disables the user. Users can be re-enabled by explicitly setting the enable user attribute with the update user [v3](https://docs.openstack.org/api-ref/identity/v3/index.html#update-user) API call.

You set the maximum number of failed authentication attempts by setting the `lockout_failure_attempts`:

```
[security_compliance]
lockout_failure_attempts = 6
```

You set the number of minutes a user would be locked out by setting the `lockout_duration` in seconds:

```
[security_compliance]
lockout_duration = 1800
```

If you do not set the `lockout_duration`, users will be locked out indefinitely until the user is explicitly enabled via the API.

You can ensure specific users are never locked out. This can be useful for service accounts or administrative users. You can do this by setting the user option for [ignore\_lockout\_failure\_attempts](https://docs.openstack.org/keystone/zed/admin/resource-options.html#ignore-lockout-failure-attempts).

### Disabling inactive users

PCI-DSS 8.1.4 requires that inactive user accounts be removed or disabled within 90 days. You can achieve this by setting the `disable_user_account_days_inactive`:

```
[security_compliance]
disable_user_account_days_inactive = 90
```

This above example means that users that have not authenticated (inactive) for the past 90 days are automatically disabled. Users can be re-enabled by explicitly setting the enable user attribute via the API.

### Force users to change password upon first use

PCI-DSS 8.2.6 requires users to change their password for first time use and upon an administrative password reset. Within the identity [user API](https://docs.openstack.org/api-ref/identity/v3/index.html#users), create user and update user are considered administrative password changes. Whereas, change password for user is a self-service password change. Once this feature is enabled, new users, and users that have had their password reset, will be required to change their password upon next authentication (first use), before being able to access any services.

Prior to enabling this feature, you may want to exempt some users that you do not wish to be required to change their password. You can mark a user as exempt by setting the user options attribute [ignore\_change\_password\_upon\_first\_use](https://docs.openstack.org/keystone/zed/admin/resource-options.html#ignore-change-password-upon-first-use).

!!! Warning
	Failure to mark service users as exempt from this requirement will result in your service account passwords becoming expired after being reset.

When ready, you can configure it so that users are forced to change their password upon first use by setting `change_password_upon_first_use`:

```
[security_compliance]
change_password_upon_first_use = True
```

### Configuring password expiration

Passwords can be configured to expire within a certain number of days by setting the `password_expires_days`:

```
[security_compliance]
password_expires_days = 90
```

Once set, any new password changes have an expiration date based on the date/time of the password change plus the number of days defined here. Existing passwords will not be impacted. If you want existing passwords to have an expiration date, you would need to run a SQL script against the password table in the database to update the expires\_at column.

If there exists a user whose password you do not want to expire, keystone supports setting that via the user option [ignore\_password\_expiry](https://docs.openstack.org/keystone/zed/admin/resource-options.html#ignore-password-expiry).

### Configuring password strength requirements

You can set password strength requirements, such as requiring numbers in passwords or setting a minimum password length, by adding a regular expression to the `password_regex` setting:

```
[security_compliance]
password_regex = ^(?=.*\d)(?=.*[a-zA-Z]).{7,}$
```

The above example is a regular expression that requires a password to have:

* One (1) letter

* One (1) digit

* Minimum length of seven (7) characters

If you do set the `password_regex`, you should provide text that describes your password strength requirements. You can do this by setting the `password_regex_description`:

```
[security_compliance]`
password_regex_description = Passwords must contain at least 1 letter, 1
                             digit, and be a minimum length of 7
                             characters.
```

It is imperative that the `password_regex_description` matches the actual regex. If the `password_regex` and the `password_regex_description` do not match, it will cause user experience to suffer since this description will be returned to users to explain why their requested password was insufficient.

??? Note
	You must ensure the `password_regex_description` accurately and completely describes the `password_regex`. If the two options are out of sync, the help text could inaccurately describe the password requirements being applied to the password. This would lead to a poor user experience.

### Requiring a unique password history

The password history requirements controls the number of passwords for a user that must be unique before an old password can be reused. You can enforce this by setting the `unique_last_password_count`:

```
[security_compliance]
unique_last_password_count= 5
```

The above example does not allow a user to create a new password that is the same as any of their last four previous passwords.

Similarly, you can set the number of days that a password must be used before the user can change it by setting the `minimum_password_age`:

```
[security_compliance]
minimum_password_age = 1
```

In the above example, once a user changes their password, they would not be able to change it again for one day. This prevents users from changing their passwords immediately in order to wipe out their password history and reuse an old password.

??? Note
	When you set `password_expires_days`, the value for the `minimum_password_age` should be less than the `password_expires_days`. Otherwise, users would not be able to change their passwords before they expire.

#### Prevent Self-Service Password Changes

If there exists a user who should not be able to change her own password via the keystone password change API, keystone supports setting that via the user option [lock\_password](https://docs.openstack.org/keystone/zed/admin/resource-options.html#lock-password).

This is typically used in the case where passwords are managed externally to keystone.

---

## **Performance and scaling**

Before you begin tuning Keystone for performance and scalability, you should first know that Keystone is just a two tier horizontally-scalable web application, and the most effective methods for scaling it are going to be the same as for any other similarly designed web application: give it more processes, more memory, scale horizontally, and load balance the result.

With that said, there are many opportunities for tuning the performance of Keystone, many of which are actually trade-offs between performance and security that you need to judge for yourself, and tune accordingly.

### Keystone configuration options that affect performance

These are all of the options in `keystone.conf` that have a direct impact on performance. See the help descriptions for these options for more specific details on how and why you might want to tune these options for yourself.

* `[DEFAULT] max_project_tree_depth`: Reduce this number to increase performance, increase this number to cater to more complicated hierarchical multitenancy use cases.

* `[DEFAULT] max_password_length`: Reduce this number to increase performance, increase this number to allow for more secure passwords.

* `[cache] enable`: Enable this option to increase performance, but you also need to configure other options in the `[cache]` section to actually utilize caching.

* `[token] provider`: All supported token providers have been primarily driven by performance considerations. UUID and Fernet both require online validation (cacheable HTTP calls back to keystone to validate tokens). Fernet has the highest scalability characteristics overall, but requires more work to validate, and therefore enabling caching (`[cache] enable`) is absolutely critical.

* `[fernet] max_active_keys`: If you’re using Fernet tokens, decrease this option to improve performance, increase this option to support more advanced key rotation strategies.

### Keystonemiddleware configuration options that affect performance

This configuration actually lives in the Paste pipelines of services consuming token validation from keystone (i.e.: nova, cinder, swift, etc.).

* `cache`: When keystone’s auth\_token middleware is deployed with a swift cache, use this option to have auth\_token middleware share a caching backend with swift. Otherwise, use the `memcached_servers` option instead.

* `memcached_servers`: Set this option to share a cache across `keystonemiddleware.auth_token` processes.

* `token_cache_time`: Increase this option to improve performance, decrease this option to respond to token revocation events more quickly (thereby increasing security).

* `revocation_cache_time`: Increase this option to improve performance, decrease this option to respond to token revocation events more quickly (thereby increasing security).

* `memcache_security_strategy`: Do not set this option to improve performance, but set it to improve security where you’re sharing memcached with other processes.

* `include_service_catalog`: Disable this option to improve performance, if the protected service does not require a service catalog.

---

## **URL safe naming of projects and domains**

In the future, keystone may offer the ability to identify a project in a hierarchy via a URL style of naming from the root of the hierarchy (for example specifying ‘projectA/projectB/projectC’ as the project name in an authentication request). In order to prepare for this, keystone supports the optional ability to ensure both projects and domains are named without including any of the reserved characters specified in section 2.2 of [rfc3986](http://tools.ietf.org/html/rfc3986).

The safety of the names of projects and domains can be controlled via two configuration options:

```
[resource]
project_name_url_safe = off
domain_name_url_safe = off
```

When set to `off` (which is the default), no checking is done on the URL safeness of names. When set to `new`, an attempt to create a new project or domain with an unsafe name (or update the name of a project or domain to be unsafe) will cause a status code of 400 (Bad Request) to be returned. Setting the configuration option to `strict` will, in addition to preventing the creation and updating of entities with unsafe names, cause an authentication attempt which specifies a project or domain name that is unsafe to return a status code of 401 (Unauthorized).

It is recommended that installations take the steps necessary to where they can run with both options set to `strict` as soon as is practical.

---

## **Limiting list return size**

Keystone provides a method of setting a limit to the number of entities returned in a collection, which is useful to prevent overly long response times for list queries that have not specified a sufficiently narrow filter. This limit can be set globally by setting `list_limit` in the default section of `keystone.conf`, with no limit set by default. Individual driver sections may override this global value with a specific limit, for example:

```
[resource]
list_limit = 100
```

If a response to `list_{entity}` call has been truncated, then the response status code will still be 200 (OK), but the `truncated` attribute in the collection will be set to `true`.

---

## **Endpoint Filtering**

Endpoint Filtering enables creation of ad-hoc catalogs for each project-scoped token request.

Configure the endpoint filter catalog driver in the `[catalog]` section. For example:

```
[catalog]
driver = catalog_sql
```

In the `[endpoint_filter]` section, set `return_all_endpoints_if_no_filter` to `False` to return an empty catalog if no associations are made. For example:

```
[endpoint_filter]
return_all_endpoints_if_no_filter = False
```

See [API Specification for Endpoint Filtering](https://docs.openstack.org/api-ref/identity/v3-ext/#os-ep-filter-api) for the details of API definition.

---

## **Endpoint Policy**

The Endpoint Policy feature provides associations between service endpoints and policies that are already stored in the Identity server and referenced by a policy ID.

Configure the endpoint policy backend driver in the `[endpoint_policy]` section. For example:

```
[endpoint_policy]
driver = sql
```

See [API Specification for Endpoint Policy](https://docs.openstack.org/api-ref/identity/v3-ext/index.html#os-endpoint-policy-api) for the details of API definition.
