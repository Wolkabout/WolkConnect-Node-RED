module.exports = RED => {
    function addSensorReading(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        const flow = context.flow;
        this.on('input', msg => {
            this.value = config.value || msg.payload;
            this.reference = config.reference;

            if (flow.connected) {
                msg.payload = {
                    reference: this.reference,
                    topic: `readings/${flow.device.key}/${this.reference}`,
                    payload: this.reference === 'ACL' ? [{data: `${this.value},${this.value},${this.value}`}] : [{data: this.value}]
                }
    
                this.send(msg);
            }
        });
    }
    RED.nodes.registerType('addSensorReading', addSensorReading);
}