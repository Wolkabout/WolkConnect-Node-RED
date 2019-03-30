module.exports = RED => {
    function addAlarm(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.on('input', msg => {
            this.value = config.value ? config.value : msg.payload;

            if (!flow.connected) {
                throw new Error('Please connect device to platform');
            } else {
                msg.payload = {
                    type: 'alarm',
                    reference: config.reference,
                    topic: `events/${flow.device.key}/${config.reference}`,
                    payload: config.timestamp ? [{utc: Date.now(), data: this.value}] : [{data: this.value}]
                }
                if (config.msgComplete) {
                    msg.complete = config.msgComplete;
                }
                this.send(msg);
            }
        });
    }
    RED.nodes.registerType('addAlarm', addAlarm);
}