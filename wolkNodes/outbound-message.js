module.exports = RED => {
    function outboundMessage(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        const flow = context.flow;
        this.on('input', msg => {
            msg.reference = msg.payload.reference;
            msg.topic = `readings/${flow.device.key}/${msg.reference}`;
            msg.payload = `{"data": "${msg.payload.value}"}`;
            flow.outboundMessages.length > 0 
                ? flow.outboundMessages.map(cur => cur.reference === msg.reference 
                    ? msg 
                    : cur
                )
                : flow.outboundMessages.push(msg);
            this.send(msg);
        });
    }
    RED.nodes.registerType('Outbound Message', outboundMessage);
}