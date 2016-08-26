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
var conference_service_1 = require('../shared/services/conference.service');
var models_1 = require('../../../shared/models');
var platform_browser_1 = require('@angular/platform-browser');
var SanitizeUrl = (function () {
    function SanitizeUrl(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    SanitizeUrl.prototype.transform = function (v) {
        return this._sanitizer.bypassSecurityTrustUrl(v);
    };
    SanitizeUrl = __decorate([
        core_1.Pipe({
            name: 'sanitizeUrl'
        }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizationService])
    ], SanitizeUrl);
    return SanitizeUrl;
}());
var ConferenceComponent = (function () {
    function ConferenceComponent(conferenceService, sanitizer) {
        var _this = this;
        this.conferenceService = conferenceService;
        this.sanitizer = sanitizer;
        this.InstantMessages = new Array();
        this.InstantMessage = new models_1.InstantMessage();
        this.InstantMessage = new models_1.InstantMessage();
        this.Participants = new Array();
        navigator.getUserMedia({ audio: false, video: true }, function (stream) {
            _this.LocalStreamUrl = sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(stream));
            conferenceService.addLocalMediaStream(stream);
        }, function (err) {
            // deal with the gum error
            console.log("getUserMedia error", err);
        });
        this.Participants = conferenceService.RemoteStreams;
        this.InstantMessages = conferenceService.InstantMessages;
        conferenceService.onParticipant = function (p) {
            _this.MainVideoUrl = p.url;
        };
        this.Context = "foo";
    }
    ConferenceComponent.prototype.sendIM = function () {
        this.conferenceService.sendInstantMessage(this.InstantMessage);
        this.InstantMessage.text = "";
    };
    ConferenceComponent.prototype.changeMainVideo = function (participant) {
        console.log(window.URL.createObjectURL(participant.stream), participant);
        this.MainVideoUrl = participant.url;
    };
    ConferenceComponent.prototype.joinConference = function () {
        this.conferenceService.joinConference(this.Context);
        this.inConference = true;
    };
    ConferenceComponent.prototype.ngOnInit = function () {
    };
    ConferenceComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'conference',
            templateUrl: 'conference.component.html',
            pipes: [
                SanitizeUrl
            ]
        }), 
        __metadata('design:paramtypes', [conference_service_1.ConferenceService, platform_browser_1.DomSanitizationService])
    ], ConferenceComponent);
    return ConferenceComponent;
}());
exports.ConferenceComponent = ConferenceComponent;
//# sourceMappingURL=conference.component.js.map