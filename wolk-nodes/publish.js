module.exports = RED => {
    function publish(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.on('input', function(msg, send, done) {
            if (!flow.connected) {
                throw new Error('Please connect device to platform');
            } else {
                for (let message of msg.payload) {
                    msg.topic = `${message.topic}`;
                    msg.qos = 1;
                    msg.retain = false;

                    msg.payload = message.payload[0];

                    send(JSON.parse(JSON.stringify(msg)));
                }

                done();
            }
        });
    }
    RED.nodes.registerType('publish', publish);
}