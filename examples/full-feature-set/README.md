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

Create a device on WolkAbout IoT platform by importing ```full-example-template.json``` located in ```/examples/full-feture-set``` .<br>

Run Node-RED:

```sh
node-red
```

In browser, navigate to ```http://localhost:1880``` .

Import ```full-example-flow.json``` from ```/examples/full-feature-set/``` into Node-RED by copying its contents and using Node-RED's import from clipboard functionality. 

Provide your device key and password to ```mqtt``` output and ```wolkconnect connect``` nodes.<br>
Use your device key for client ID, username.<br>
Use device password for password on ```mqtt``` output.<br>
Pass the device key to ```mqtt``` input nodes.<br>
Lastwill messages topic uses the following pattern ```lastwill/{device_key}```.<br>

Deploy the flow.

Connect to the platform by running the ```inject``` (timestamp) node connected to ```connect``` node.<br>
The ```connect``` node automatically calls ```actuatorStatusProvider``` and ```configurationProvider```  to publish actuator statues and configuration to the platform.<br>
Actuator references, configuration references and values need to be provided to respective nodes.<br>

Check the message complete checkbox on the last node connected to a single ```inject``` node.

### Adding sensor readings

Add sensor reading by using ```addSensorReading``` node and passing it value and reference.<br>
```getRandomNumber``` node can be used to pass random values to ```addSensorReading```. It has to be provided with minimum and maximum reading values.

Add a multi-value sensor reading by passing ```getRandomNumber``` readings amount parameter.

### Adding events

Add alarms by using ```addAlarm``` node. You can pass it a value and reference, or use ```getRandomNumber``` to generate random values.<br>
```getRandomNumber``` can return boolean if corresponding checkbox selected. You can also fine-tune threshold for detecting boolean values by using boolean true threshold parameter.

### Data publish strategy

Stored sensor readings are pushed to WolkAbout IoT platform on demand by using the ```publish``` node.

### Publishing actuator statuses

Use ```actuationHandler``` node to publish new actuator data to the platform, or return data when the platform changes it.<br>
It can also be used with ```getRandomNumber``` node with return boolean or numerical value.<br>
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

Data persistence can also be implemented by the user by using a ```function``` node.<br>

### Keep Alive Mechanism

WolkAbout Python Connector by default uses Keep Alive mechanism to notify WolkAbout IoT Platform that device is still connected.<br>
Keep alive message is sent to WolkAbout IoT Platform every 10 minutes.<br>

Disable it by removing ```keepAlive``` node. Change interval in the ```inject``` node settings.