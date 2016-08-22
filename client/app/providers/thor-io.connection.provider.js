"use strict";
var ConnectionProvider = (function () {
    function ConnectionProvider() {
        this.factory = new ThorIOClient.Factory("ws://localhost:1337", ["chat"]);
        this.factory.OnOpen = function (chatProxy) {
            chatProxy.Connect();
        };
    }
    ConnectionProvider.prototype.getProxy = function (controller) {
        return this.factory.GetChannel(controller);
    };
    return ConnectionProvider;
}());
exports.ConnectionProvider = ConnectionProvider;
//# sourceMappingURL=thor-io.connection.provider.js.map