module.exports = RED => {
    function addSensorReading(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        this.reference = config.reference;
        this.on('input', msg => {
            msg.payload = { 
                reference: this.reference,
                value: msg.payload
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType('addSensorReading', addSensorReading);
}