# **Showback rules**
:fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

Showback rules in Taikun are used to track and report the usage of cloud resources by individual users or departments within an organization. The primary purpose of the Showback Rules is to provide visibility into the costs associated with using Cloud resources and promote accountability for resource usage.

![Showback Rules](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/showback%20rules/showback_rules.webp)
/// caption 
Showback Rules
///

Every Showback Rule is described by *ID*, *Name*, *Metric Name*, *Organization*, *Labels* (if any), Kind, Type, Global alert limit, Project alert limit, Price, Showback credentials (if any), date and time *Created*, and *Actions*.

---

## **Create Showback Rule**

Create a new Showback Rule for your Organization by pressing the “*+ Add rule*” button.

![Add Showback Rule](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/showback%20rules/add_showback_rule.webp)
/// caption 
Add Showback Rule
///

Specify the following parameters:

### Name
Choose a name for your rule.

### Metric Name
Use any valid Prometheus metrics.

### Kind
Choose kind for the rule:

- **General** – data source is Taikun
- **External** – data source is external – you need to make sure correct Showback Credentials are used

### Type
Choose from:

- **Count** (calculate package as a unit – e.g., flavors)
- **Sum** (calculate per quantity – e.g., GBs)

### Price
Billing in CZK per selected unit.

### Project Alert Limit
Set a limit of alerts for one Project.

### Global Alert Limit
Set limit of alerts for all Projects.

### Showback Credentials
Specify the to-be-used Showback Credentials.

### Labels
The label indicates the variable name (Label) and value of the label (Value).

!!! Note
	Once you add the rule, the cron job starts the calculation. The price for Showback Summary starts at the beginning of every hour and it can’t be paused. Rule can be stopped by deletion.

---

## **Available Actions**

### Edit Showback Rule
Change the parameters of your rule.

### Copy Showback Rule
Create a copy of your rule (don’t forget to change the rule’s name).

### Delete Rule
Delete a rule if it is not used anymore.
