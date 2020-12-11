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
* WolkAbout Protocol

## Prerequisites

* NodeJS >= 12.18.0
* npm >= 6.14.4
* Node-RED 1.0.6

NodeJS and npm can be installed either by installing [binaries](https://nodejs.org/en/download/) or you can install using a [system's package manager](https://nodejs.org/en/download/package-manager/).<br>
You can see the instructions for installing Node-RED [here](https://nodered.org/docs/getting-started/installation).
Make sure to install the exact Node-RED version ```1.0.6``` by running ```sudo npm install -g --unsafe-perm node-red@1.0.6```.

## Installation

Open the system terminal, and run Node-RED using the command ```node-red``` so that Node-RED can set up its directory structure.
Once the process completes its initialisation, it is safe to terminate it. 

Navigate to your Node-RED directory: ```$ cd ~/.node-red```.

Install [Wolkconnect Node-RED](https://www.npmjs.com/package/@wolkabout/wolkconnect-node-red) using:

```sh
npm install @wolkabout/wolkconnect-node-red
```

## Example Usage

### Establishing connection with WolkAbout IoT platform

Create a device on WolkAbout IoT platform with Device type 'Simple example'<br>

Run Node-RED:

```sh
node-red
```

In browser, navigate to ```http://localhost:1880```.

Import [simple-example-flow.json](/examples/simple/simple-example-flow.json) into Node-RED by copying its contents and using Node-RED's import from clipboard functionality, or drag the file onto the flow panel. 

Double-click the ```mqtt``` node to enter edit mode. Edit the server input field by clicking the pen icon next to it (WolkAbout Demo server is already pre-selected):

- Under *Connection* tab, use your device key for Client ID.
- If you want to connect securely, change port to 8883, check the *Enable secure (SSL/TLS) connection* checkbox, add new tls-config, and upload ```ca.pem``` certificate (located in ```examples``` folder) as CA Certificate.
- Under *Security* tab, use your device key for Username, and device password for Password fields.
- Under *Messages* tab paste your device key after ```lastwill/``` in the Topic field for both close, and disconnect messages.

Edit the ```connect``` node by double-clicking it, and pass it device key and password.

Deploy the flow.

Connect to the platform by running the inject (timestamp) node connected to ```connect``` node.

The ```mqtt``` node connects to the broker automatically on each deploy, the ```connect``` and ```disconnect``` nodes are used to simulate devices connecting and disconnecting.

### Adding sensor readings

Add sensor reading by using ```addSensorReading``` node and passing it value and reference.<br>
```getRandomValue``` node can be used to pass random values to ```addSensorReading```. It has to be provided with minimum and maximum reading values.

### Data publish strategy

Stored sensor readings are pushed to WolkAbout IoT platform on demand by using the ```publish``` node.

### Using the flow

The flow used for ```simple-example.json``` looks like this:

* After configuring nodes, deploy them
* Run ```connect```
* Send a reading to the platform by running the inject node connected to ```getRandomNumber```

### Disconnecting from the platform

Use the ```disconnect``` node to stop the device's connection to the platform.
