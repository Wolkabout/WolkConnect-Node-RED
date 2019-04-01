module.exports = RED => {
    function actuationHandler(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.on('input', msg => {
            this.value = config.returnValue ?
                msg.payload.value :
                config.value ?
                    config.value :
                    msg.payload;

            if (!flow.connected) {
                throw new Error('Please connect device to platform');
            } else {
                msg.payload = {
                    type: 'actuator',
                    reference: config.reference,
                    topic: `actuators/status/${flow.device.key}/${config.reference}`,
                    payload: [{status: "READY", value: this.value}]
                }
    
                if (config.msgComplete) {
                    msg.complete = config.msgComplete;
                }
    
                this.send(msg);
            }
        });
    }
    RED.nodes.registerType('actuationHandler', actuationHandler);
}