module.exports = RED => {
    function actuatorStatusProvider(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        flow.actuatorReferences = flow.actuatorReferences ? config.actuatorReferences.split(';') : [];
        this.on('input', msg => {

            if (flow.actuatorReferences) {
                flow.actuatorReferences.forEach(cur => {
                    let trimmed = cur.trim()
                    msg.topic = `actuators/status/${flow.device.key}/${trimmed}`;
                    msg.payload = `{"status": "READY", "value": ""}`;
                    msg.qos = 1;
                    msg.retain = false;
                    this.send(msg);
                })
            }

        })
    }
    RED.nodes.registerType('actuatorStatusProvider', actuatorStatusProvider);
}