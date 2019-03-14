module.exports = RED => {
    function outboundMessageQueue(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        const flow = context.flow;
        const maxData = parseInt(config.maxData, 10) || 1;
        this.on('input', msg => {

            msg.payload.forEach(cur => {
                let existing = flow.outboundMessages.find(el => el.reference === cur.reference);
                if(!!existing) {
                    if (existing.payload.length < maxData) {
                        existing.payload = [...cur.payload, ...existing.payload];
                    } else if (existing.payload.length === maxData) {
                        existing.payload.pop();
                        existing.payload = [...cur.payload, ...existing.payload];
                    } else {
                        existing.payload = [...cur.payload];
                    }
                } else {
                    flow.outboundMessages.unshift(cur);
                }
            })

            msg.payload = flow.outboundMessages;
            this.send(msg);
        });
    }
    RED.nodes.registerType('outboundMessageQueue', outboundMessageQueue);
}