module.exports = RED => {
    function actuatorStatusProvider(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.actuatorReferences = config.actuatorReferences.split(';');
        this.msgComplete = config.msgComplete;
        this.on('input', msg => {
            if (this.actuatorReferences) {
                this.actuatorReferences.forEach((cur, ind) => {
                    let trimmed = cur.trim()
                    msg.payload = {
                        reference: `${trimmed}`,
                        type: 'actuator',
                        topic: `actuators/status/${flow.device.key}/${trimmed}`,
                        payload: [{status: "READY", value: ""}]
                    }

                    if (ind === this.actuatorReferences.length - 1 && this.msgComplete) {
                        msg.complete = true;
                    }
                    
                    this.send(msg);
                })
            }
        })
    }
    RED.nodes.registerType('actuatorStatusProvider', actuatorStatusProvider);
}