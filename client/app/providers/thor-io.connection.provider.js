"use strict";
var thor_io_client_vnext_1 = require('thor-io.client-vnext');
var ConnectionProviderError = (function () {
    function ConnectionProviderError(error) {
        this.timeStamp = new Date();
        this.error = error;
    }
    return ConnectionProviderError;
}());
exports.ConnectionProviderError = ConnectionProviderError;
var ConnectionProvider = (function () {
    function ConnectionProvider() {
        var _this = this;
        this.errors = new Array();
        //todo: controller array configurable
        this.factory = new thor_io_client_vnext_1.ThorIOClient.Factory(location.origin.replace(/^http/, 'ws'), ["contextBroker"]);
        this.factory.OnOpen = function (brokerProxy) {
            _this.isConnected = true;
            brokerProxy.Connect();
        };
        this.factory.OnClose = function () {
            _this.isConnected = false;
        };
        this.factory.OnError = function (err) {
            _this.errors.unshift(new ConnectionProviderError(err));
            _this.onError(err);
        };
    }
    ConnectionProvider.prototype.onError = function (err) {
    };
    ConnectionProvider.prototype.getProxy = function (controller) {
        return this.factory.GetProxy(controller);
    };
    return ConnectionProvider;
}());
exports.ConnectionProvider = ConnectionProvider;
//# sourceMappingURL=thor-io.connection.provider.js.map