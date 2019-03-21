module.exports = RED => {
    function getRandomNumber(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        this.minimum = Number(config.minimum);
        this.maximum = Number(config.maximum);
        this.boolean = config.boolean;
        this.on('input', msg => {
            msg.payload = Math.random() * (this.maximum - this.minimum + 1) + this.minimum;
            if (this.boolean) {
                msg.payload = msg.payload > 50 ? 'ON' : 'OFF';
            }
            this.send(msg);
        });
    }
    RED.nodes.registerType('getRandomNumber', getRandomNumber);
}