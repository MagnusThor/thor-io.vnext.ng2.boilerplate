"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var thor_io_vnext_1 = require("thor-io.vnext");
var models_1 = require('../shared/models');
var BrokerController = (function (_super) {
    __extends(BrokerController, _super);
    function BrokerController(client) {
        _super.call(this, client);
        this.alias = "broker";
        this.Connections = new Array();
    }
    BrokerController.prototype.createId = function () {
        return Math.random().toString(36).substring(2);
    };
    ;
    BrokerController.prototype.onopen = function () {
        this.Peer = new models_1.PeerConnection(this.createId(), this.client.id);
        this.invoke(this.Peer, "contextCreated", this.alias);
    };
    BrokerController.prototype.instantMessage = function (instantMessage) {
        var _this = this;
        var expression = function (pre) {
            return pre.Peer.context >= _this.Peer.context;
        };
        this.invokeTo(expression, instantMessage, "instantMessage", this.alias);
    };
    BrokerController.prototype.changeContext = function (change) {
        this.Peer.context = change.context;
        this.invoke(this.Peer, "contextChanged", this.alias);
    };
    BrokerController.prototype.contextSignal = function (signal) {
        var expression = function (pre) {
            return pre.client.id === signal.recipient;
        };
        this.invokeTo(expression, signal, "contextSignal", this.alias);
    };
    BrokerController.prototype.connectContext = function () {
        var connections = this.getPeerConnections(this.Peer).map(function (p) { return p.Peer; });
        this.invoke(connections, "connectTo", this.alias);
    };
    BrokerController.prototype.getPeerConnections = function (peerConnetion) {
        var _this = this;
        var match = this.findOn(this.alias, function (pre) {
            return pre.Peer.context === _this.Peer.context && pre.Peer.peerId !== peerConnetion.peerId;
        });
        return match;
    };
    __decorate([
        thor_io_vnext_1.CanInvoke(true), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [models_1.InstantMessage]), 
        __metadata('design:returntype', void 0)
    ], BrokerController.prototype, "instantMessage", null);
    __decorate([
        thor_io_vnext_1.CanInvoke(true), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [models_1.PeerConnection]), 
        __metadata('design:returntype', void 0)
    ], BrokerController.prototype, "changeContext", null);
    __decorate([
        thor_io_vnext_1.CanInvoke(true), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [models_1.Signal]), 
        __metadata('design:returntype', void 0)
    ], BrokerController.prototype, "contextSignal", null);
    __decorate([
        thor_io_vnext_1.CanInvoke(true), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], BrokerController.prototype, "connectContext", null);
    BrokerController = __decorate([
        thor_io_vnext_1.ControllerProperties("broker", false), 
        __metadata('design:paramtypes', [thor_io_vnext_1.ThorIO.Connection])
    ], BrokerController);
    return BrokerController;
}(thor_io_vnext_1.ThorIO.Controller));
exports.BrokerController = BrokerController;
//# sourceMappingURL=broker.controller.js.map