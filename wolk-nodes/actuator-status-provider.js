module.exports = RED => {
    function actuatorStatusProvider(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.actuatorReferences = config.actuatorReferences.split(';');
        this.on('input', msg => {
            if (this.actuatorReferences) {
                this.actuatorReferences.forEach((cur, ind) => {
                    let trimmed = cur.trim()
                    msg.payload = {
                        reference: `${trimmed}`,
                        type: 'actuator',
                        topic: `d2p/actuators_status/d/${flow.device.key}/r/${trimmed}`,
                        payload: [{status: "READY", value: ""}]
                    }

                    if (ind === (this.actuatorReferences.length - 1) && config.msgComplete) {
                        msg.msgComplete = config.msgComplete;
                    }
                    
                    this.send(msg);
                })
            }
        })
    }
    RED.nodes.registerType('actuatorStatusProvider', actuatorStatusProvider);
}