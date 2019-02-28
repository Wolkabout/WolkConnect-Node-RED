module.exports = RED => {
    function publish(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        const flow = context.flow;
        const node = this;
        this.on('input', msg => {
            if (!flow.connected) {
                this.log('Please connect device to platform');
            }
            for (let message of flow.outboundMessages) {
                msg.topic = message.topic;
                msg.payload = message.payload;
                node.send(msg);
            }
            flow.outboundMessages = [];
        });
    }
    RED.nodes.registerType('publish', publish);
}