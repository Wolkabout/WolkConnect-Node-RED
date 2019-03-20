module.exports = RED => {
    function setConfiguration(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        flow.configuration = flow.configuration || {};
        this.on('input', msg => {
            this.value = config.value || msg.payload.values;

            if (!flow.connected) {
                throw new Error('Connect device to platform!');
            }

            msg.payload = {
                reference: 'config',
                type: 'configuration',
                topic: `configurations/current/${flow.device.key}`,
                payload: [this.value]
            }
            msg.complete = true;

            flow.configuration = this.value;

            this.send(msg);

        })
    }
    RED.nodes.registerType('setConfiguration', setConfiguration);
}