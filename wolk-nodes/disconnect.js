module.exports = RED => {
    function disconnect(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.on('input', msg => {
            flow.connected = false;
            msg.topic = `lastwill/${flow.device.key}`;
            msg.payload = '';
            this.send(msg);
        })
    }
    RED.nodes.registerType('disconnect', disconnect);
}