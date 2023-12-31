var should = require("should");
var helper = require("node-red-node-test-helper");

var vestelremotecontrolNode = require("../nodes/vestel-remote-control.js");
var vestelconfigNode = require("../nodes/vestel-config.js");
//var remotebuttonNode = require("../nodes/remote-button.js");
var keymap = require("../nodes/keymap.js");

helper.init(require.resolve('node-red'));

describe('vestel-remote-control Node', function () {

  beforeEach(function (done) {
      helper.startServer(done);
  });

  afterEach(function (done) {
      helper.unload();
      helper.stopServer(done);
  });


  it('should make correct HTTP requests', function (done) {
    //this.timeout(15000);
    //setTimeout(done, 15000);

    var flow = [
        {
            "id": "testednode",
            "type": "vestel-remote-control",
            "z": "cb69a330.f88fa",
            "name": "remote_control_node",
            "configurationNode": "confignode",
            "x": 520,
            "y": 160,
            "wires": [
                ["__test_helper_node__"]
            ]
        },
        {
            "id": "confignode",
            "type": "vestel-config",
            "z": "",
            "name": "Living room",
            "tvIpAddress": "localhost",
            "selectedTvModel": "MB130",
            "customPort": "1880",
            "customPath": ""
        },
        { id: "__test_helper_node__", type: "helper" }
    ];

    helper.load([vestelconfigNode ,vestelremotecontrolNode], flow, function () {

      var testHelperNode = helper.getNode("__test_helper_node__");
      i = 0;
      while (testHelperNode == null) {
          testHelperNode = helper.getNode("__test_helper_node__");
          console.log("#"+ ++i +" null   t(-_-t)   helper.getNode is returning nulls for some reason");
          if (i>10000) {
            return
          }
      }

      var testedNode = helper.getNode("testednode");

      testHelperNode.on("input", function (msg) {
        msg.should.have.property('payload', "<?xml version='1.0' ?><remote><key code='1010'/></remote>");
        done();
      });

      testedNode.receive({ payload: "BACK" });
    });
  });
});
