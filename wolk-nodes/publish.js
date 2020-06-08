module.exports = RED => {
    function publish(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.on('input', msg => {
            if (!flow.connected) {
                throw new Error('Please connect device to platform');
            } else {
                for (let message of msg.payload) {
                    msg.topic = `${message.topic}`;
                    msg.qos = 1;
                    msg.retain = false;
                    switch (message.type){
                        case 'sensor':
                            msg.payload = message.payload;
                            break;
                        default:
                            msg.payload = message.payload[0];
                            break;
                    }
                    this.send(JSON.parse(JSON.stringify(msg)));
                }
            }
            
        });
    }
    RED.nodes.registerType('publish', publish);
}