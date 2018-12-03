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
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const conference_service_1 = require("../shared/services/conference.service");
const models_1 = require("../../../shared/models");
const platform_browser_1 = require("@angular/platform-browser");
let SanitizeUrl = class SanitizeUrl {
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    transform(v) {
        return this._sanitizer.bypassSecurityTrustUrl(v);
    }
};
SanitizeUrl = __decorate([
    core_1.Pipe({
        name: 'sanitizeUrl'
    }),
    __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
], SanitizeUrl);
let ConferenceComponent = class ConferenceComponent {
    constructor(conferenceService, sanitizer, route) {
        this.conferenceService = conferenceService;
        this.sanitizer = sanitizer;
        this.route = route;
        this.actionButtonCaption = "START";
        this.InstantMessages = new Array();
        this.InstantMessage = new models_1.InstantMessage();
        this.route.params.subscribe((params) => {
            if (!params.hasOwnProperty("slug")) {
                this.conferenceService.getSlug().then((randomSlug) => {
                    this.Context = randomSlug;
                    this.ContextUrl = "https://" + location.host + "/#/join/" + randomSlug;
                });
            }
            else {
                this.Context = params["slug"].toString();
                this.actionButtonCaption = "JOIN";
                this.ContextUrl = "https://" + location.host + "/#/join/" + this.Context;
            }
            this.Participants = new Array();
            this.Participants = this.conferenceService.RemoteStreams;
            this.InstantMessages = this.conferenceService.InstantMessages;
            this.conferenceService.onParticipant = (participant) => {
                this.MainVideoUrl = participant.url;
            };
        });
    }
    sendIM() {
        this.conferenceService.sendInstantMessage(this.InstantMessage);
        this.InstantMessage.text = "";
    }
    changeMainVideo(participant) {
        this.MainVideoUrl = participant.url;
    }
    joinConference() {
        navigator.getUserMedia({ audio: true, video: true }, (stream) => {
            this.conferenceService.addLocalMediaStream(stream);
            let blobUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(stream));
            this.LocalStreamUrl = blobUrl;
            this.conferenceService.joinConference(this.Context);
            this.inConference = true;
        }, (err) => {
            console.log("getUserMedia error", err);
        });
    }
};
ConferenceComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'conference',
        templateUrl: 'conference.component.html',
    }),
    __metadata("design:paramtypes", [conference_service_1.ConferenceService, platform_browser_1.DomSanitizer,
        router_1.ActivatedRoute])
], ConferenceComponent);
exports.ConferenceComponent = ConferenceComponent;
//# sourceMappingURL=conference.component.js.map