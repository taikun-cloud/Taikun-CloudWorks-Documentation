# **My Profile Management**
**:fontawesome-regular-user: User** | **:fontawesome-solid-user-tie: Manager** | **:fontawesome-regular-handshake: Partner**

## **Access My Profile**

To access the **My Profile** menu, click on your profile in the top-right corner of Taikun CloudWorks. Here you can:

---

### **Profile Options**

- **Profile Information**
  View information about your profile such as your user name, organization, email, and role.

- **Change Settings**
  Change your profile password and email address.

- **Enable or Disable Features**
  Enable or disable email notifications and demo mode.

---

## **Profile Views**

![My Profile View](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/account-management/my%20profile/profile.11.webp)
/// caption
My Profile view
///

![Settings View](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/account-management/my%20profile/profile.2.webp)
/// caption
Settings view
///

---

## **Partner View**

**:fontawesome-regular-handshake: Partners** can view information about their **Partner Organization**. Additionally, they can apply custom logos and backgrounds.

### **Partner Options**

- **Profile Information**
  To view your profile information, including your user name, organization, email, and role, click your user name in the top-right corner.

- **Change Settings**
  To change your profile password and email address, go to the “Security” section in your account settings. Enter your current password and your new password or email address to make updates.

- **Enable or Disable Features**
  To enable or disable email notifications and demo mode, visit the “Notifications” section in your account settings. Use the toggle switches to adjust the settings.

- **Partner Access**
  If you have Partner access, you can view your partner organization information in the “Partner Organization” section of your account settings. Here, you can customize your organization’s logo and background.

---

## **Two-Factor Authentication (2FA) in Taikun CloudWorks**

## **What is 2FA?**

Two-Factor Authentication (2FA) adds an extra layer of security to your account. When enabled, you’ll need to enter a time sensitive 6-digit code (TOTP) from an authenticator app (like Google Authenticator or Authy) along with your password during login.

---

## **Enabling or Disabling 2FA**

### **How to Enable 2FA:**

1. Go to **Your Profile > Security Settings**.
2. Click **Enable 2FA**.
3. Scan the QR code using an authenticator app supporting TOTP.
4. Enter the 6-digit code shown in your app to confirm setup.
5. The system will generate **five backup codes** – save them somewhere safe!

### **How to Disable 2FA:**

* Enter a valid 6-digit code or one of your backup codes.

!!! Note
	If your organization **enforces 2FA**, you **cannot disable it**.

---

## **Login with 2FA**

If 2FA is enabled:

1. Enter your username and password.
2. Enter your 6-digit code from the authenticator app.

If you’ve lost access to your app:

* Use a **backup code** instead.
* If 2FA is not mandatory, using a backup code will **disable 2FA**.
* If 2FA **is mandatory**, you can **set it up again immediately**.

### **Failed Login Attempts:**

* After **two wrong attempts**, the counter resets after 1 hour.
* After **three wrong 2FA codes**, your account is **blocked**.
* If blocked, contact **Taikun CloudWorks support**.

---

## **Organization-Wide 2FA Enforcement**

### **For Organization Owners:**

You can require all users to have 2FA enabled.

### **To enforce 2FA:**

* Go to **Organization Settings**.
* Enable **"Enforce 2FA for all users"**.
* You must have 2FA enabled yourself.
* Only **owners** can change this setting.

### **What happens next:**

* Existing users will be required to set up 2FA at their next login.
* New users will need to set it up when they log in for the first time.
* Users cannot turn 2FA off while this is active.

---

## **Mandatory 2FA Experience for Users**

If 2FA is enforced and you don’t have it set up:

* After logging in, you’ll be taken to a setup screen.
* You must complete the 2FA setup to continue using Taikun.
* You cannot skip or access other app parts until it’s done.

---

## **Viewing 2FA Status (For Managers and Partners)**

In the **User List** page:

* A new column shows whether each user has 2FA enabled (Yes/No).
* This is visible only to users with the **:fontawesome-solid-user-tie: Manager** role or higher.

---

## **Resetting 2FA (For Partners)**

If a user cannot access their 2FA and needs help:

* A **:fontawesome-regular-handshake: Partner** can request a **2FA reset**.
* This removes the user’s current 2FA settings.
* The user will be prompted to set up 2FA again the next time they log in.
