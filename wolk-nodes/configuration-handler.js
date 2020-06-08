module.exports = RED => {
    function configurationHandler(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.configurationReferences = config.configurationReferences ? config.configurationReferences.split(';') : [];
        this.configurationValues = config.configurationValues ? config.configurationValues.split(';') : [];
        this.configuration = {};
        this.on('input', msg => {
            if (config.configurationValues) {
                for (let i = 0; i < this.configurationReferences.length; i++) {
                    this.configuration[`${this.configurationReferences[i]}`] = this.configurationValues[i];
                }
            }

            this.value = config.returnValue ?
                msg.payload.values :
                { values: this.configuration };

            if (flow.connected) {
                msg.payload = {
                    reference: 'config',
                    type: 'configuration',
                    topic: `d2p/configuration_get/d/${flow.device.key}`,
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