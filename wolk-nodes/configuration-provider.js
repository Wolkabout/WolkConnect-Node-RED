module.exports = RED => {
    function configurationProvider(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        flow.configurationReferences = config.configurationReferences.split(';');
        flow.configurationValues = config.configurationValues.split(';');
        flow.configuration = flow.configuration ? flow.configuration : {};
        this.on('input', msg => {
            const actuatorMsgComplete = msg.msgComplete;

            if (flow.configurationReferences) {
                for (let i = 0; i < flow.configurationReferences.length; i++) {
                    flow.configuration[`${flow.configurationReferences[i]}`] = flow.configurationValues[i];
                }
            }
            msg.payload = {
                reference: 'config',
                type: 'configuration',
                topic: `configurations/current/${flow.device.key}`,
                payload: [{values: flow.configuration}]
            }

            if (config.msgComplete) {
                msg.complete = config.msgComplete;
            }

            if (actuatorMsgComplete){
                this.send(msg);
            }
        })
    }
    RED.nodes.registerType('configurationProvider', configurationProvider);
}