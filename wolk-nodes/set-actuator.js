module.exports = RED => {
    function setActuator(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        const flow = context.flow;
        this.on('input', msg => {
            this.value = config.value || msg.payload;
            this.reference = config.reference;

            if (!flow.connected) {
                throw new Error('Connect device to platform!');
            }

            msg.payload = {
                reference: this.reference,
                topic: `actuators/status/${flow.device.key}/${this.reference}`,
                payload: {status: "READY", value: JSON.parse(this.value).value}
            }

            this.send(msg);
        });
    }
    RED.nodes.registerType('setActuator', setActuator);
}