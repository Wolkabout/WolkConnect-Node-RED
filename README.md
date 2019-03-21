WolkAbout Node-RED nodes module for connecting devices to [WolkAbout IoT Platform](https://demo.wolkabout.com/).

Supported device communication protocol(s):
* JsonSingleReferenceProtocol

## Prerequisite

* NodeJS ^10.15.13
* npm ^6.4.1
* Node-RED ^0.19.5

## Installation

Navigate to your Node-RED directory: ```~/.node-red```.

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

Import ```simple-example-flow.json``` from ```/examples/simple/``` into Node-RED by copying its contents and using Node-RED's import from clipboard functionality. 

On ```mqtt``` node configuration panel, edit the mqtt broker.<br>
Provide your device key and password to ```mqtt``` and ```connect``` nodes.<br>
Use your device key for client ID, username.<br>
Use device password for password on ```mqtt```.<br>
Lastwill messages topic uses the following pattern ```lastwill/{device_key}```.<br>

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
