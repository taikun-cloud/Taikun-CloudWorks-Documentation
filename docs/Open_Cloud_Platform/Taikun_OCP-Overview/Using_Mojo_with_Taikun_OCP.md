# **Using Mojo with Taikun OCP**

## **Available Bundles**

The following OS Bundles are available from Metify. Input the values from this table into the `./mojo-manage --os-image` command. OS Bundles are organized by `name` and `version`. The combination of these two fields is unique within the Mojo Platform.

| Name   | Version  | Architecture |
| ------ | -------- | ------------ |
| Ubuntu | 22.04.03 | x64          |
| RHEL   | 8.8-net  | x64          |
| RHEL   | 9.2-net  | x64          |

---

## **Redfish API Overview**

RackHD is designed to provide a REST (Representational state transfer) architecture to provide a RESTful API. RackHD currently has two RESTful interfaces: a Redfish API and native REST API 2.0.

The Redfish API is compliant with the Redfish specification as an additional REST API. It provides a common data model for representing bare metal hardware, as an aggregate for multiple backend servers and systems.

The REST API 2.0 provides unique features that are not provided in the Redfish API.

### Redfish API Example

**Redfish API – Chassis**

List the Chassis that is managed by RackHD (equivalent to the enclosure node in REST API 2.0), by running the following command.curl 127.0.0.1:9090/redfish/v1/Chassis| jq ‘.’

```json
{
  "@odata.context": "/redfish/v1/$metadata#Systems",
  "@odata.id": "/redfish/v1/Chassis",
  "@odata.type": "#ChassisCollection.ChassisCollection",
  "Oem": {},
  "Name": "Chassis Collection",
  "Members@odata.count": 1,
  "Members": [
    {
      "@odata.id": "/redfish/v1/Chassis/58df2a1b83d44813084b45f9"
    }
  ]
}
```

**Redfish API – System**

1. In the rackhd-server, list the System that is managed by RackHD (equivalent to compute node in API 2.0), by running the following command

curl 127.0.0.1:9090/redfish/v1/Systems| jq ‘.’

1. Use the mouse to select the **System-ID** as below example, then the ID will be in your clipboard. This ID will be used in the following steps.

```json
{
  "@odata.context": "/redfish/v1/$metadata#Systems",
  "@odata.id": "/redfish/v1/Systems",
  "@odata.type": "#ComputerSystemCollection.ComputerSystemCollection",
  "Oem": {},
  "Name": "Computer System Collection",
  "Members@odata.count": 1,
  "Members": [
    {
      "@odata.id": "/redfish/v1/Systems/58df293a65b2761908e6b78c"
    }
  ]
}
```

**Redfish API – SEL Log**curl 127.0.0.1:9090/redfish/v1/systems/\<System-ID>/LogServices/Sel| jq ‘.’

```json
{
  "@odata.context": "/redfish/v1/$metadata#Systems/Links/Members/58df293a65b2761908e6b78d/LogServices/Members/@entity",
  "@odata.id": "/redfish/v1/systems/58df293a65b2761908e6b78d/LogServices/Sel",
  "@odata.type": "#LogService.1.0.0.LogService",
  "Oem": {},
  "Id": "SEL",
  "Description": "IPMI System Event Log",
  "Name": "ipmi-sel-information",
  "ServiceEnabled": true,
  "MaxNumberOfRecords": 0,
  "OverWritePolicy": "WrapsWhenFull",
  "DateTimeLocalOffset": "+00:00",
  "Actions": {
    "Oem": {},
    "#LogService.ClearLog": {
      "target": "/api/current/node/58df293a65b2761908e6b78d/workflows?name=Graph.ClearSEL.Node"
    }
  },
  "Status": {},
  "Entries": {
    "@odata.id": "/redfish/v1/systems/58df293a65b2761908e6b78d/LogServices/Sel/Entries"
  }
}
```

**Redfish API – CPU info**curl 127.0.0.1:9090/redfish/v1/Systems/\<System-ID>/Processors/0| jq ‘.’

```json
{
  "@odata.context": "/redfish/v1/$metadata#Systems/Links/Members/58df293a65b2761908e6b78d/Processors/Members/@entity",
  "@odata.id": "/redfish/v1/systems/58df293a65b2761908e6b78d/Processors/0",
  "@odata.type": "#Processor.1.0.0.Processor",
  "Oem": {},
  "Id": "0",
  "Name": "",
  "Socket": "SOCKET 0",
  "ProcessorType": "CPU",
  "ProcessorArchitecture": "x86",
  "InstructionSet": "x86-64",
  "Manufacturer": "Intel",
  "Model": "Intel(R) Xeon(R) CPU E5-2650 v3 @ 2.30GHz",
  "MaxSpeedMHz": 2300,
  "TotalCores": 10,
  "TotalThreads": 20,
  "Status": {},
  "ProcessorId": {
    "VendorId": "GenuineIntel",
    "IdentificationRegisters": "F2 06 03 00 FF FB EB BF",
    "EffectiveFamily": "Xeon",
    "EffectiveModel": "Intel(R) Xeon(R) CPU E5-2650 v3 @ 2.30GHz",
    "Step": "",
    "MicrocodeInfo": ""
  }
}
```

**Redfish API – Helper**

Show the list of RackHD Redfish APIs’ by running the below command: curl 127.0.0.1:9090/redfish/v1| jq ‘.’

```json
{
  "@odata.context": "/redfish/v1/$metadata#ServiceRoot",
  "@odata.id": "/redfish/v1/",
  "@odata.type": "#ServiceRoot.1.0.0.ServiceRoot",
  "Oem": {},
  "Id": "",
  "Description": "",
  "Name": "Root Service",
  "RedfishVersion": "1.0.0",
  "UUID": "423c839f-1e57-4081-b0bb-ac59ed46267f",
  "Links": {
    "Oem": {},
    "Sessions": {}
  },
  "Systems": {
    "@odata.id": "/redfish/v1/Systems"
  },
  "Chassis": {
    "@odata.id": "/redfish/v1/Chassis"
  },
  "Managers": {
    "@odata.id": "/redfish/v1/Managers"
  },
  "Tasks": {
    "@odata.id": "/redfish/v1/TaskService"
  },
  "SessionService": {}
}
```

Full RedFish API documentation is available [here](https://developer.dell.com/apis/2978/versions/5.xx/docs).
