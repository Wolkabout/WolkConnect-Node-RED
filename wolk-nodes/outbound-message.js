module.exports = RED => {
    function outboundMessage(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        const flow = context.flow;
        this.on('input', msg => {
            if (!flow.connected) {
                throw new Error('Connect device to platform!');
            }
            msg.reference = msg.payload.reference;
            msg.topic = `readings/${flow.device.key}/${msg.reference}`;
            msg.payload = `{"data": "${msg.payload.value}"}`;
            flow.outboundMessages.length > 0 
                ? flow.outboundMessages.forEach(cur => cur.reference === msg.reference 
                    ? msg 
                    : cur
                )
                : flow.outboundMessages.push(msg);
            this.send(msg);
        });
    }
    RED.nodes.registerType('outboundMessage', outboundMessage);
}