module.exports = RED => {
    function getRandomNumber(config) {
        RED.nodes.createNode(this, config);
        const context = this.context();
        this.minimum = Number(config.minimum);
        this.maximum = Number(config.maximum);
        this.on('input', msg => {
            msg.payload = Math.floor(Math.random() * (this.maximum - this.minimum + 1)) + this.minimum;
            this.send(msg);
        });
    }
    RED.nodes.registerType('Get Random Number', getRandomNumber);
}