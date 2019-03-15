module.exports = RED => {
    function connect(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.on('input', msg => {
            flow.device = {
                key: config.key,
                password: config.password
            }
            flow.outboundMessages = flow.outboundMessages || [];
            flow.actuatorReferences = config.actuatorReferences.split(',') || [];
            flow.connected = true;

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
    RED.nodes.registerType('connect', connect);
}