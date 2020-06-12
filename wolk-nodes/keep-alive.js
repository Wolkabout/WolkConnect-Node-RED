module.exports = RED => {
    function keepAlive(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.on('input', function (msg, send, done) {
            if (flow.connected) {
                msg.topic = `ping/${flow.device.key}`;
                msg.payload = '';

                send(msg);
                done();
            }
        })
    }
    RED.nodes.registerType('keepAlive', keepAlive);
}