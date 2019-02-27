module.exports = RED => {
    function outboundMessage(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        this.reference = config.reference;
        this.on('input', msg => {
            msg.topic = `readings/udvua0k0xp99z64a/${msg.payload.reference}`
            msg.payload = `{"data": "${msg.payload.value}"}`
            this.send(msg);
        });
    }
    RED.nodes.registerType('Outbound Message', outboundMessage);
}