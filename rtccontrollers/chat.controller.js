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
var thor_io_vnext_1 = require('thor-io.vnext');
var models_1 = require('../shared/models');
var ChatController = (function (_super) {
    __extends(ChatController, _super);
    function ChatController(connection) {
        _super.call(this, connection);
        this.age = 1;
    }
    ChatController.prototype.sendMessage = function (message) {
        var _this = this;
        var expression = function (pre) {
            return pre.age >= _this.age;
        };
        this.invokeTo(expression, message, "chatMessage", this.alias);
    };
    __decorate([
        thor_io_vnext_1.CanSet(true), 
        __metadata('design:type', Number)
    ], ChatController.prototype, "age", void 0);
    __decorate([
        thor_io_vnext_1.CanInvoke(true), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [models_1.ChatMessage]), 
        __metadata('design:returntype', void 0)
    ], ChatController.prototype, "sendMessage", null);
    ChatController = __decorate([
        thor_io_vnext_1.ControllerProperties("chat", false), 
        __metadata('design:paramtypes', [thor_io_vnext_1.ThorIO.Connection])
    ], ChatController);
    return ChatController;
}(thor_io_vnext_1.ThorIO.Controller));
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map