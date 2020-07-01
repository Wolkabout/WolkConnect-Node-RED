module.exports = RED => {
    function addSensorReading(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        this.on('input', function (msg, send, done) {
            this.value = config.value ? config.value : msg.payload;
            
            if (!flow.connected) {
                throw new Error('Please connect device to platform');
            } else {
                msg.payload = {
                    type: 'sensor',
                    reference: config.reference,
                    topic: `d2p/sensor_reading/d/${flow.device.key}/r/${config.reference}`,
                    payload: config.timestamp ? [{utc: Date.now(), data: this.value.toString()}] : [{data: this.value.toString()}]
                };
                
                if (config.msgComplete) {
                    msg.complete = config.msgComplete;
                }
    
                send(msg);
                done();
            }
        });
    }
    RED.nodes.registerType('addSensorReading', addSensorReading);
}