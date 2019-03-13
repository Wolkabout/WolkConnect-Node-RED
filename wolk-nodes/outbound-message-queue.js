module.exports = RED => {
    function outboundMessageQueue(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        const flow = context.flow;
        const maxData = parseInt(config.maxData, 10) || 1;
        this.on('input', msg => {

            let existing = flow.outboundMessages.find(cur => cur.reference === msg.reference);
            if(!!existing) {
                if (existing.payload.length < maxData) {
                    existing.payload = [...existing.payload, ...msg.payload];
                } else if (existing.payload.length === maxData) {
                    existing.payload.shift();
                    existing.payload = [...existing.payload, ...msg.payload];
                }
            } else {
                flow.outboundMessages.push(msg);
            }

            this.send(msg);
        });
    }
    RED.nodes.registerType('outboundMessageQueue', outboundMessageQueue);
}