module.exports = RED => {
    function configurationProvider(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        flow.configurationReferences = config.configurationReferences.split(';') || [];
        flow.configurationValues = config.configurationValues.split(';') || [];
        flow.configuration = flow.configuration || {};
        this.on('input', msg => {

            if (flow.configurationReferences) {
                for (let i = 0; i < flow.configurationReferences.length; i++) {
                    flow.configuration[`${flow.configurationReferences[i]}`] = flow.configurationValues[i];
                }
            }
            msg.topic = `configurations/current/${flow.device.key}`;
            msg.payload = JSON.stringify({values: flow.configuration});
            msg.retain = false;
            msg.qos = 1;
            this.send(msg);

        })
    }
    RED.nodes.registerType('configurationProvider', configurationProvider);
}