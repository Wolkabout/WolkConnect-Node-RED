module.exports = RED => {
    function addSensorReading(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        const flow = context.flow;
        this.reference = config.reference;
        this.msgComplete = config.msgComplete;
        this.timestamp = config.timestamp;
        this.on('input', msg => {
            this.value = config.value ? config.value : msg.payload;
            
            if (!flow.connected) {
                throw new Error('Please connect device to platform');
            } else {
                msg.payload = {
                    type: 'sensor',
                    reference: this.reference,
                    topic: `readings/${flow.device.key}/${this.reference}`,
                    payload: this.timestamp ? [{utc: Date.now(), data: this.value.toString()}] : [{data: this.value.toString()}]
                }
                if (this.msgComplete) {
                    msg.complete = this.msgComplete;
                }
    
                this.send(msg);
            }
        });
    }
    RED.nodes.registerType('addSensorReading', addSensorReading);
}