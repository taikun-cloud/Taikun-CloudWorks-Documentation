# **Terraform Provider for Taikun**
:fontawesome-regular-user: User | :fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

!!! Tip "Useful Information"

	- [Website](https://www.terraform.io)
	- [Forum](https://discuss.hashicorp.com)
	- [Gitter chat](https://gitter.im/hashicorp-terraform/Lobby)
	- Mailing list: [Google Groups](http://groups.google.com/group/terraform-tool)

---

## **Using the provider**

### Requirements
-	[Terraform](https://www.terraform.io/downloads.html) >= 0.14.x

### QuickStart templates
Quickstart templates for creating VMs, K8s, Applications, Virtual clusters and more
are available in this repository at path [examples/quickstart-templates](https://github.com/itera-io/terraform-provider-taikun/tree/dev/examples/quickstart-templates)

### Documentation
The provider's documentation is available on the [Terraform registry](https://registry.terraform.io/providers/itera-io/taikun/latest/docs).
See the section titled *USE PROVIDER* to start using it.

---

## **Developing the provider**

### Requirements

-	[Terraform](https://www.terraform.io/downloads.html) >= 0.14.x
-	[Go](https://golang.org/doc/install) >= 1.19

---

## **Building and installing the provider**

### Building the provider locally
If you have the Go toolchain installed on your machine, you can build and install the provider with the following command.

`make install`

Otherwise, you can build the provider in a docker container.

`make dockerinstall`

### Documenting the provider

We use [tfplugindocs](https://github.com/hashicorp/terraform-plugin-docs) to generate documentation for the provider.

To generate or update documentation, run `go generate` locally or run the [generate documentation](https://github.com/itera-io/terraform-provider-taikun/actions/workflows/generate_documentation.yml) workflow with your target branch as an input.

This reads the templates in the [templates](https://github.com/itera-io/terraform-provider-taikun/tree/dev/templates) directory, the Terraform configuration examples in the [examples](https://github.com/itera-io/terraform-provider-taikun/tree/dev/examples) directory and finally the resource (or data source) schemas themselves to generate the documentation in the [docs](https://github.com/itera-io/terraform-provider-taikun/tree/dev/docs) directory.

In other words, suppose you are creating a new resource `taikun_project`, you would need to add the following files before running `go generate`.
- A Terraform configuration example in `./examples/resources/taikun_project/resource.tf`
- A terraform import script in `./examples/resources/taikun_project/import.sh` (this is usually just `terraform import <resource type>.<name> <id>`)
- A template in `templates/resources/project.md.tmpl`

As mentioned previously, the documentation of provider releases is available on the [Terraform registry](https://registry.terraform.io/providers/itera-io/taikun/latest/docs).

The [Doc Preview Tool](https://registry.terraform.io/tools/doc-preview) by Hashicorp is also a useful way to preview the final look of the documentation.

### Running the locally built provider
To tell Terraform to retrieve the provider locally instead of fetching it from the registry, use the following terraform configuration block.

```tf
terraform {
  required_providers {
    taikun = {
      source  = "itera-io/dev/taikun"
    }
  }
}
```
