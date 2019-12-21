var should = require("should");
var helper = require("node-red-node-test-helper");

var remotebuttonNode = require("../nodes/remote-button.js");

helper.init(require.resolve('node-red'));

describe('remote-button Node', function () {

  beforeEach(function (done) {
      helper.startServer(done);
  });

  afterEach(function (done) {
      helper.unload();
      helper.stopServer(done);
  });


  it('should output a SETTINGS_SYSTEM button command', function (done) {

    var flow = [
        {
            "id": "n1",
            "type": "remote-button",
            "z": "f5ec379a.a15268",
            "name": "",
            "button": "SETTINGS_SYSTEM",
            "x": 290,
            "y": 100,
            "wires": [
                ["__test_helper_node__"]
            ]
        },
        { id: "__test_helper_node__", type: "helper" }
    ];
    
    helper.load(remotebuttonNode, flow, function () {
      var buttonNode = helper.getNode("n1");
      var testHelperNode = helper.getNode("__test_helper_node__");
      
      testHelperNode.on("input", function (msg) {
        msg.should.have.property('payload', 'SETTINGS_SYSTEM');
        done();
      });
      
      buttonNode.receive({ payload: "something" });
    });
  });
  
  
  it('should output a MUTE button command', function (done) {

    var flow = [
        {
            "id": "n1",
            "type": "remote-button",
            "z": "f5ec379a.a15268",
            "name": "",
            "button": "MUTE",
            "x": 290,
            "y": 100,
            "wires": [
                ["__test_helper_node__"]
            ]
        },
        { id: "__test_helper_node__", type: "helper" }
    ];
    
    helper.load(remotebuttonNode, flow, function () {
      var buttonNode = helper.getNode("n1");
      var testHelperNode = helper.getNode("__test_helper_node__");
      
      testHelperNode.on("input", function (msg) {
        msg.should.have.property('payload', 'MUTE');
        done();
      });
      
      buttonNode.receive({ payload: "something" });
    });
  });
});