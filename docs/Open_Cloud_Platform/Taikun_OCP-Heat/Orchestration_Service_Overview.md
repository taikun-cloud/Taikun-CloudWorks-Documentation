# **Orchestration Service Overview (heat)**

Heat is a service to orchestrate composite cloud applications using a declarative template format through an OpenStack-native REST API.

---

## **Heat’s purpose and vision**

* Heat provides a template based orchestration for describing a cloud application by executing appropriate [OpenStack](https://docs.openstack.org/heat/zed/glossary.html#term-OpenStack) API calls to generate running cloud applications.

* A Heat template describes the infrastructure for a cloud application in text files which are readable and writable by humans, and can be managed by version control tools.

* Templates specify the relationships between resources (e.g. this volume is connected to this server). This enables Heat to call out to the OpenStack APIs to create all of your infrastructure in the correct order to completely launch your application.

* The software integrates other components of OpenStack. The templates allow creation of most OpenStack resource types (such as instances, floating ips, volumes, security groups, users, etc), as well as some more advanced functionality such as instance high availability, instance autoscaling, and nested stacks.

* Heat primarily manages infrastructure, but the templates integrate well with software configuration management tools such as Puppet and Ansible.

* Operators can customise the capabilities of Heat by installing plugins.

This documentation offers information aimed at end-users, operators and developers of Heat.

---

## **Operating Heat**

* [Installing Heat](https://docs.openstack.org/heat/zed/install/index.html)

* [Running Heat API services in HTTP Server](https://docs.openstack.org/heat/zed/operating_guides/httpd.html)

* [Configuring Heat](https://docs.openstack.org/heat/zed/configuration/index.html)

* [Administering Heat](https://docs.openstack.org/heat/zed/admin/index.html)

* [Scaling a Deployment](https://docs.openstack.org/heat/zed/operating_guides/scale_deployment.html)

* [Upgrades Guideline](https://docs.openstack.org/heat/zed/operating_guides/upgrades_guide.html)

* [Man pages for services and utilities](https://docs.openstack.org/heat/zed/man/index.html)

---

## **Using Heat**

* [Creating your first stack](https://docs.openstack.org/heat/zed/getting_started/create_a_stack.html)

* [Glossary](https://docs.openstack.org/heat/zed/glossary.html)

## Working with Templates

* [Template Guide](https://docs.openstack.org/heat/zed/template_guide/index.html)

* [Example Templates](https://docs.openstack.org/heat/zed/templates/index.html)

## Using the Heat Service

* [OpenStack Orchestration API v1 Reference](https://developer.openstack.org/api-ref/orchestration/v1/)

* [Python and CLI client](https://docs.openstack.org/python-heatclient/zed/)

---

## **Developing Heat**

* [Heat Developer Guidelines](https://docs.openstack.org/heat/zed/developing_guides/index.html)

  * [Heat and DevStack](https://docs.openstack.org/heat/zed/getting_started/on_devstack.html)

  * [Blueprints and Specs](https://docs.openstack.org/heat/zed/developing_guides/blueprints.html)

  * [Heat architecture](https://docs.openstack.org/heat/zed/developing_guides/architecture.html)

  * [Heat Resource Plug-in Development Guide](https://docs.openstack.org/heat/zed/developing_guides/pluginguide.html)

  * [Heat Stack Lifecycle Scheduler Hints](https://docs.openstack.org/heat/zed/developing_guides/schedulerhints.html)

  * [Guru Meditation Reports](https://docs.openstack.org/heat/zed/developing_guides/gmr.html)

  * [Heat Support Status usage Guide](https://docs.openstack.org/heat/zed/developing_guides/supportstatus.html)

  * [Using Rally on Heat gates](https://docs.openstack.org/heat/zed/developing_guides/rally_on_gates.html)

* [Source Code Index](https://docs.openstack.org/heat/zed/api/index.html)

---

## **For Contributors**

* If you are a new contributor to Heat please refer: [So You Want to Contribute…](https://docs.openstack.org/heat/zed/contributor/contributing.html)

  * [Heat Contributor Guidelines](https://docs.openstack.org/heat/zed/contributor/index.html)

    * [So You Want to Contribute…](https://docs.openstack.org/heat/zed/contributor/contributing.html)

---

## **Indices and tables**

* [Index](https://docs.openstack.org/heat/zed/genindex.html)

* [Module Index](https://docs.openstack.org/heat/zed/py-modindex.html)

* [Search Page](https://docs.openstack.org/heat/zed/search.html)
