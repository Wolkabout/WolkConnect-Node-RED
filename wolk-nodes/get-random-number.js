module.exports = RED => {
    function getRandomNumber(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        this.minimum = Number(config.minimum);
        this.maximum = Number(config.maximum);
        this.readingsAmount = config.readingsAmount ? parseInt(config.readingsAmount, 10) : 1;
        this.boolean = config.boolean;
        this.threshold = config.threshold,
        this.on('input', msg => {
            msg.payload = []
            for (let i = 0; i < this.readingsAmount; i++) {
                let reading = Math.random() * (this.maximum - this.minimum) + this.minimum;
                if (this.boolean) {
                    msg.payload = reading > this.threshold ? true : false;
                } else {
                    msg.payload = [...msg.payload, reading];
                }
            }
            this.send(msg);
        });
    }
    RED.nodes.registerType('getRandomNumber', getRandomNumber);
}