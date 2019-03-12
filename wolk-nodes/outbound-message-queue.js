module.exports = RED => {
    function outboundMessageQueue(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        const flow = context.flow;
        this.on('input', msg => {

            let newValues = [];

            if (flow.outboundMessages.length > 0) {
                flow.outboundMessages.forEach((cur, ind) => {
                    if (cur.reference === msg.reference) {
                        flow.outboundMessages[ind] = msg;
                    } else {
                        newValues.push(msg);
                    }
                });
            } else {
                newValues.push(msg);
            }

            newValues.forEach(cur => {
                flow.outboundMessages.push(cur);
            })
            console.log(flow.outboundMessages);
            newValues = [];
        
        });
    }
    RED.nodes.registerType('outboundMessageQueue', outboundMessageQueue);
}