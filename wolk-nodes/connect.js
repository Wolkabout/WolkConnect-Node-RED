module.exports = RED => {
    function connect(config) {
        RED.nodes.createNode(this, config);
        const fs = require('fs');
        const flow = this.context().flow;
        this.on('input', function (msg, send, done) {

            if (config.logFile) {
                try {
                    this.logFile = JSON.parse(fs.readFileSync(`${config.logFile}`));
                } catch (err) {
                    if (err.code === 'ENOENT') {
                        fs.writeFileSync(`${config.logFile}`);
                    } else {
                        throw err;
                    }
                }
            }

            flow.device = {
                key: config.key,
                password: config.password
            };

            flow.outboundMessages = flow.outboundMessages ?
                flow.outboundMessages : this.logFile ?
                    this.logFile :
                    [];
                    
            flow.connected = true;

            msg.topic = `ping/${flow.device.key}`;
            msg.payload = '';

            send(msg);
            done();
        });
    }
    RED.nodes.registerType('connect', connect);
}
