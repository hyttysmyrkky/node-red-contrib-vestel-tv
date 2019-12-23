# node-red-contrib-vestel-tv

[![NPM version](https://badge.fury.io/js/node-red-contrib-vestel-tv.svg)](http://badge.fury.io/js/node-red-contrib-vestel-tv)
[![npm](https://img.shields.io/npm/dt/node-red-contrib-vestel-tv.svg)]()
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

> Node-RED nodes to control a Vestel TV (possibly sold as ProCaster, Toshiba, Hitachi, Sharp, JVC, Bush, Alba, Panasonic, Medion, Finlux etc.)

Currently supported (i.e. tested) models:
* MB130 (ProCaster 65UNB815H)
* ... (may work well with other similar models too)
> Since these TVs are sold under many brands, the model number is quite ambiguous. One way to get a model number is from the title of the service menu (press remote buttons in the following sequence: HOME,4,7,2,5).


## Setup

The virtual remote control feature must be enabled in the TV settings.

For the instructions how to install this node (plugin), please refer to [the Node-RED docs](https://nodered.org/docs/user-guide/runtime/adding-nodes).

This plugin does not use the discovery protocol, which means that you have to give the IP address of the TV manually to the `vestel remote control` node settings. Also, you most likely want to set the address to be static (in DHCP in the router settings).

The TV must be turned on. Usually, when the TV has been turned off with the normal IR remote control, the TV goes to a deep sleep state where it does not listen to virtual remotes anymore. However, when powering off the TV by using a virtual remote, the TV may enter a light standby state where it is listening to a virtual remote power on command (while also consuming more energy!).


## Contributing (and Disclaimer)

* Pull requests are welcome, to add support for other models etc.
* If you tested a new TV model, that should be added to the list of tested models above (e.g. make a GitHub Issue)

This project is not related to Vestel or any other manufacturer, but is fully 3rd-party-contributed.

### Example how to "reverse engineer" the remote API of a TV model

You can try the virtual remote first with the official Android app from the Google Play store (see link in Acknowledgments). When that works, you can use a packet capture app to get the HTTP requests that the Android app makes.

Alternatively, if you think that only the port is different: to find out ports that the TV is listening to (when powered on):
e.g. on Linux `nmap -p- IP_ADDRESS` (where IP_ADDRESS is of course the address of the TV)

See links in the Acknowledgments for more related information.

### Possible future features
* The TV is publishing some events via WebSocket. These could be useful.
* The DIAL protocol, see [Wikipedia](https://en.wikipedia.org/wiki/Discovery_and_Launch) or [this](http://www.dial-multiscreen.org/)
* Monitor somehow whether the TV is online (listening to virtual remotes)
* Try to emulate some button macros (although these can be done in Node-RED flows too)

### Running the tests
Running the tests requires Docker. Run the script `test_all.sh` in the test directory.

If you have Docker and you would like to test this plugin without installing Node-RED, you can run (in the test directory) the scripts `./build_test_image.sh` and then `./run_node-red_with_vestel-tv.sh`. Then open in browser http://localhost:1890. (Or if you want to access Node-RED outside localhost, run `./run_node-red_with_vestel-tv.sh --not-only-for-localhost`)

## License

Apache-2.0 (c) Rednaelo Inot


## Acknowledgements

* [The official virtual remote app for Android](https://play.google.com/store/apps/details?id=com.VestelTvRemote)

Useful links (and thanks for the useful information!):
* https://github.com/T3m3z/pyvesteltv/
* https://shkspr.mobi/blog/2018/11/telnet-control-of-toshiba-smart-tvs/
* https://www.domoticz.com/forum/viewtopic.php?t=26042
