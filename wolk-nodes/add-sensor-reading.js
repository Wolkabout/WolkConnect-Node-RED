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

            msg.topic = `readings/${flow.device.key}/${this.reference}`;
            msg.payload = [{data: this.value}];
            msg.reference = this.reference;

            this.send(msg);
        });
    }
    RED.nodes.registerType('addSensorReading', addSensorReading);
}