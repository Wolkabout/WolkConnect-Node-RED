module.exports = RED => {
    function addAlarm(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        const flow = context.flow;
        this.on('input', msg => {
            this.value = config.value || msg.payload;
            this.reference = config.reference;
            this.msgComplete = config.msgComplete;

            if (flow.connected) {
                msg.payload = {
                    reference: this.reference,
                    topic: `events/${flow.device.key}/${this.reference}`,
                    payload: {data: this.value}
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