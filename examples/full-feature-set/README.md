```
██╗    ██╗ ██████╗ ██╗     ██╗  ██╗ ██████╗ ██████╗ ███╗   ██╗███╗   ██╗███████╗ ██████╗████████╗
██║    ██║██╔═══██╗██║     ██║ ██╔╝██╔════╝██╔═══██╗████╗  ██║████╗  ██║██╔════╝██╔════╝╚══██╔══╝
██║ █╗ ██║██║   ██║██║     █████╔╝ ██║     ██║   ██║██╔██╗ ██║██╔██╗ ██║█████╗  ██║        ██║   
██║███╗██║██║   ██║██║     ██╔═██╗ ██║     ██║   ██║██║╚██╗██║██║╚██╗██║██╔══╝  ██║        ██║   
╚███╔███╔╝╚██████╔╝███████╗██║  ██╗╚██████╗╚██████╔╝██║ ╚████║██║ ╚████║███████╗╚██████╗   ██║   
 ╚══╝╚══╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═══╝╚══════╝ ╚═════╝   ╚═╝   
                                  ███╗   ██╗ ██████╗ ██████╗ ███████╗    ██████╗ ███████╗██████╗ 
                                  ████╗  ██║██╔═══██╗██╔══██╗██╔════╝    ██╔══██╗██╔════╝██╔══██╗
                            █████╗██╔██╗ ██║██║   ██║██║  ██║█████╗█████╗██████╔╝█████╗  ██║  ██║
                            ╚════╝██║╚██╗██║██║   ██║██║  ██║██╔══╝╚════╝██╔══██╗██╔══╝  ██║  ██║
                                  ██║ ╚████║╚██████╔╝██████╔╝███████╗    ██║  ██║███████╗██████╔╝
                                  ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝  ╚═╝╚══════╝╚═════╝ 
```
--- 
WolkAbout Node-RED nodes module for connecting devices to [WolkAbout IoT Platform](https://demo.wolkabout.com/).

Supported device communication protocol(s):
* JsonSingleReferenceProtocol

## Prerequisites

* NodeJS ^10.15.13
* npm ^6.4.1
* Node-RED ^0.19.5

NodeJS and npm can be installed either by installing [binaries](https://nodejs.org/en/download/) or you can install using a [system's package manager](https://nodejs.org/en/download/package-manager/).<br>
You can see the instructions for installing Node-RED [here](https://nodered.org/docs/getting-started/installation).

## Installation

Navigate to your Node-RED directory: ```$ cd ~/.node-red```.

Install using:

```sh
npm install @wolkabout/wolkconnect-node-red
```

## Example Usage

### Establishing connection with WolkAbout IoT platform

Create a device on WolkAbout IoT platform by importing [full-example-template.json](/examples/full-feature-set/full-example-template.json).<br>

Run Node-RED:

```sh
node-red
```

In browser, navigate to ```http://localhost:1880```.

Create a device on WolkAbout IoT platform by importing [full-example-flow.json](/examples/full-feature-set/full-example-flow.json).

#### Configuring mqtt nodes

Edit WolkAbout Demo server in ```mqtt``` node properties by clicking the pen icon:

- Under *Connection* tab, use your device key for Client ID.
- If you want to connect securely, change port to 8883, check the *Enable secure (SSL/TLS) connection* checkbox, add new tls-config, and upload ```ca.pem``` certificate (located in ```examples``` folder) as CA Certificate.
- Under *Security* tab, use your device key for Username, and device password for Password fields.
- Under *Messages* tab paste your device key after ```lastwill/``` in the Topic field for both close, and disconnect messages.

```mqtt``` input nodes have to be passed separate topics for each node:

- Replace ```device-key``` string in topics with your device key (e.g. ```actuators/commands/insert-device-key/SW```).
- Select WolkAbout Demo server we have prevoiusly configured as the server for each ```mqtt``` input node.

Pass device key and password to the ```connect``` node.

Deploy the flow.

#### Connecting

Connect to the platform by running the ```inject``` (timestamp) node connected to the ```connect``` node.

The ```connect``` node automatically calls ```actuatorStatusProvider``` and ```configurationProvider```  to publish user-provided actuator statues and configuration to the platform.

### Adding sensor readings

Add sensor reading by using ```addSensorReading``` node and passing it value and reference.<br>
```getRandomValue``` node can be used to pass random values to ```addSensorReading```. It has to be provided with minimum and maximum reading values.

Add a multi-value sensor reading by passing ```getRandomValue``` readings amount value.

### Adding events

Add alarms by using ```addAlarm``` node. You can pass it a value and reference, or use ```getRandomValue``` to generate random values.<br>
```getRandomValue``` can return boolean if corresponding checkbox selected. You can also fine-tune threshold for detecting boolean values by using boolean true threshold parameter.

### Data publish strategy

Stored sensor readings are pushed to WolkAbout IoT platform on demand by using the ```publish``` node.

### Publishing actuator statuses

Use ```actuationHandler``` node to publish new actuator data to the platform, or return data when the platform changes it.<br>
It can also be used with ```getRandomValue``` node with return boolean or numerical value.<br>
Check return value chekbox when passing data back to the platform.

### Publishing configuration

Use ```configurationHandler``` node to pass the changed configuration back to the platform.<br>
Check return value chekbox when passing data back to the platform.

### Disconnecting from the platform

Use the ```disconnect``` node to stop the device's connection to the platform.

### Data persistence

WolkAbout Node_RED connector provides a mechanism for persisting data in situations where readings can not be sent to WolkAbout IoT platform.<br>

Persisted readings are sent to WolkAbout IoT platform once connection is established.<br>
Data persistence mechanism used **by default** stores data in-memory by using ```outboundMessageQueue``` node.<br>
Data can be persisted by attaching a ```json```, and ```file``` write nodes to ```outboundMessageQueue``` node, and passing the file location to the ```connect``` node. The data is stored in JSON format.<br>

Data persistence can also be implemented by the user by using a ```function``` node.<br>

### Keep Alive Mechanism

WolkAbout Python Connector by default uses Keep Alive mechanism to notify WolkAbout IoT Platform that device is still connected.<br>
Keep alive message is sent to WolkAbout IoT Platform every 10 minutes.<br>

Disable it by removing ```keepAlive``` node. Change interval in the ```inject``` node settings.