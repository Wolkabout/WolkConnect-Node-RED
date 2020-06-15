module.exports = RED => {
    function addAlarm(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.on('input', function (msg, send, done) {
            this.value = config.value ? config.value : msg.payload;

            if (!flow.connected) {
                throw new Error('Please connect device to platform');
            } else {
                msg.payload = {
                    type: 'alarm',
                    reference: config.reference,
                    topic: `d2p/events/d/${flow.device.key}/r/${config.reference}`,
                    payload: config.timestamp ? [{utc: Date.now(), data: this.value}] : [{data: this.value}]
                };
                
                if (config.msgComplete) {
                    msg.complete = config.msgComplete;
                }
                
                send(msg);
                done();
            }
        });
    }
    RED.nodes.registerType('addAlarm', addAlarm);
}