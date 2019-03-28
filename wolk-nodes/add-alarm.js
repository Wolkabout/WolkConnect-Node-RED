module.exports = RED => {
    function addAlarm(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        const flow = context.flow;
        this.reference = config.reference;
        this.timestamp = config.timestamp;
        this.msgComplete = config.msgComplete;
        this.on('input', msg => {
            this.value = config.value ? config.value : msg.payload;

            if (!flow.connected) {
                throw new Error('Please connect device to platform');
            } else {
                msg.payload = {
                    type: 'alarm',
                    reference: this.reference,
                    topic: `events/${flow.device.key}/${this.reference}`,
                    payload: this.timestamp ? [{utc: Date.now(), data: this.value}] : [{data: this.value}]
                }
                if (this.msgComplete) {
                    msg.complete = this.msgComplete;
                }
                this.send(msg);
            }
        });
    }
    RED.nodes.registerType('addAlarm', addAlarm);
}