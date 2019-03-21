module.exports = RED => {
    function actuatorStatusProvider(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.actuatorReferences = config.actuatorReferences.split(';') || [];
        this.on('input', msg => {
            setTimeout(() => {
                if (this.actuatorReferences) {
                    this.actuatorReferences.forEach((cur, ind) => {
                        let trimmed = cur.trim()
                        msg.payload = {
                            reference: `${trimmed}`,
                            type: 'actuator',
                            topic: `actuators/status/${flow.device.key}/${trimmed}`,
                            payload: [{status: "READY", value: ""}]
                        }
    
                        if (ind === this.actuatorReferences.length - 1) {
                            msg.complete = true;
                        }
                        
                        this.send(msg);
                    })
                }
            }, 1000)

        })
    }
    RED.nodes.registerType('actuatorStatusProvider', actuatorStatusProvider);
}