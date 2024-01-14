const keyMaps = require('./keymap');

module.exports = function(RED) {
    function VestelConfigurationNode(n) {
        RED.nodes.createNode(this,n);
        this.name = n.name;

        this.tvIpAddress = n.tvIpAddress;
        this.selectedTvModel = n.selectedTvModel;
        this.customPort = n.customPort;
        this.customPath = n.customPath;

        const tv_models_library = {
            "MB130": {
                "keys": keyMaps.keycode_map_vestel,
                "path": "/apps/SmartCenter",
                "port": 56789
                },
            // JVC LT-40C890
            "": {
                "keys": keyMaps.keycode_map_vestel,
                "path": "/apps/SmartCenter",
                "port": 56789
                },
            "other": {
                "keys": keyMaps.keycode_map_vestel,
                "path": "/unknown/path",
                "port": "unknown_port"
            }
            // Add other models here.
            // Then you have to add the model also to the vestel-config.html
            // to the list of models available.
            // (TODO: read the available models there automatically somehow)
        };

        this.getTcpPort = this.customPort || tv_models_library[this.selectedTvModel].port;
        this.getPath = this.customPath || tv_models_library[this.selectedTvModel].path;
        this.getKeyMap = tv_models_library[this.selectedTvModel].keys;
        this.getIpAddress = this.tvIpAddress;
    }

    RED.nodes.registerType("vestel-config",VestelConfigurationNode);
}
