# **Middleware Audit**

The Keystone middleware library provides an optional WSGI middleware filter which allows the ability to audit API requests for each component of OpenStack.

The audit middleware filter utilises environment variables to build the CADF event.

![Figure 1: Audit middleware in Nova pipeline](https://docs.openstack.org/keystonemiddleware/zed/_images/audit.png)
/// caption
Audit
///

The figure above shows the middleware in Nova’s pipeline.

---

## **Enabling audit middleware**

To enable auditing, [oslo.messaging](https://www.github.com/openstack/oslo.messaging) should be installed. If not, the middleware will log the audit event instead. Auditing can be enabled for a specific project by editing the project’s api-paste.ini file to include the following filter definition:

```
[filter:audit]
paste.filter_factory = keystonemiddleware.audit:filter_factory
audit_map_file = /etc/nova/api_audit_map.conf
```

The filter should be included after Keystone middleware’s auth\_token middleware so it can utilise environment variables set by auth\_token. Below is an example using Nova’s WSGI pipeline:

```
[composite:openstack_compute_api_v2]
use = call:nova.api.auth:pipeline_factory
noauth = faultwrap sizelimit noauth ratelimit osapi_compute_app_v2
keystone = faultwrap sizelimit authtoken keystonecontext ratelimit audit osapi_compute_app_v2
keystone_nolimit = faultwrap sizelimit authtoken keystonecontext audit osapi_compute_app_v2
```

---

## **Configure audit middleware**

To properly audit api requests, the audit middleware requires an api\_audit\_map.conf to be defined. The project’s corresponding api\_audit\_map.conf file is included in the [pyCADF library](https://github.com/openstack/pycadf/tree/master/etc/pycadf).

The location of the mapping file should be specified explicitly by adding the path to the ‘audit\_map\_file’ option of the filter definition:

```
[filter:audit]
paste.filter_factory = keystonemiddleware.audit:filter_factory
audit_map_file = /etc/nova/api_audit_map.conf
```

Additional options can be set:

```
[filter:audit]
paste.filter_factory = pycadf.middleware.audit:filter_factory
audit_map_file = /etc/nova/api_audit_map.conf
service_name = test # opt to set HTTP_X_SERVICE_NAME environ variable
ignore_req_list = GET,POST # opt to ignore specific requests
```

Audit middleware can be configured to use its own exclusive notification driver and topic(s) value. This can be useful when the service is already using oslo messaging notifications and wants to use a different driver for auditing e.g. service has existing notifications sent to queue via ‘messagingv2’ and wants to send audit notifications to a log file via ‘log’ driver. Example shown below:

```
[audit_middleware_notifications]
driver = log
```

When audit events are sent via ‘messagingv2’ or ‘messaging’, middleware can specify a transport URL if its transport URL needs to be different from the service’s own messaging transport setting. Other Transport related settings are read from oslo messaging sections defined in service configuration e.g. ‘oslo\_messaging\_rabbit’. Example shown below:

```
[audit_middleware_notifications]
driver = messaging
transport_url = rabbit://user2:passwd@host:5672/another_virtual_host
```
