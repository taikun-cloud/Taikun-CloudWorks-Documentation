# **Tekton Operators**

## **Operator**

Manage Tekton CI/CD Building 

---

## **Tekton Operator**

Tekton Operator is a Kubernetes extension that installs, upgrades and manages TektonCD [Pipelines](https://github.com/tektoncd/pipeline), [Dashboards](https://github.com/tektoncd/dashboard), and [Triggers](https://github.com/tektoncd/triggers) (and other components) on any Kubernetes Cluster.


### Tekton Operator entities

Tekton Operator defines the following entities:

| Entity                   | Description                                                            |
| ------------------------ | ---------------------------------------------------------------------- |
| TektonConfig             | Configure Tekton components to be installed and managed.               |
| TektonPipeline           | Configure the [Tekton Pipeline](https://github.com/tektoncd/pipeline) component to be installed and managed.   |
| TektonTrigger            | Configure the [Tekton Trigger](https://github.com/tektoncd/triggers) component to be installed and managed.    |
| TektonDashboard          | Configure the [Tekton Dashboard](https://github.com/tektoncd/dashboard) component to be installed and managed.  |
| TektonResult             | Configure the [Tekton Result](https://github.com/tektoncd/results) component to be installed and managed.     |
| TektonChain              | Configure the [Tekton Chain](https://github.com/tektoncd/chains) component to be installed and managed.      |
| OpenShiftPipelinesAsCode | Configure the [Pipelines as Code](https://github.com/openshift-pipelines/pipelines-as-code) component to be installed and managed. |
| TektonAddon              | Configure addons to be installed and managed.                          |

### Getting started

To install an Operator, there are multiple ways

* **Install from Operator HubYou.** You can find the instructions [here](https://operatorhub.io/operator/tektoncd-operator). The lifecycle will be managed by Operator Lifecycle Manager (OLM).

* **Install using the release file.** The latest version’s release file can be found [here](https://github.com/tektoncd/operator/releases). In this case, you will have to manage the operator’s lifecycle.

* **Install from code.** You can clone the repositories and install the Operator. You can find the instructions [here](https://github.com/tektoncd/operator/tree/release-v0.70.x/DEVELOPMENT.md)

After installing the Operator, install the required Tekton Component, such as Tekton Pipeline and Tekton Triggers.

Create an instance of `TektonConfig`, which will create the required components. You can find more details and the available configuration in [TektonConfig](https://tekton.dev/docs/operator/TektonConfig/).

!!! Note
	TektonResult and TektonChain are optional components and are not currently installed through TektonConfig. The installation steps are in their docs.

### Understanding Tekton Operator

Each Tekton Component has a Custom Resource that installs and manages the component.

TektonConfig is a top-level Custom Resource that creates other components.

So, the user needs to create TektonConfig with the required configurations, and it will install the necessary components.

More about the Resources and their available configurations are found in their docs.

* [TektonConfig](https://tekton.dev/docs/operator/TektonConfig/)

* [TektonPipeline](https://tekton.dev/docs/operator/TektonPipeline/)

* [TektonTrigger](https://tekton.dev/docs/operator/TektonTrigger/)

* [TektonDashboard](https://tekton.dev/docs/operator/TektonDashboard/)

* [TektonResult](https://tekton.dev/docs/operator/TektonResult/)

* [TektonChain](https://tekton.dev/docs/operator/TektonChain/)

* [TektonAddon](https://tekton.dev/docs/operator/TektonAddon/)

* [OpenShiftPipelinesAsCode](https://tekton.dev/docs/operator/OpenShiftPipelinesAsCode/)

To understand how Tekton Operator works, you can find the details [here](https://github.com/tektoncd/operator/tree/release-v0.70.x/docs/TektonOperator.md)
