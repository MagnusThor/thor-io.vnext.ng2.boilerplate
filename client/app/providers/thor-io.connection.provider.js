"use strict";
var ConnectionProvider = (function () {
    function ConnectionProvider() {
        //todo: make url and controller array configurable
        this.factory = new ThorIOClient.Factory("ws://localhost:1337", ["broker"]);
        this.factory.OnOpen = function (brokerProxy) {
            brokerProxy.Connect();
        };
    }
    ConnectionProvider.prototype.getProxy = function (controller) {
        return this.factory.GetChannel(controller);
    };
    return ConnectionProvider;
}());
exports.ConnectionProvider = ConnectionProvider;
//# sourceMappingURL=thor-io.connection.provider.js.map