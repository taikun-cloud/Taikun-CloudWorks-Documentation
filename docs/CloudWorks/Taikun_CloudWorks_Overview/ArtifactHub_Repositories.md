# **ArtifactHub Repositories**

Artifact Hub allows publishers to list their content in an automated way. Publishers can add their repositories from the control panel, accessible from the top right menu after signing in. It’s possible to create an organization and add repositories to it instead of adding them to the user’s account. Repositories will be indexed periodically to always display the most up-to-date content.

The following repository kinds are supported at the moment:

- [Argo templates repositories](https://artifacthub.io/docs/argo_templates_repositories)
- [Backstage plugins repositories](https://artifacthub.io/docs/backstage_plugins_repositories)
- [Containers images repositories](https://artifacthub.io/docs/container_images_repositories)
- [CoreDNS plugins repositories](https://artifacthub.io/docs/coredns_plugins_repositories)
- [Falco rules repositories](https://artifacthub.io/docs/falco_rules_repositories)
- [Headlamp plugins repositories](https://artifacthub.io/docs/headlamp_plugins_repositories)
- [Helm charts repositories](https://artifacthub.io/docs/helm_charts_repositories)
- [Helm plugins repositories](https://artifacthub.io/docs/helm_plugins_repositories)
- [KCL modules repositories](https://artifacthub.io/docs/kcl_modules_repositories)
- [KEDA scalers repositories](https://artifacthub.io/docs/keda_scalers_repositories)
- [Keptn integrations repositories](https://artifacthub.io/docs/keptn_integrations_repositories)
- [Knative client plugins repositories](https://artifacthub.io/docs/knative_client_plugins_repositories)
- [Krew kubectl plugins repositories](https://artifacthub.io/docs/krew_kubectl_plugins_repositories)
- [KubeArmor policies repositories](https://artifacthub.io/docs/kubearmor_policies_repositories)
- [Kubewarden policies repositories](https://artifacthub.io/docs/kubewarden_policies_repositories)
- [Kyverno policies repositories](https://artifacthub.io/docs/kyverno_policies_repositories)
- [OLM operators repositories](https://artifacthub.io/docs/olm_operators_repositories)
- [OPA policies repositories](https://artifacthub.io/docs/opa_policies_repositories)
- [Tekton pipelines repositories](https://artifacthub.io/docs/tekton_pipelines_repositories)
- [Tekton tasks repositories](https://artifacthub.io/docs/tekton_tasks_repositories)
- [Tinkerbell actions repositories](https://artifacthub.io/docs/tinkerbell_actions_repositories)

This guide also contains additional information about the following repository topics:

- [Repositories guide](https://artifacthub.io/docs/topics/repositories/#repositories-guide)
    - [Verified publisher](https://artifacthub.io/docs/topics/repositories/#verified-publisher)
    - [Official status](https://artifacthub.io/docs/topics/repositories/#official-status)
    - [Ownership claim](https://artifacthub.io/docs/topics/repositories/#ownership-claim)
    - [Private repositories](https://artifacthub.io/docs/topics/repositories/#private-repositories)

---

## **Verified publisher**

Repositories and the packages they provide can display a special label named `Verified publisher`. This label indicates that the repository publisher *owns or has control* over the repository. Users may rely on it to decide if they want to use a given package or not.

Publishers can be verified through the [artifacthub-repo.yml](https://github.com/artifacthub/hub/blob/master/docs/metadata/artifacthub-repo.yml) repository metadata file. In the repositories tab in the Artifact Hub control panel, the repository identifier is exposed on each repository’s card (ID). To proceed with the verification, an `artifacthub-repo.yml` metadata file must be added to the repository including that **ID** in the `repositoryID` field. The next time the repository is processed, the verification will be checked and the flag will be enabled if it succeeds.

*Please note that the **artifacthub-repo.yml** metadata file must be located at the repository URL’s path. In Helm repositories, for example, this means it must be located at the same level of the chart repository **index.yaml** file, and it must be served from the chart repository HTTP server as well.*

The verified publisher flag won’t be set until the next time the repository is processed. Please keep in mind that the repository won’t be processed if it hasn’t changed since the last time it was processed. Depending on the repository kind, this is checked in a different way. For Helm HTTP-based repositories, we consider it has changed if the `index.yaml` file changes (the `generated` field is ignored when performing this check). For git-based repositories, it does when the hash of the last commit in the branch you set up changes.

---

## **Official status**

In Artifact Hub, the `official` status means that the publisher **owns the software** a package primarily focuses on. If we consider the *example* of a [chart used to install Consul](https://artifacthub.io/packages/helm/hashicorp/consul), to obtain the `official` status, the publisher should be the owner of the Consul software (*HashiCorp* in this case), not just the chart. Similarly, a [Tekton task used to perform operations on Google Cloud](https://artifacthub.io/packages/tekton-task/tekton-catalog-tasks/gcloud) would need to be published by *Google* to be marked as `official`. In the case of a MySQL operator, only one published by *MySQL/Oracle* would be considered `official`.

The `official` status can be granted at the repository or package level. When it is granted for a repository, all packages available on it will display the `official` badge, so all packages in the repository **must** be official. If only some of the packages in your repository are official, please list them in the `Official packages` field when submitting the official status request.

**Before applying for this status, please make sure your repository complies with the following requirements:**

- The repository has already obtained the [Verified publisher](https://artifacthub.io/docs/topics/repositories/#verified-publisher) status.
- The user requesting the status is the publisher of the repository in Artifact Hub, or belongs to the organization publishing it.
- All official packages available in the repository provide a `README.md` file with some documentation that can be displayed on Artifact Hub.

Once you have verified that the requirements are met, please file an issue [using this template](https://github.com/artifacthub/hub/issues/new?assignees=&labels=official+status+request&template=official-status-request.md&title=%5BOFFICIAL%5D+Your+repository+or+project+name) to apply.

---

## **Ownership claim**

Any user is free to add any repository they wish to Artifact Hub. In some situations, legit owners may want to claim ownership of an already published repository to publish it themselves. This process can be easily done in an automated way from the Artifact Hub control panel.

First, an [artifacthub-repo.yml](https://github.com/artifacthub/hub/blob/master/docs/metadata/artifacthub-repo.yml) metadata file must be added to the repository you want to claim ownership of. Only the `owners` section of the metadata file is required to be set up for this process. The `repositoryID` field can be omitted as the user claiming ownership doesn’t know it yet. The user requesting the ownership claim **must** appear in the list of owners in the metadata file, and the email listed **must** match the one used to sign in to Artifact Hub. This information will be used during the process to verify that the requesting user actually owns the repository.

Once the repository metadata file has been set up, you can proceed from the Artifact Hub control panel. In the repositories tab, click on `Claim Ownership`. You’ll need to enter the repository you’d like to claim ownership of, as well as the destination entity, which can be the user performing the request or an organization. If the metadata file was set up correctly, the process should complete successfully.

*Please note that the **artifacthub-repo.yml** metadata file must be located at the repository URL’s path. In Helm repositories, for example, this means it must be located at the same level of the chart repository **index.yaml** file, and it must be served from the chart repository HTTP server as well.*

---

## **Private repositories**

Artifact Hub supports adding private repositories (except OLM OCI based). By default, this feature is disabled, but you can enable it in your own Artifact Hub deployment by setting the `hub.server.allowPrivateRepositories` configuration setting to `true`. When enabled, you’ll be allowed to add the authentication credentials for the repository in the add/update repository modal in the control panel. Credentials are not exposed in the Artifact Hub UI, so users will need to get them separately. The installation instructions modal will display a warning to users when the package displayed belongs to a private repository.
