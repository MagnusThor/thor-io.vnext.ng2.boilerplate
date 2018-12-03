"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const thor_io_client_vnext_1 = require("thor-io.client-vnext");
class ConnectionProviderError {
    constructor(error) {
        this.timeStamp = new Date();
        this.error = error;
    }
}
exports.ConnectionProviderError = ConnectionProviderError;
class ConnectionProvider {
    constructor() {
        this.errors = new Array();
        //todo: controller array configurable
        this.factory = new thor_io_client_vnext_1.ThorIOClient.Factory(location.origin.replace(/^http/, 'ws'), ["contextBroker"]);
        this.factory.OnOpen = (brokerProxy) => {
            this.isConnected = true;
            brokerProxy.Connect();
        };
        this.factory.OnClose = () => {
            this.isConnected = false;
        };
        this.factory.OnError = (err) => {
            this.errors.unshift(new ConnectionProviderError(err));
            this.onError(err);
        };
    }
    onError(err) {
    }
    getProxy(controller) {
        return this.factory.GetProxy(controller);
    }
}
exports.ConnectionProvider = ConnectionProvider;
//# sourceMappingURL=thor-io.connection.provider.js.map