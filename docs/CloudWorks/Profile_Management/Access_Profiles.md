# **Access Profiles**
:fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

!!! Note
	When using SSH to connect to the servers, **do not** use the user "ubuntu"; it is reserved for Taikun’s cluster management.

Access Profiles allow you to securely connect to your Bastion server.

![Access Profiles](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/navigating-taikun/Profiles/access_profile.webp)
/// caption
Access Profiles
///

The table can be extended to display the last modification details, including "Last Modified" and "Last Modified By."

---

## **Actions**

### Edit HTTP Proxy  
Update the access profile.

### Delete Access Profile  
Delete an Access Profile, but the default profile cannot be removed.

---

## **Adding an Access Profile**

Create a new Access Profile to access a specific project by clicking the **"Add Alerting Profile"** button.

![Add Access Profile](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/profile-management/access%20profile/add_access_profile.webp)
/// caption 
Add Access Profiles
///

Specify the following parameters:

- **Name:** Choose a name for the new profile (3-30 characters).
- **HTTP Proxy:** Set a proxy server to create a gateway between the cluster and the Internet, allowing access to external packages, Docker images, etc. This ensures security by preserving your own IP.

---

## **Additional Configuration Options**

### SSH Users  
Allow a user to access the Kubernetes API by adding a Public Key (supported key types: RSA, ECDSA, Ed25519).

### DNS  
Resolves alphabetic names to IP addresses. You can specify a DNS for your server.

### NTP Server  
Synchronizes local time clocks with a selected time server, ensuring all clusters operate in the same time zone.

### Allowed Hosts  
Define an IP address or range to restrict access to your Kubernetes environment.

!!! Note
	If your Public Key contains special characters (such as `:` or `+`), Taikun will fail to create the servers in Proxmox.

!!! Note
	DNS settings will be ignored if you choose to import network configurations when establishing Cloud Credentials.

If you need to update any of these parameters, you can use the **Show** button to modify the necessary fields.

