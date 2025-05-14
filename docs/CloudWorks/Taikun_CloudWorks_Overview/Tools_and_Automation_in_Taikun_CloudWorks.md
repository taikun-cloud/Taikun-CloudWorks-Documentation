# **Tools & Automation in Taikun CloudWorks**

Taikun CloudWorks provides a variety of tools and interfaces that enable automation, integration, and efficient management of your cloud infrastructure. This page serves as a central hub linking to documentation for each supported tool.

---

## **Taikun CLI**

The Taikun CLI is a command-line tool that allows you to manage your Taikun environment directly from the terminal.

- **Capabilities:** Manage projects, users, templates, Kubernetes clusters, billing rules, and more.
- **Supported OS:** macOS, Linux, Windows

[**Taikun CLI Documentation**](https://docs.taikun.cloud/CloudWorks/Advanced_Configuration/Taikun_CLI/)

---

## **Terraform Provider**

The official Terraform provider for Taikun enables infrastructure-as-code management through Terraform.

- **Capabilities:** Manage Kubernetes clusters, projects, cloud accounts, templates, notifications, and more.
- **Provider name:** `taikuncloud/taikun`

[**Terraform Provider**](https://docs.taikun.cloud/CloudWorks/Advanced_Configuration/Terraform_Provider_for_Taikun/)

---

## **Taikun API**

The Taikun API allows programmatic access to nearly all Taikun functionalities.

- **Format:** Standard HTTP/JSON API
- **Authentication:** via API token
- **Use cases:** Automation, monitoring, custom integrations, CI/CD

[**Taikun API Reference**](https://docs.taikun.cloud/CloudWorks/Advanced_Configuration/Taikun_API/)

---

## **OCP to TCW Script**

This repository contains a single Bash script, `ott.sh`, which automates the process of setting up OpenStack and Taikun credentials.

- **Purpose:** Automates the setup of OpenStack and Taikun credentials, project creation, user management, and cloud credential generation.
- **Repository:** [**ocp-to-tcw Script**](https://github.com/skotnicky/tools/tree/main/ocp-to-tcw)
- **Usage:** The script can be used as a command-line utility to facilitate migration and reduce manual setup.

For a detailed explanation of how to automate the cloud integration from OpenStack to Taikun, visit the [Automating Cloud Integration: OpenStack to Taikun Made Easy](https://docs.taikun.cloud/CloudWorks/Account_Management/Organizations_in_Taikun/#automating-cloud-integration-openstack-to-taikun-made-easy) page.


!!! Note
	The script is designed for advanced users who are familiar with OpenStack and Taikun CloudWorks and wish to automate the migration process.
---

## **Taikun Python Client**

**TaikunPyClient** is the Python client for Taikun CloudWorks, designed to simplify interactions with the Taikun REST API.

- **Features**
    - Easy authentication via API token
    - Manage projects, users, clouds, policies, and more
    - Automate cloud operations with Python scripts
    - Useful for CI/CD, infrastructure automation, and reporting

[**Github repository**](https://github.com/taikun-cloud/taikunpyclient)
