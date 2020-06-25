module.exports = RED => {
    function configurationProvider(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.configurationReferences = config.configurationReferences ? config.configurationReferences.split(';') : [];
        this.configurationValues = config.configurationValues ? config.configurationValues.split(';') : [];
        if (this.configurationReferences.length != this.configurationValues.length) {
            throw new Error('There needs to be equal amount of references and values!');
        }

        this.configuration = {};
        this.on('input', function (msg, send, done) {
            const actuatorMsgComplete = msg.msgComplete;

            if (this.configurationReferences) {
                for (let i = 0; i < this.configurationReferences.length; i++) {
                    this.configuration[`${this.configurationReferences[i]}`] = this.configurationValues[i];
                }
            }

            msg.payload = {
                reference: 'config',
                type: 'configuration',
                topic: `d2p/configuration_get/d/${flow.device.key}`,
                payload: [{values: this.configuration}]
            };

            if (config.msgComplete) {
                msg.complete = config.msgComplete;
            }

            if (actuatorMsgComplete){
                send(msg);
            }
            
            done();
        });
    }
    RED.nodes.registerType('configurationProvider', configurationProvider);
}
