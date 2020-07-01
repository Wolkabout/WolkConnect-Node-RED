module.exports = RED => {
    function getRandomValue(config) {
        RED.nodes.createNode(this, config);
        this.minimum = Number(config.minimum);
        this.maximum = Number(config.maximum);
        this.readingsAmount = parseInt(config.readingsAmount, 10);
        this.on('input', function (msg, send, done) {
            msg.payload = []

            // Using loop in case multi-value reading is required
            for (let i = 0; i < this.readingsAmount; i++) {
                let reading = Math.random() * (this.maximum - this.minimum) + this.minimum;
                if (config.isBoolean) {
                    msg.payload = reading > config.threshold;
                } else {
                    msg.payload = this.readingsAmount > 1 ? [...msg.payload, reading] : reading;
                }
            }

            send(msg);
            done();
        });
    }
    RED.nodes.registerType('getRandomValue', getRandomValue);
}