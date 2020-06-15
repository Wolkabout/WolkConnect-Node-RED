module.exports = RED => {
    function disconnect(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.on('input', function (msg, send, done) {
            flow.connected = false;
            msg.topic = `lastwill/${flow.device.key}`;
            msg.payload = '';

            send(msg);
            done();
        });
    }
    RED.nodes.registerType('disconnect', disconnect);
}