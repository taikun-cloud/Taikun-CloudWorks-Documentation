# **Create and Manage Node Pools in Taikun OCP Baremetal**

## **Pool Management**

To work with Pools in Taikun OCP Baremetal, a few facts need to be understood:

* A *Node* is a resource that Taikun OCP Baremetal can manage, it could be a server, a switch, a PDU, etc.

* A *Node* in Taikun OCP Baremetal can belong to a single *Pool*

* A *Pool* is a logical group of *Nodes* that have the same user permissions applied to them

* A *Group* is a collection of *Users* and *Roles*

* A single *Group* is assigned to each *Pool* to control permissions on its *Nodes.*“Supermicro Users” group&#x20;

By default, Taikun OCP Baremetal comes with a **Default** Pool and a **Default** group. *Users* who are members of the **Default** group have access to all Nodes in the **Default** Pool. On small Taikun OCP Baremetal installs with only a single active user, the **Default** *Group* and the **Default** *Pool* can be used for everything. In larger deployments with different user permission requirements, the *Groups* and *Pools* should be constructed to meet said requirements.

---

## **Create a Node Management Pool**

In this use case, we will create a new *Pool* for just one of our *Nodes* so a specific user group can manage the *Node*. This is a common use case for Taikun OCP Baremetal, where a specific *Group* of *Users* needs to be able to manage a specific set of *Nodes*.

### Create User

Create a new user called “supermicro”. Under “Administration” in the left navigation, select “Users” and then click the blue “Add user” button on the right side of the screen. Fill out the form and click “Save”.

![Create a user](https://support.metify.io/uploads/default/original/1X/101a369f4d469e948038e00483503035722218a2.gif)
/// caption
Create a user
///

### Create Group

Create a “Supermicro Users” group for all users that can manage Supermicro servers. Under “Administration” in the left navigation, select “Groups” and then click the blue “Add group” button on the right side of the screen. Enter the *Group* information and press the “Create group” button.

![Create a group](https://support.metify.io/uploads/default/original/1X/889d1cc471555c49caf92f2d6d3dabb2d3d4dce2.gif)
/// caption 
Createa a group
///

Add the “supermicro” user to the “Supermicro Users” group as someone who can do everything. In Taikun OCP Baremetal this is called the “AllInOne” role. Under “Administration” in the left navigation, select “Groups”,
then click on the “Supermicro Users” row. Click “Add user to group” in the top right and choose the “supermicro” user and the “AllInOne” role.

![Add user to the group](https://support.metify.io/uploads/default/original/1X/172e9335c6397e3534fa82cf3ca7884831fe93a2.gif)
/// caption 
Add user to the group 
///

### Create Pool

Create a *Pool* called “Supermicro Pool” and assign the “supermicro” group to the *Pool*. Under “Management” in the left navigation, select “Pools” and then click the blue “Create pool” button on the right side of the screen. Enter the *Pool* information and press the “Create pool” button.

![create a pool](https://support.metify.io/uploads/default/original/1X/c383b44516c10e80f04621ced565b15f5908833b.gif)
/// caption 
Create a pool
///

### Add Node to Pool

There are many wants to add a *Node* to a *Pool*. **You only need to perform one of the following methods to add a *Node* to a *Pool*.**

#### Pool Detail Page

You can do so from the Pool detail page by clicking on an individual pool in the Pool list.

![pool detail page](https://support.metify.io/uploads/default/original/1X/3da4a085d3d1d992e7c37b5590f65a0a1d5c0e5f.gif)
/// caption 
Pool detail page
///

#### Server Detail Page

A Server can also be added to the pool directly on its detail page. Click on the Server in the server table and then the blue “Assign to pool” button on the right side of the page. This will open a modal window where you can select the pool to assign the server to.

![server detail page](https://support.metify.io/uploads/default/original/1X/6616960c09f97a0be5c061613a958c895e7e40d4.gif)
/// caption
Server detail page
///
