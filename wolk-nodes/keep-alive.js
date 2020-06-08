module.exports = RED => {
    function keepAlive(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.on('input', msg => {
            if (flow.connected) {
                msg.topic = `ping/${flow.device.key}`;
                msg.payload = '';
                this.send(msg);
            }
        })
    }
    RED.nodes.registerType('keepAlive', keepAlive);
}