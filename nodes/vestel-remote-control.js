module.exports = function(RED) {
    
    const http = require('http'); // used for sending the commands to the tv
    
    function VestelControlNode(config) {
        RED.nodes.createNode(this,config);
        
        // Get the config node
        this.configurationNode = RED.nodes.getNode(config.configurationNode);
        
        let node = this;
        this.on('input', function(msg, send, done) {
            let TV = this.configurationNode;
            let errorMessage = "";

            // Parse the key code:
            var keyCodeToBeSent;
            if (!isNaN(msg.payload) && msg.payload>100) {
                // Input is probably a key code, e.g. 1064 (...let's hope so and send it)
                keyCodeToBeSent = msg.payload;
            } else {
                // Input is probably a string, such as "MUTE".
                // Check that it exists in the keymap of the current TV model:
                validButtonsList = Object.keys(TV.getKeyMap);
                requestedButton = msg.payload.toUpperCase();
                if (validButtonsList.indexOf(requestedButton) >= 0) {
                    keyCodeToBeSent = TV.getKeyMap[requestedButton];
                }
                else {
                    errorMessage = "Remote command not supported: " + requestedButton;
                }
            }
            
            // Send the HTTP request:
            if (!errorMessage) {
                node.debug("Sending command: " + keyCodeToBeSent);
            
                // Node.js http.request:
                // https://nodejs.org/api/http.html#http_http_request_url_options_callback
                const postData = "<?xml version='1.0' ?><remote><key code='" +keyCodeToBeSent+ "'/></remote>"
                
                const options = {
                    hostname: TV.getIpAddress,
                    port: TV.getTcpPort,
                    path: TV.getPath,
                    method: 'POST',
                    headers: {
                    'Content-Type': 'text/plain; charset=ISO-8859-1',
                    'Content-Length': Buffer.byteLength(postData),
                    'Connection': 'Keep-Alive'
                    }
                };
        
                const req = http.request(options);                
                
                req.on('error', (e) => {
                    errorMessage = `Is the TV listening? (${e.message})`;
                    this.warn(errorMessage);
                    this.status({fill:"red",shape:"ring",text: errorMessage});
                });
                
                // Write data to request body
                req.write(postData);
                req.end();
                
                // For maximum backwards compatibility, check that send exists.
                // If this node is installed in Node-RED 0.x, it will need to
                // fallback to using `node.send`
                send = send || function() { node.send.apply(node,arguments) }
                // Send the POST payload as the output (payload) of the node, for unit tests mostly!
                msg.payload = postData;
                send(msg);
            }
            
            // If an error is hit, report it to the runtime
            if (errorMessage) {
                this.status({fill:"red",shape:"ring",text: errorMessage});
                if (done) {
                    // Node-RED 1.0 compatible
                    done(errorMessage);
                } else {
                    // Node-RED 0.x compatible
                    node.error(errorMessage, msg);
                }
            } else {
                this.status({fill:"green",shape:"dot"});
                if (done) {
                    // Once finished, call 'done'.
                    // This call is wrapped in a check that 'done' exists
                    // so the node will work in earlier versions of Node-RED (<1.0)
                    done();
                }
            }
        });
    }
    RED.nodes.registerType("vestel-remote-control",VestelControlNode);
}