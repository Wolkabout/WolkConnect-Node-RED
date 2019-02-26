module.exports = RED => {
    function addSensorReading(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        this.reference = config.reference;
        this.on('input', msg => {
            const outMsg = {payload: {
                reference: this.reference,
                value: 50}};
            this.send(outMsg);
        });
    }
    RED.nodes.registerType('Add Sensor Reading', addSensorReading);
}