module.exports = RED => {
    function configurationProvider(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        flow.configurationReferences = config.configurationReferences.split(';');
        flow.configurationValues = config.configurationValues.split(';');
        flow.configuration = flow.configuration ? flow.configuration : {};
        this.msgComplete = config.msgComplete;
        this.on('input', msg => {
            setTimeout(() => {
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
    
                if (this.msgComplete) {
                    msg.complete = this.msgComplete;
                }
    
                this.send(msg);
            }, 1000)
        })
    }
    RED.nodes.registerType('configurationProvider', configurationProvider);
}