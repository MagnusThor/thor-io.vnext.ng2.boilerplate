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
var router_1 = require('@angular/router');
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
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizer])
    ], SanitizeUrl);
    return SanitizeUrl;
}());
var ConferenceComponent = (function () {
    function ConferenceComponent(conferenceService, sanitizer, route) {
        var _this = this;
        this.conferenceService = conferenceService;
        this.sanitizer = sanitizer;
        this.route = route;
        this.actionButtonCaption = "START";
        this.InstantMessages = new Array();
        this.InstantMessage = new models_1.InstantMessage();
        this.route.params.subscribe(function (params) {
            if (!params.hasOwnProperty("slug")) {
                _this.conferenceService.getSlug().subscribe(function (randomSlug) {
                    _this.Context = randomSlug;
                    _this.ContextUrl = "https://" + location.host + "/#/join/" + randomSlug;
                });
            }
            else {
                _this.Context = params["slug"].toString();
                _this.actionButtonCaption = "JOIN";
                _this.ContextUrl = "https://" + location.host + "/#/join/" + _this.Context;
            }
            _this.Participants = new Array();
            _this.Participants = _this.conferenceService.RemoteStreams;
            _this.InstantMessages = _this.conferenceService.InstantMessages;
            _this.conferenceService.onParticipant = function (participant) {
                _this.MainVideoUrl = participant.url;
            };
        });
    }
    ConferenceComponent.prototype.sendIM = function () {
        this.conferenceService.sendInstantMessage(this.InstantMessage);
        this.InstantMessage.text = "";
    };
    ConferenceComponent.prototype.changeMainVideo = function (participant) {
        this.MainVideoUrl = participant.url;
    };
    ConferenceComponent.prototype.joinConference = function () {
        var _this = this;
        navigator.getUserMedia({ audio: true, video: true }, function (stream) {
            _this.conferenceService.addLocalMediaStream(stream);
            var blobUrl = _this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(stream));
            _this.LocalStreamUrl = blobUrl;
            _this.conferenceService.joinConference(_this.Context);
            _this.inConference = true;
        }, function (err) {
            console.log("getUserMedia error", err);
        });
    };
    ConferenceComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'conference',
            templateUrl: 'conference.component.html',
        }), 
        __metadata('design:paramtypes', [conference_service_1.ConferenceService, platform_browser_1.DomSanitizer, router_1.ActivatedRoute])
    ], ConferenceComponent);
    return ConferenceComponent;
}());
exports.ConferenceComponent = ConferenceComponent;
//# sourceMappingURL=conference.component.js.map