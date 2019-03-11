WolkAbout Node-RED nodes module for connecting devices to [WolkAbout IoT Platform](https://demo.wolkabout.com/).

Supported device communication protocol(s):
* JsonSingleReferenceProtocol

## Prerequisite

* NodeJS >= v10.15.13
* npm >= v6.4.1
* Node-RED >= v0.19.5

## Installation

Navigate to your Node-RED directory: ```~/.node-red```.

Install using:

```sh
npm install node-red-contrib-wolkconnect
```

## Example Usage

### Establishing connection with WolkAbout IoT platform

Create a device on WolkAbout IoT platform by importing ```simple-example-template.json``` located in ```/examples/simple``` .<br>
This template fits ```/examples/simple/wolkExample.js``` and demonstrates the sending of a temperature sensor reading.

Run Node-RED:

```sh
node-red
```

In browser, navigate to ```http://localhost:1880``` .

Import ```simple-example-flow.json``` from ```/examples/simple/``` into Node-RED by copying its contents and using Node-RED's import from clipboard functionality. 

Provide your device key and password to ```MQTT out``` and ```wolkconnect connect``` nodes.<br>
Use your device key for client ID, username.<br>
Use device password for password on ```MQTT out```.<br>
Lastwill messages topic uses the following pattern ```lastwill/{device_key}```, and the payload is ```Gone offline``` .<br>

Deploy the flow.

Connect to the platform by running the inject (timestamp) node connected to ```connect``` node.

### Adding sensor readings

Add sensor reading by using ```addSensorReading``` node and passing it value and reference.<br>
```getRandomNumber``` node can be used to pass random values to ```addSensorReading```. It has to be provided with minimum and maximum reading values.

### Data publish strategy

Stored sensor readings are pushed to WolkAbout IoT platform on demand by using the ```publish``` node.

### Disconnecting from the platform

Use the ```disconnect``` node to stop the device's connection to the platform.