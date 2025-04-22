# **Keystone Architecture**

## **Services**

Keystone is organized as a group of internal services exposed on one or many endpoints. Many of these services are used in a combined fashion by the frontend. For example, an authenticate call will validate user/project credentials with the Identity service and, upon success, create and return a token with the Token service.

### Identity

The Identity service provides auth credential validation and data about users and groups. In the basic case, this data is managed by the Identity service, allowing it to also handle all CRUD operations associated with this data. In more complex cases, the data is instead managed by an authoritative backend service. An example of this would be when the Identity service acts as a frontend for LDAP. In that case the LDAP server is the source of truth and the role of the Identity service is to relay that information accurately.

#### Users

`Users` represent an individual API consumer. A user itself must be owned by a specific domain, and hence all user names are **not** globally unique, but only unique to their domain.

#### Groups

`Groups` are a container representing a collection of users. A group itself must be owned by a specific domain, and hence all group names are **not** globally unique, but only unique to their domain.

### Resource

The Resource service provides data about projects and domains.

#### Projects

`Projects` represent the base unit of `ownership` in OpenStack, in that all resources in OpenStack should be owned by a specific project. A project itself must be owned by a specific domain, and hence all project names are **not** globally unique, but unique to their domain. If the domain for a project is not specified, then it is added to the default domain.

#### Domains

`Domains` are a high-level container for projects, users and groups. Each is owned by exactly one domain. Each domain defines a namespace where an API-visible name attribute exists. Keystone provides a default domain, aptly named ‘Default’.

In the Identity v3 API, the uniqueness of attributes is as follows:

* Domain Name. Globally unique across all domains.

* Role Name. Unique within the owning domain.

* User Name. Unique within the owning domain.

* Project Name. Unique within the owning domain.

* Group Name. Unique within the owning domain.

Due to their container architecture, domains may be used as a way to delegate management of OpenStack resources. A user in a domain may still access resources in another domain, if an appropriate assignment is granted.

### Assignment

The Assignment service provides data about roles and role assignments.

#### Roles

`Roles` dictate the level of authorization the end user can obtain. Roles can be granted at either the domain or project level. A role can be assigned at the individual user or group level. Role names are unique within the owning domain.

#### Role Assignments

A 3-tuple that has a `Role`, a `Resource` and an `Identity`.

### Token

The Token service validates and manages tokens used for authenticating requests once a user’s credentials have already been verified.

### Catalog

The Catalog service provides an endpoint registry used for endpoint discovery.

---

## **Application Construction**

Keystone is an HTTP front-end to several services. Since the Rocky release Keystone uses the [Flask-RESTful](https://flask-restful.readthedocs.io/en/latest/) library to provide a REST API interface to these services.

Keystone defines functions related to [Flask-RESTful](https://flask-restful.readthedocs.io/en/latest/) in [`keystone.server.flask.common`](https://docs.openstack.org/keystone/zed/api/keystone.server.flask.common.html#module-keystone.server.flask.common). Keystone creates API resources which inherit from class [`keystone.server.flask.common.ResourceBase`](https://docs.openstack.org/keystone/zed/api/keystone.server.flask.common.html#keystone.server.flask.common.ResourceBase) and exposes methods for each supported HTTP methods GET, PUT , POST, PATCH and DELETE. For example, the User resource will look like:

```
class UserResource(ks_flask.ResourceBase): 
  collection_key = 'users' 
  member_key = 'user' 
  get_member_from_driver = PROVIDERS.deferred_provider_lookup( api='identity_api', method='get_user') 
  
  def get(self, user_id=None): 
  """Get a user resource or list users. GET/HEAD /v3/users GET/HEAD /v3/users/{user_id} """ 
  ... 
  
  def post(self): 
  """Create a user. POST /v3/users """
  ...
  class UserChangePasswordResource(ks_flask.ResourceBase): 
  @ks_flask.unenforced_api 
   def post(self, user_id): 
   ...
```

Routes for each API resource are defined by classes which inherit from [`keystone.server.flask.common.APIBase`](https://docs.openstack.org/keystone/zed/api/keystone.server.flask.common.html#keystone.server.flask.common.APIBase). For example, the UserAPI will look like:

```
class UserAPI(ks_flask.APIBase):
    _name = 'users'
    _import_name = __name__
    resources = [UserResource]
    resource_mapping = [
        ks_flask.construct_resource_map(
            resource=UserChangePasswordResource,
            url='/users/<string:user_id>/password',
            resource_kwargs={},
            rel='user_change_password',
            path_vars={'user_id': json_home.Parameters.USER_ID}
        ),
        # Add more resources as needed
    ]

```

The
methods `_add_resources()` or `_add_mapped_resources()` in [`keystone.server.flask.common.APIBase`](https://docs.openstack.org/keystone/zed/api/keystone.server.flask.common.html#keystone.server.flask.common.APIBase) bind the resources with the APIs. Within each API, one or more managers are loaded (for example, see [`keystone.catalog.core.Manager`](https://docs.openstack.org/keystone/zed/api/keystone.catalog.core.html#keystone.catalog.core.Manager)), which are thin wrapper classes which load the appropriate service driver based on the keystone configuration.

* Assignment

  * [`keystone.api.role_assignments`](https://docs.openstack.org/keystone/zed/api/keystone.api.role_assignments.html#module-keystone.api.role_assignments)

  * [`keystone.api.role_inferences`](https://docs.openstack.org/keystone/zed/api/keystone.api.role_inferences.html#module-keystone.api.role_inferences)

  * [`keystone.api.roles`](https://docs.openstack.org/keystone/zed/api/keystone.api.roles.html#module-keystone.api.roles)

  * [`keystone.api.os_inherit`](https://docs.openstack.org/keystone/zed/api/keystone.api.os_inherit.html#module-keystone.api.os_inherit)

  * [`keystone.api.system`](https://docs.openstack.org/keystone/zed/api/keystone.api.system.html#module-keystone.api.system)

* Authentication

  * [`keystone.api.auth`](https://docs.openstack.org/keystone/zed/api/keystone.api.auth.html#module-keystone.api.auth)

  * [`keystone.api.ec2tokens`](https://docs.openstack.org/keystone/zed/api/keystone.api.ec2tokens.html#module-keystone.api.ec2tokens)

  * [`keystone.api.s3tokens`](https://docs.openstack.org/keystone/zed/api/keystone.api.s3tokens.html#module-keystone.api.s3tokens)

* Catalog

  * [`keystone.api.endpoints`](https://docs.openstack.org/keystone/zed/api/keystone.api.endpoints.html#module-keystone.api.endpoints)

  * [`keystone.api.os_ep_filter`](https://docs.openstack.org/keystone/zed/api/keystone.api.os_ep_filter.html#module-keystone.api.os_ep_filter)

  * [`keystone.api.regions`](https://docs.openstack.org/keystone/zed/api/keystone.api.regions.html#module-keystone.api.regions)

  * [`keystone.api.services`](https://docs.openstack.org/keystone/zed/api/keystone.api.services.html#module-keystone.api.services)

* Credentials

  * [`keystone.api.credentials`](https://docs.openstack.org/keystone/zed/api/keystone.api.credentials.html#module-keystone.api.credentials)

* Federation

  * [`keystone.api.os_federation`](https://docs.openstack.org/keystone/zed/api/keystone.api.os_federation.html#module-keystone.api.os_federation)

* Identity

  * [`keystone.api.groups`](https://docs.openstack.org/keystone/zed/api/keystone.api.groups.html#module-keystone.api.groups)

  * [`keystone.api.users`](https://docs.openstack.org/keystone/zed/api/keystone.api.users.html#module-keystone.api.users)

* Limits

  * [`keystone.api.registered_limits`](https://docs.openstack.org/keystone/zed/api/keystone.api.registered_limits.html#module-keystone.api.registered_limits)

  * [`keystone.api.limits`](https://docs.openstack.org/keystone/zed/api/keystone.api.limits.html#module-keystone.api.limits)

* Oauth1

  * [`keystone.api.os_oauth1`](https://docs.openstack.org/keystone/zed/api/keystone.api.os_oauth1.html#module-keystone.api.os_oauth1)

* Policy

  * [`keystone.api.policy`](https://docs.openstack.org/keystone/zed/api/keystone.api.policy.html#module-keystone.api.policy)

* Resource

  * [`keystone.api.domains`](https://docs.openstack.org/keystone/zed/api/keystone.api.domains.html#module-keystone.api.domains)

  * [`keystone.api.projects`](https://docs.openstack.org/keystone/zed/api/keystone.api.projects.html#module-keystone.api.projects)

* Revoke

  * [`keystone.api.os_revoke`](https://docs.openstack.org/keystone/zed/api/keystone.api.os_revoke.html#module-keystone.api.os_revoke)

* Trust

  * [`keystone.api.trusts`](https://docs.openstack.org/keystone/zed/api/keystone.api.trusts.html#module-keystone.api.trusts)

---

## **Service Backends**

Each of the services can be configured to use a backend to allow keystone to fit a variety of environments and needs. The backend for each service is defined in the keystone.conf file with the key `driver` under a group associated with each service.

A general class exists under each backend to provide an abstract base class for any implementations, identifying the expected service implementations. The abstract base classes are stored in the service’s backends directory as `base.py`. The corresponding drivers for the services are:

* [`keystone.assignment.backends.base.AssignmentDriverBase`](https://docs.openstack.org/keystone/zed/api/keystone.assignment.backends.base.html#keystone.assignment.backends.base.AssignmentDriverBase)

* [`keystone.assignment.role_backends.base.RoleDriverBase`](https://docs.openstack.org/keystone/zed/api/keystone.assignment.role_backends.base.html#keystone.assignment.role_backends.base.RoleDriverBase)

* [`keystone.auth.plugins.base.AuthMethodHandler`](https://docs.openstack.org/keystone/zed/api/keystone.auth.plugins.base.html#keystone.auth.plugins.base.AuthMethodHandler)

* [`keystone.catalog.backends.base.CatalogDriverBase`](https://docs.openstack.org/keystone/zed/api/keystone.catalog.backends.base.html#keystone.catalog.backends.base.CatalogDriverBase)

* [`keystone.credential.backends.base.CredentialDriverBase`](https://docs.openstack.org/keystone/zed/api/keystone.credential.backends.base.html#keystone.credential.backends.base.CredentialDriverBase)

* [`keystone.endpoint_policy.backends.base.EndpointPolicyDriverBase`](https://docs.openstack.org/keystone/zed/api/keystone.endpoint_policy.backends.base.html#keystone.endpoint_policy.backends.base.EndpointPolicyDriverBase)

* [`keystone.federation.backends.base.FederationDriverBase`](https://docs.openstack.org/keystone/zed/api/keystone.federation.backends.base.html#keystone.federation.backends.base.FederationDriverBase)

* [`keystone.identity.backends.base.IdentityDriverBase`](https://docs.openstack.org/keystone/zed/api/keystone.identity.backends.base.html#keystone.identity.backends.base.IdentityDriverBase)

* [`keystone.identity.mapping_backends.base.MappingDriverBase`](https://docs.openstack.org/keystone/zed/api/keystone.identity.mapping_backends.base.html#keystone.identity.mapping_backends.base.MappingDriverBase)

* [`keystone.identity.shadow_backends.base.ShadowUsersDriverBase`](https://docs.openstack.org/keystone/zed/api/keystone.identity.shadow_backends.base.html#keystone.identity.shadow_backends.base.ShadowUsersDriverBase)

* [`keystone.oauth1.backends.base.Oauth1DriverBase`](https://docs.openstack.org/keystone/zed/api/keystone.oauth1.backends.base.html#keystone.oauth1.backends.base.Oauth1DriverBase)

* [`keystone.policy.backends.base.PolicyDriverBase`](https://docs.openstack.org/keystone/zed/api/keystone.policy.backends.base.html#keystone.policy.backends.base.PolicyDriverBase)

* [`keystone.resource.backends.base.ResourceDriverBase`](https://docs.openstack.org/keystone/zed/api/keystone.resource.backends.base.html#keystone.resource.backends.base.ResourceDriverBase)

* [`keystone.resource.config_backends.base.DomainConfigDriverBase`](https://docs.openstack.org/keystone/zed/api/keystone.resource.config_backends.base.html#keystone.resource.config_backends.base.DomainConfigDriverBase)

* [`keystone.revoke.backends.base.RevokeDriverBase`](https://docs.openstack.org/keystone/zed/api/keystone.revoke.backends.base.html#keystone.revoke.backends.base.RevokeDriverBase)

* [`keystone.token.providers.base.Provider`](https://docs.openstack.org/keystone/zed/api/keystone.token.providers.base.html#keystone.token.providers.base.Provider)

* [`keystone.trust.backends.base.TrustDriverBase`](https://docs.openstack.org/keystone/zed/api/keystone.trust.backends.base.html#keystone.trust.backends.base.TrustDriverBase)

If you implement a backend driver for one of the keystone services, you’re expected to subclass from these classes.

### Templated Backend

Largely designed for a common use case around service catalogs in the keystone project, a templated backend is a catalog backend that simply expands pre-configured templates to provide catalog data.

Example paste.deploy config (uses $ instead of % to avoid ConfigParser’s interpolation)**\[DEFAULT]**

```
catalog.RegionOne.identity.publicURL = http://localhost:$(public_port)s/v3 catalog.RegionOne.identity.adminURL = http://localhost:$(public_port)s/v3 catalog.RegionOne.identity.internalURL = http://localhost:$(public_port)s/v3 catalog.RegionOne.identity.name = 'Identity Service'
```

---

## **Data Model**

Keystone was designed from the ground up to be amenable to multiple styles of backends. As such, many of the methods and data types will happily accept more data than they know what to do with and pass them on to a backend.

There are a few main data types:

* **User**: has account credentials, is associated with one or more projects or domains

* **Group**: a collection of users, is associated with one or more projects or domains

* **Project**: unit of ownership in OpenStack, contains one or more users

* **Domain**: unit of ownership in OpenStack, contains users, groups and projects

* **Role**: a first-class piece of metadata associated with many user-project pairs.

* **Token**: identifying credential associated with a user or user and project

* **Extras**: bucket of key-value metadata associated with a user-project pair.

* **Rule**: describes a set of requirements for performing an action.

While the general data model allows a many-to-many relationship between users and groups to projects and domains; the actual backend implementations take varying levels of advantage of that functionality.

---

## **Approach to CRUD**

While it is expected that any “real” deployment at a large company will manage their users and groups in their existing user systems, a variety of CRUD operations are provided for the sake of development and testing.

CRUD is treated as an extension or additional feature to the core feature set, in that a backend is not required to support it. It is expected that backends for services that don’t support the CRUD operations will raise a [`keystone.exception.NotImplemented`](https://docs.openstack.org/keystone/zed/api/keystone.exception.html#keystone.exception.NotImplemented).

---

## **Approach to Authorization (Policy)**

Various components in the system require that different actions are allowed based on whether the user is authorized to perform that action.

For the purposes of keystone there are only a couple levels of authorization being checked for:

* Require that the performing user is considered an admin.

* Require that the performing user matches the user being referenced.

Other systems wishing to use the policy engine will require additional styles of checks and will possibly write completely custom backends. By default, keystone leverages policy enforcement that is maintained in [oslo.policy](https://opendev.org/openstack/oslo.policy/).

### Rules

Given a list of matches to check for, simply verify that the credentials contain the matches. For example:

```
credentials = {'user_id': 'foo', 'is_admin': 1, 'roles': ['nova:netadmin']}

# An admin-only call:
policy_api.enforce(('is_admin:1',), credentials)

# An admin or owner call:
policy_api.enforce(('is_admin:1', 'user_id:foo'), credentials)

# A netadmin call:
policy_api.enforce(('roles:nova:netadmin',), credentials)
```

Credentials are generally built from the user metadata in the ‘extras’ part of the Identity API. So, adding a ‘role’ to the user just means adding the role to the user metadata.

### Capability RBAC

(Not yet implemented.)

Another approach to authorization can be action-based, with a mapping of roles to which capabilities are allowed for that role. For example:

```
credentials = {'user_id': 'foo', 'is_admin': 1, 'roles': ['nova:netadmin']}

# Add a policy
policy_api.add_policy('action:nova:add_network', ('roles:nova:netadmin',))

# Enforce the policy
policy_api.enforce(('action:nova:add_network',), credentials)
```

In the backend this would look up the policy for ‘action:nova:add\_network’ and then do what is effectively a ‘Simple Match’ style match against the credentials.

---

## **Approach to Authentication**

Keystone provides several authentication plugins that inherit from [`keystone.auth.plugins.base`](https://docs.openstack.org/keystone/zed/api/keystone.auth.plugins.base.html#module-keystone.auth.plugins.base). The following is a list of available plugins.

* [`keystone.auth.plugins.external.Base`](https://docs.openstack.org/keystone/zed/api/keystone.auth.plugins.external.html#keystone.auth.plugins.external.Base)

* [`keystone.auth.plugins.mapped.Mapped`](https://docs.openstack.org/keystone/zed/api/keystone.auth.plugins.mapped.html#keystone.auth.plugins.mapped.Mapped)

* [`keystone.auth.plugins.oauth1.OAuth`](https://docs.openstack.org/keystone/zed/api/keystone.auth.plugins.oauth1.html#keystone.auth.plugins.oauth1.OAuth)

* [`keystone.auth.plugins.password.Password`](https://docs.openstack.org/keystone/zed/api/keystone.auth.plugins.password.html#keystone.auth.plugins.password.Password)

* [`keystone.auth.plugins.token.Token`](https://docs.openstack.org/keystone/zed/api/keystone.auth.plugins.token.html#keystone.auth.plugins.token.Token)

* [`keystone.auth.plugins.totp.TOTP`](https://docs.openstack.org/keystone/zed/api/keystone.auth.plugins.totp.html#keystone.auth.plugins.totp.TOTP)

In the most basic plugin `password`, two pieces of information are required to authenticate with keystone, a bit of `Resource` information and a bit of `Identity`.

Take the following call POST data for instance:

```
{
  "auth": {
    "identity": {
      "methods": [
        "password"
      ],
      "password": {
        "user": {
          "id": "0ca8f6",
          "password": "secretsecret"
        }
      }
    },
    "scope": {
      "project": {
        "id": "263fd9"
      }
    }
  }
}
```

The user (ID of 0ca8f6) is attempting to retrieve a token that is scoped to project (ID of 263fd9).

To perform the same call with names instead of IDs, we now need to supply information about the domain. This is because usernames are only unique within a given domain, but user IDs are supposed to be unique across the deployment. Thus, the auth request looks like the following:

```
{
  "auth": {
    "identity": {
      "methods": [
        "password"
      ],
      "password": {
        "user": {
          "domain": {
            "name": "acme"
          },
          "name": "userA",
          "password": "secretsecret"
        }
      }
    },
    "scope": {
      "project": {
        "domain": {
          "id": "1789d1"
        },
        "name": "project-x"
      }
    }
  }
}
```

For both the user and the project portion, we must supply either a domain ID or a domain name, in order to properly determine the correct user and project.

Alternatively, if we wanted to represent this as environment variables for a command line, it would be:

```
export OS_PROJECT_DOMAIN_ID=1789d1
export OS_USER_DOMAIN_NAME=acme
export OS_USERNAME=userA
export OS_PASSWORD=secretsecret
export OS_PROJECT_NAME=project-x
```

!!! Note 
	That the project the user is attempting to access must be in the same domain as the user.

### What is Scope?

Scope is an overloaded term.

In reference to authenticating, as seen above, scope refers to the portion of the POST data that dictates what `Resource` (project, domain, or system) the user wants to access.

In reference to tokens, scope refers to the effectiveness of a token, i.e.: a project-scoped token is only useful on the project it was initially granted for. A domain-scoped token may be used to perform domain-related function. A system-scoped token is only useful for interacting with APIs that affect the entire deployment.

In reference to users, groups, and projects, scope often refers to the domain that the entity is owned by. i.e.: a user in domain X is scoped to domain X.
