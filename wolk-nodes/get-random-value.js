module.exports = RED => {
    function getRandomValue(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        this.minimum = Number(config.minimum);
        this.maximum = Number(config.maximum);
        this.readingsAmount = parseInt(config.readingsAmount, 10);
        this.boolean = config.boolean;
        this.threshold = config.threshold,
        this.on('input', msg => {
            msg.payload = []
            if (this.readingsAmount > 1) {
                for (let i = 0; i < this.readingsAmount; i++) {
                    let reading = Math.random() * (this.maximum - this.minimum) + this.minimum;
                    if (this.boolean) {
                        msg.payload = reading > this.threshold ? true : false;
                    } else {
                        msg.payload = [...msg.payload, reading];
                    }
                }
            } else {
                let reading = Math.random() * (this.maximum - this.minimum) + this.minimum;
                if (this.boolean) {
                    msg.payload = reading > this.threshold ? true : false;
                } else {
                    msg.payload = reading;
                }
            }

            this.send(msg);
        });
    }
    RED.nodes.registerType('getRandomValue', getRandomValue);
}