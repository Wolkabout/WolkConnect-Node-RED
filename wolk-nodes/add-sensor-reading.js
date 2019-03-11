module.exports = RED => {
    function addSensorReading(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        const flow = context.flow;
        this.on('input', msg => {
            this.value = config.value || msg.payload;
            this.reference = config.reference;

            if (!flow.connected) {
                throw new Error('Connect device to platform!');
            }

            msg.reference = this.reference;
            msg.topic = `readings/${flow.device.key}/${this.reference}`;
            msg.payload = `{"data": "${this.value}"}`;

            flow.outboundMessages.length > 0 
                ? flow.outboundMessages.forEach(cur => cur.reference === msg.reference 
                    ? msg 
                    : cur
                )
                : flow.outboundMessages.push(msg);
            
            this.send(msg);
        });
    }
    RED.nodes.registerType('addSensorReading', addSensorReading);
}