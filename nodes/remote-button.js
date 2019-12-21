module.exports = function(RED) {
    function RemoteButtonNode(config) {
        RED.nodes.createNode(this,config);
        this.button = config.button;        
        let node = this;
        
        this.on('input', function(msg, send, done) {
            // For maximum backwards compatibility, check that send exists.
            // If this node is installed in Node-RED 0.x, it will need to
            // fallback to using `node.send`
            send = send || function() { node.send.apply(node,arguments) }
            
            msg.payload = node.button;
            send(msg);
            
            // Once finished, call 'done'.
            // This call is wrapped in a check that 'done' exists
            // so the node will work in earlier versions of Node-RED (<1.0)
            if (done) {
                done();
            }
        });
    }
    RED.nodes.registerType("remote-button",RemoteButtonNode);
}