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
var core_1 = require('@angular/core');
var chat_service_1 = require('../shared/services/chat.service');
var models_1 = require('../../../shared/models');
var ChatComponent = (function () {
    function ChatComponent(chatService) {
        this.chatService = chatService;
        this.chatMessages = chatService.chatMessages;
        this.chatMessage = new models_1.ChatMessage("", 1);
    }
    ChatComponent.prototype.sendMessage = function () {
        if (this.chatMessage.message.length === 0)
            return;
        this.chatService.sendMessage(this.chatMessage);
        this.chatMessage = new models_1.ChatMessage("", this.chatMessage.age);
    };
    ChatComponent.prototype.setAge = function () {
        this.chatService.setAge(this.chatMessage.age);
    };
    ChatComponent.prototype.ngOnInit = function () {
    };
    ChatComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'chat',
            templateUrl: 'chat.component.html'
        }), 
        __metadata('design:paramtypes', [chat_service_1.ChatService])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map