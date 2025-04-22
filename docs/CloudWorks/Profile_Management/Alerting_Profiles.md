# **Alerting Profile**
:fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

Alerting Profiles allow you to receive notifications about the state of your Project using your preferred tool.

---

## **Adding an Alerting Profile**

To create a new Alerting Profile, click the **"Add Alerting Profile"** button.

![Add Alerting Profile](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/configure%20alerting%20profile/add_alerting_profile.webp)
/// caption 
Add Alerting Profile
///

---

## **Fill in the following fields**

### Organization  
Choose from the available Organizations in the drop-down list.

### Name  
Enter a name for your Alerting Profile.

### Slack Configuration  
If you have a pre-configured [**Slack integration**](https://docs.taikun.cloud/CloudWorks/Advanced_Configuration/Slack_Configuration/), you can apply it to this profile.

### Reminder  
Set a reminder interval: None, Half Hour, Hourly, or Daily.

### Additional Notification Methods  
- **E-mails** – Receive notifications via email.
- **Webhooks** – Use webhooks for application alerts.
- **Integrations** – Set notifications for supported applications (Opsgenie, PagerDuty, Splunk, Microsoft Teams).

---

## **Alerting Profile Details**

![Alerting Profiles](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/navigating-taikun/Profiles/alerting_profile.webp)
/// caption 
Alerting Profiles
///

**Each Alerting Profile includes:**

- ID
- Name
- Organization Name
- Slack Configuration Name
- Associated Projects
- E-mails
- Webhooks
- Created By
- Reminder Settings

You can modify the Profile by adding or updating E-mails and Webhooks. Additionally, multiple headers (Key, Value) can be added to each webhook. The table also provides details about the last modifications, including "Last Modified" and "Last Modified By."

---

## **Available Actions**

### Lock/Unlock  
Make the Profile available during Project selection (only non-default Profiles can be locked).

### Edit  
Modify the Profile’s name, Slack configuration, or Reminder settings.

### Delete  
Remove a Profile that is not in use (only Profiles without associated Projects can be deleted).

---

## **Attaching an Alerting Profile to a Project**

There are two ways to attach an Alerting Profile to a Project:

1. **During [Project Creation](https://docs.taikun.cloud/CloudWorks/Managing_your_Projects/Create_a_Project/)** – Check the **"Add Alerting Profile"** box while setting up the Project.
2. **After Project Creation** – Use the **Actions** drop-down menu in the Project, click **Attach Alerting Profile**, and select the desired Profile.

---

## **Detaching an Alerting Profile**

To detach an Alerting Profile from a Project, use the **Actions** drop-down menu, click **Detach Alerting Profile**, and select the Profile you want to remove.
