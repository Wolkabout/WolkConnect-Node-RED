module.exports = RED => {
    function outboundMessageQueue(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        const flow = context.flow;
        this.on('input', msg => {
            this.maxData = config.maxData;

            if (flow.outboundMessages.length === 0) {
                flow.outboundMessages.push(msg);
            } else {
                flow.outboundMessages.forEach((cur, ind) => {
                    if(cur.reference === msg.reference) {
                        flow.outboundMessages[ind] = msg;
                    } else {
                        flow.outboundMessages.push(msg);
                    }
                })
    
                // if (loc > -1) {
                //     flow.outboundMessages[loc] = msg;
                // } else {
                //     flow.outboundMessages.push(msg);
                // }
            }


            this.send(flow.outboundMessages);
        
        });
    }
    RED.nodes.registerType('outboundMessageQueue', outboundMessageQueue);
}