module.exports = RED => {
    function actuationHandler(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.on('input', function (msg, send, done) {
            this.value = config.returnValue ?
                msg.payload.value :
                config.value ?
                    config.value :
                    msg.payload;

            if (!flow.connected) {
                throw new Error('Please connect device to platform');
            } else {
                msg.payload = {
                    type: 'actuator',
                    reference: config.reference,
                    topic: `d2p/actuator_status/d/${flow.device.key}/r/${config.reference}`,
                    payload: [{status: "READY", value: this.value}]
                };
    
                if (config.msgComplete) {
                    msg.complete = config.msgComplete;
                }
    
                send(msg);
                done();
            }
        });
    }
    RED.nodes.registerType('actuationHandler', actuationHandler);
}