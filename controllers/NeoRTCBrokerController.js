"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const thor_io_vnext_1 = require("thor-io.vnext");
let NeoRTCBrokerController = class NeoRTCBrokerController extends thor_io_vnext_1.ThorIO.Controllers.BrokerController {
    constructor(connection) {
        super(connection);
    }
    fileShare(fileInfo, topic, controlle, blob) {
        this.invokeToAll(fileInfo, "fileShare", this.alias, blob);
    }
};
__decorate([
    thor_io_vnext_1.CanInvoke(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], NeoRTCBrokerController.prototype, "fileShare", null);
NeoRTCBrokerController = __decorate([
    thor_io_vnext_1.ControllerProperties("neoBroker", false, 2000),
    __metadata("design:paramtypes", [thor_io_vnext_1.ThorIO.Connection])
], NeoRTCBrokerController);
exports.NeoRTCBrokerController = NeoRTCBrokerController;
//# sourceMappingURL=NeoRTCBrokerController.js.map