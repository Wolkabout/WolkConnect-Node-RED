module.exports = RED => {
    function actuatorStatusProvider(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        flow.actuatorReferences = flow.actuatorReferences ? config.actuatorReferences.split(';') : [];
        this.on('input', msg => {

            if (flow.actuatorReferences) {
                flow.actuatorReferences.forEach(cur => {
                    let trimmed = cur.trim()
                    msg.payload = {
                        reference: `${trimmed}`,
                        type: 'actuator',
                        topic: `actuators/status/${flow.device.key}/${trimmed}`,
                        payload: [{status: "READY", value: ""}]
                    }
                    
                    this.send(msg);
                })
            }

        })
    }
    RED.nodes.registerType('actuatorStatusProvider', actuatorStatusProvider);
}