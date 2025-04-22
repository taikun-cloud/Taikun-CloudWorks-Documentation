# **Taikun CLI**
:fontawesome-regular-user: User | :fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

You can manage Taikun’s resources directly from the command line.

## **Steps to Install**

1. **Step**
   To download the CLI, head to [the latest release page](https://github.com/itera-io/taikun-cli/releases/tag/v3.4.1).

2. **Step**
   Scroll down to the **Assets** section and select the binary for your architecture.

3. **Step**
   Use the following command to move the binary: `sudo cp taikun /usr/local/bin/`

Signing in to Taikun The TAikun CLI reads environment variables to authenticate to Taikun.

**To authenticate with your Taikun account:**

- set the following [environment variables](https://www.freecodecamp.org/news/how-to-set-an-environment-variable-in-linux/).

```
TAIKUN_EMAIL
TAIKUN_PASSWORD
```

- To authenticate with Keycloak, set the following environment variables:

```
TAIKUN_KEYCLOAK_EMAIL
AIKUN_KEYCLOAK_PASSWORD
```

- The default API host is api.taikun.cloud. To override it, set the following environment variable:

```
TAIKUN_API_HOST (default value is: api.taikun.cloud)
```

- Run the following command to check whether you are properly authenticated:

```
taikun whoami
```

---

## **Configure Autocompletion**

Autocompletion is available for the following shells:

* Bash
* Zsh
* Fish
* PowerShell

The command `taikun completion` generates an autocompletion script for the specified shell. For instructions on how to use the generated script, see the help command of the corresponding shell.

For example, `taikun completion bash -h` provides instructions on how to set up autocompletion for the Bash shell.

---

## **Command overview**

To overview all the commands available, see the [generated command tree](https://github.com/itera-io/taikun-cli/blob/dev/COMMAND_TREE.md).

---

## **CLI Help**

To get information on how to use a command, type:

**Long command**

`taikun [command] --help`

**Short command**

`taikun [command] -h`
