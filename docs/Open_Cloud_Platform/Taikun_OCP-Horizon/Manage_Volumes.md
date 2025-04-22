# **Manage Volumes**

Volumes are the Block Storage devices that you attach to instances to enable persistent storage. Users can attach a volume to a running instance or detach a volume and attach it to another instance at any time. For information about using the dashboard to create and manage volumes as an end user, see the [OpenStack End User Guide](https://docs.openstack.org/horizon/zed/user/manage-volumes.html).

As an administrative user, you can manage volumes and volume types for users in various projects. You can create and delete volume types, and you can view and delete volumes. Note that a volume can be encrypted by using the steps outlined below.

---

## **Create a volume type**

1. Log in to the dashboard and select the admin project from the drop-down list.

2. On the Admin tab, open the Volume tab.

3. Click the Volume Types tab, and click Create Volume Type button. In the Create Volume Type window, enter a name for the volume type.

4. Click Create Volume Type button to confirm your changes.

!!! Note
	A message indicates whether the action succeeded.

---

## **Create an encrypted volume type**

1. Create a volume type using the steps above for [Create a volume type](https://docs.openstack.org/horizon/zed/admin/manage-volumes.html#create-a-volume-type).

2. Click Create Encryption in the Actions column of the newly created volume type.

3. Configure the encrypted volume by setting the parameters below from available options (see table):

Provider

* Specifies the encryption provider format.

Control Location

* Specifies whether the encryption is from the front end (nova) or the back end   (cinder).

Cipher

* Specifies the encryption algorithm.

Key Size (bits)

* Specifies the encryption key size.

1. Click Create Volume Type Encryption.

### Encryption Options

The table below provides a few alternatives available for creating encrypted volumes.

| Encryption Parameters | Parameter Options                                       | Comments                                                                                                                                                                                                                           |
| --------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Provider**          | luks (Recommended)                                      | Allows easier import and migration of imported encrypted volumes, and allows access key to be changed without re-encrypting the volume                                                                                             |
|                       | plain                                                   | Less disk overhead than LUKS                                                                                                                                                                                                       |
| **Control Location**  | front-end (Recommended)                                 | The encryption occurs within nova so that the data transmitted over the network is encrypted                                                                                                                                       |
|                       | back-end                                                | This could be selected if a cinder plug-in supporting an encrypted back-end block storage device becomes available in the future. TLS or other network encryption would also be needed to protect data as it traverses the network |
| **Cipher**            | aes-xts-plain64 (Recommended)                           | See NIST reference below to see advantages\*                                                                                                                                                                                       |
|                       | aes-cbc-essiv                                           | Note: On the command line, type `cryptsetup benchmark` for additional options                                                                                                                                                      |
| **Key Size (bits)**   | 256 (Recommended for aes-xts-plain64 and aes-cbc-essiv) | Using this selection for aes-xts, the underlying key size would only be 128-bits\*                                                                                                                                                 |

\* Source [NIST SP 800-38E](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38e.pdf)

!!! Note
	To see further information and CLI instructions, see [Create an encrypted volume type](https://docs.openstack.org/cinder/latest/configuration/block-storage/volume-encryption.html#create-an-encrypted-volume-type) in the OpenStack Block Storage Configuration Guide.

---

## **Delete volume types**

When you delete a volume type, volumes of that type are not deleted.

1. Log in to the dashboard and select the admin project from the drop-down list.

2. On the Admin tab, open the Volume tab.

3. Click the Volume Types tab, select the volume type or types that you want to delete.

4. Click Delete Volume Types button.

5. In the Confirm Delete Volume Types window, click the Delete Volume Types button to confirm the action.

!!! Note
	A message indicates whether the action succeeded.

---

## **Delete volumes**

When you delete an instance, the data of its attached volumes is not destroyed.

1. Log in to the dashboard and select the admin project from the drop-down list.

2. On the Admin tab, open the Volume tab.

3. Click the Volumes tab, Select the volume or volumes that you want to delete.

4. Click Delete Volumes button.

5. In the Confirm Delete Volumes window, click the Delete Volumes button to confirm the action.

!!! Note
	A message indicates whether the action succeeded.
