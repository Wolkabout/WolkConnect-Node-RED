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
            flow.connected = true;

            msg.payload = ['hello','there'];

            this.send(msg);
        })
    }
    RED.nodes.registerType('connect', connect);
}