module.exports = RED => {
    function actuationHandler(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        const flow = context.flow;
        this.reference = config.reference;
        this.returnValue = config.returnValue;
        this.msgComplete = config.msgComplete;
        this.on('input', msg => {
            this.value = config.value ? config.returnValue : msg.payload;

            if (!flow.connected) {
                throw new Error('Please connect device to platform');
            } else {
                msg.payload = {
                    type: 'actuator',
                    reference: this.reference,
                    topic: `actuators/status/${flow.device.key}/${this.reference}`,
                    payload: [{status: "READY", value: this.returnValue ? this.value.value : this.value}]
                }
    
                if (this.msgComplete) {
                    msg.complete = this.msgComplete;
                }
    
                this.send(msg);
            }
        });
    }
    RED.nodes.registerType('actuationHandler', actuationHandler);
}