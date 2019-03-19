module.exports = RED => {
    function setConfiguration(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        flow.configuration = flow.configuration || {};
        this.on('input', msg => {
            this.value = config.value || msg.payload;

            if (!flow.connected) {
                throw new Error('Connect device to platform!');
            }

            msg.payload = {
                topic: `configurations/current/${flow.device.key}`,
                payload: this.value
            }
            msg.complete = true;

            flow.configuration = this.value;

            this.send(msg);

        })
    }
    RED.nodes.registerType('setConfiguration', setConfiguration);
}