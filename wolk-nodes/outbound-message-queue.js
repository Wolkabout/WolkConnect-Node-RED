module.exports = RED => {
    function outboundMessageQueue(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.maxData = parseInt(config.maxData, 10);
        this.on('input', msg => {                
            msg.payload.forEach(message => {
                // Checking if message with same reference exists in flow array
                let existing = flow.outboundMessages.find(el => el.reference === message.reference);
                if(!!existing) {
                    // If it does, and the number of maximum readings has been reached,
                    // remove the last element from readings array
                    if (existing.payload.length >= this.maxData) {
                        existing.payload.pop();
                    }
                    // Add new reading to the array of readings
                    existing.payload = [...message.payload, ...existing.payload];
                } else {
                    // If there is no message with the reference received, add a new element to the array
                    flow.outboundMessages.push(message);
                }
            });

            msg.payload = flow.outboundMessages;
            this.send(msg);
        });
    }
    RED.nodes.registerType('outboundMessageQueue', outboundMessageQueue);
}