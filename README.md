WolkAbout Node-RED nodes module for connecting devices to [WolkAbout IoT Platform](https://demo.wolkabout.com/).

Supported device communication protocol(s):
* JsonSingleReferenceProtocol

## Prerequisites

* NodeJS ^10.15.13
* npm ^6.4.1
* Node-RED ^0.19.5

NodeJs and npm can be installed either by installing [binaries](https://nodejs.org/en/download/) or you can install using a [system's package manager](https://nodejs.org/en/download/package-manager/).<br>
You can see the instructions for installing NodeRed [here](https://nodered.org/docs/getting-started/installation).

## Installation

Navigate to your Node-RED directory: ```$ cd ~/.node-red```.

Install using:

```sh
npm install node-red-contrib-wolkconnect
```

## Example Usage

### Establishing connection with WolkAbout IoT platform

Create a device on WolkAbout IoT platform by importing ```simple-example-template.json``` located in ```/examples/simple```.<br>
This template fits ```/examples/simple/wolkExample.js``` and demonstrates the sending of a temperature sensor reading.

Run Node-RED:

```sh
node-red
```

In browser, navigate to ```http://localhost:1880```.

Import ```simple-example-flow.json``` from ```/examples/simple/``` into Node-RED by copying its contents and using Node-RED's import from clipboard functionality, or drag the file onto the flow panel. 

Edit WolkAbout Demo server in ```mqtt``` node properties:

- Under *Connection* tab, use your device key for Client ID.
- If you want to connect securely, change port to 8883, check the *Enable secure (SSL/TLS) connection* checkbox, add new tls-config, and upload ```ca.pem``` certificate (located in ```examples``` folder) as CA Certificate.
- Under *Security* tab, use your device key for Username, and device password for Password fields.
- Under *Messages* tab paste your device key after ```lastwill/``` in the Topic field for both close, and disconnect messages.

Pass device key and password to the ```connect``` node.

Deploy the flow.

Connect to the platform by running the inject (timestamp) node connected to ```connect``` node.

The ```mqtt``` node connects to the broker automatically on each deploy, the ```connect``` and ```disconnect``` nodes are used to simulate devices connecting and disconnecting.

### Adding sensor readings

Add sensor reading by using ```addSensorReading``` node and passing it value and reference.<br>
```getRandomNumber``` node can be used to pass random values to ```addSensorReading```. It has to be provided with minimum and maximum reading values.<br>
If you are using ```getRandomNumber```, do not pass the value parameter to ```addSensorReading```.

### Data publish strategy

Stored sensor readings are pushed to WolkAbout IoT platform on demand by using the ```publish``` node.

### Using the flow

The flow used for ```simple-example-template.json``` looks like this:

* After configuring nodes, deploy them
* Run ```connect```
* Send a reading to the platform by running the inject node connected to ```getRandomNumber```

### Disconnecting from the platform

Use the ```disconnect``` node to stop the device's connection to the platform.
