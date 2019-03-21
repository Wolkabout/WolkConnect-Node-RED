module.exports = RED => {
    function publish(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        const flow = context.flow;
        const node = this;
        this.on('input', msg => {
            if (!flow.connected) {
                throw new Error('Please connect device to platform');
            } else {
                for (let message of msg.payload) {
                    switch (message.type){
                        case 'sensor':
                            msg.topic = message.topic;
                            msg.payload = message.payload;
                            msg.qos = 1;
                            msg.retain = false;
                            node.send(msg);
                            break;
                        case 'actuator':
                            msg.topic = message.topic;
                            msg.payload = message.payload[0];
                            msg.qos = 1;
                            msg.retain = false;
                            node.send(msg);
                            break;
                        case 'alarm':
                            msg.topic = message.topic;
                            msg.payload = message.payload[0];
                            msg.qos = 1;
                            msg.retain = false;
                            node.send(msg);
                            break;
                        case 'configuration':
                            msg.topic = message.topic;
                            msg.payload = message.payload[0];
                            msg.qos = 1;
                            msg.retain = false;
                            node.send(msg);
                            break;
                        default:
                            msg.topic = message.topic;
                            msg.payload = message.payload[0];
                            msg.qos = 1;
                            msg.retain = false;
                            node.send(msg);
                            break;
                    }
                }
            }
            
        });
    }
    RED.nodes.registerType('publish', publish);
}