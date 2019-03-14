module.exports = RED => {
    function publish(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        const flow = context.flow;
        const node = this;
        this.on('input', msg => {
            if (!flow.connected) {
                throw new Error('Please connect device to platform');
            }

            for (let message of flow.outboundMessages) {
                msg.topic = message.topic;
                msg.payload = JSON.stringify(message.payload);
                msg.qos = 2;
                msg.retain = false;
                node.send(msg);
            }
            
        });
    }
    RED.nodes.registerType('publish', publish);
}