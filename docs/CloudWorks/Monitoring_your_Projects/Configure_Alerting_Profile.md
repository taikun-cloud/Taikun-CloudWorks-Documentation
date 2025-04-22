# **Configure Alerting Profiles**
:fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

Taikun is designed to inform you of any issues or events in your Kubernetes clusters. If something goes wrong with one of your Projects, our tool can send notifications to any email address, webhook, or available integrations. Alerting Profiles can be added to your account’s new or existing Project.

---

## **Create Alerting Profile**

To configure alerts in your Projects follow these steps:

**First Step**
Navigate to the “Alerting Profiles” menu.

**Second Step**
Hit the “Add Alerting Profile” button and

- Specify a **Name** of your configuration
- Select the **periodicity of notification** (HalfHour/Hourly/Daily/None)
- Choose any of the connected **Slack profiles** (optional)

![Add Alerting Profile](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/configure%20alerting%20profile/add_alerting_profile.webp)
/// caption
Add Alerting Profile
///

!!! Info
	Our list of available integrations includes OpsGenie, Pagerduty, Splunk, and Microsoft Teams.

---

## **Attach Alerting Profile to your Project**

To finalize the setup, you should add the newly-created Alerting Profile to your Project. This can be done during Project creation or directly within an existing Project.

### Add Profile during Project Creation

Whenever you [**create a new Project**](https://docs.taikun.cloud/CloudWorks/Managing_your_Projects/Create_a_Project/), you can specify an already created Alerting Profile in the setup menu:

![Add Alerting Profile in the setup menu](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/configure%20alerting%20profile/alertingprofile.2.webp)
/// caption 
Add alerting Profile in the setup menu
///

### Add Profile to existing Project

Alternatively, you can attach your Alerting Profile within existing Projects:

![Add Alerting Profile in Settings](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/configure%20alerting%20profile/enable_alert.webp)
/// caption 
Add Alerting Profile in Settings 
///

**[Prometheus](https://prometheus.io/):** With that, Taikun will send all notifications from Prometheus to the tool of your choice. You can click the link to learn more about Prometheus.
