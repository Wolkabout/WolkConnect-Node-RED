module.exports = RED => {
    function actuatorStatusProvider(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.actuatorReferences = config.actuatorReferences.split(';');
        this.actuatorValues = config.actuatorValues.split(';');
        this.on('input', function (msg, send, done) {
            if (this.actuatorReferences) {
                this.actuatorReferences.forEach((cur, ind) => {
                    let trimmed = cur.trim()
                    msg.payload = {
                        reference: `${trimmed}`,
                        type: 'actuator',
                        topic: `d2p/actuator_status/d/${flow.device.key}/r/${trimmed}`,
                        payload: [{status: "READY", value: this.actuatorValues[ind]}]
                    }

                    if (ind === (this.actuatorReferences.length - 1) && config.msgComplete) {
                        msg.msgComplete = config.msgComplete;
                    }
                    
                    send(JSON.parse(JSON.stringify(msg)));
                })
                done();
            }
        })
    }
    RED.nodes.registerType('actuatorStatusProvider', actuatorStatusProvider);
}