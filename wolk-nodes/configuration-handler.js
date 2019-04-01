module.exports = RED => {
    function configurationHandler(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        flow.configuration = flow.configuration ? flow.configuration : {};
        this.on('input', msg => {
            this.value = config.value ? config.value : msg.payload.values;

            if (flow.connected) {
                msg.payload = {
                    reference: 'config',
                    type: 'configuration',
                    topic: `configurations/current/${flow.device.key}`,
                    payload: [this.value]
                }
    
                if (config.msgComplete) {
                    msg.complete = config.msgComplete;
                }
    
                this.send(msg);
            }
        })
    }
    RED.nodes.registerType('configurationHandler', configurationHandler);
}