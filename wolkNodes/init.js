module.exports = RED => {
    function init(config) {
        RED.nodes.createNode(this, config);
        const flow = this.context().flow;
        flow.device = {
            key: config.key,
            password: config.password
        }
        flow.outboundMessages = [];
    }
    RED.nodes.registerType('init', init);
}