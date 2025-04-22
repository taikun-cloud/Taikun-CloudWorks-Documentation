# **Tasks and Pipelines in Taikun CloudWorks**

Taikun CloudWorks empowers to streamline the development lifecycle with its advanced capabilities in creating and managing CI/CD pipelines directly within its web interface.

**Key Features:**

1. **Tekton Integration:** Taikun CloudWorks seamlessly integrates with Tekton, a robust open-source framework for building CI/CD systems. Leveraging Tekton within Kubernetes clusters, Taikun provides a scalable and flexible solution to meet your continuous integration and continuous delivery needs.

2. **Effortless Pipeline Creation:** Taikun CloudWorks simplifies the pipeline creation process, allowing developers to define, customize, and manage CI/CD workflows effortlessly. With an intuitive interface, users can design pipelines tailored to their project requirements.

3. **Kubernetes Efficiency:** Tekton operates within Kubernetes clusters, ensuring a container-native approach to CI/CD. Taikun harnesses the power of Kubernetes to enhance scalability, reliability, and ease of deployment for your CI/CD processes.

4. **End-to-End Management:** Taikun CloudWorks provides comprehensive pipeline management capabilities. From initiating builds to automating deployment and monitoring, the platform ensures a smooth end-to-end experience for your development team.

---

## **Tasks and Pipelines**

Building Blocks of Tekton CI/CD Workflow

---

## **Tekton Pipelines**

Tekton Pipelines is a Kubernetes extension that installs and runs on your Kubernetes cluster. It defines a set of Kubernetes [Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) that act as building blocks from which you can assemble CI/CD pipelines. Once installed, Tekton Pipelines becomes available via the Kubernetes CLI (kubectl) and via API calls, just like pods and other resources. Tekton is open-source and part of the [CD Foundation](https://cd.foundation/), a [Linux Foundation](https://www.linuxfoundation.org/projects/) project.

----

## **Tekton Pipelines entities**

Tekton Pipelines defines the following entities:

| Entity                         | Description                           |
| -----------------------------  | ------------------------------------- |
| Task                           | Defines a series of steps which launch specific build or delivery tools that ingest specific inputs and produce specific outputs.                    |
| TaskRun                        | Instantiates a Task for execution with specific inputs, outputs, and execution parameters. Can be invoked on its own or as part of a Pipeline.                          |
| Pipeline                       | Defines a series of Tasks that accomplish a specific build or delivery goal. Can be triggered by an event or invoked from a PipelineRun. |
| PipelineRun                    | Instantiates a Pipeline for execution with specific inputs, outputs, and execution parameters.|
| PipelineResources (Deprecated) | Defines locations for inputs ingested and outputs produced by the steps in Tasks.|
| Run (alpha)                    | Instantiates a Custom Task for execution when specific inputs.|
