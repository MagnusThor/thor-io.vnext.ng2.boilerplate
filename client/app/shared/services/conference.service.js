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
const thor_io_connection_provider_1 = require("../../providers/thor-io.connection.provider");
const thor_io_client_vnext_1 = require("thor-io.client-vnext");
const models_1 = require("../../../../shared/models");
const platform_browser_1 = require("@angular/platform-browser");
const http_1 = require("@angular/http");
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/map'; 
// import 'rxjs/add/operator/catch';
let ConferenceService = class ConferenceService {
    constructor(connProvider, sanitizer, http) {
        this.connProvider = connProvider;
        this.sanitizer = sanitizer;
        this.http = http;
        this.proxy = connProvider.getProxy("contextBroker");
        this.RemoteStreams = new Array();
        this.InstantMessages = new Array();
        let config = {
            iceTransports: 'all',
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302"
                }
            ]
        };
        // add your own STUN / turn servers ..
        this.rtc = new thor_io_client_vnext_1.ThorIOClient.WebRTC(this.proxy, config);
        // limit video and audio
        this.rtc.setBandwithConstraints(500, 50);
        this.rtc.OnContextCreated = () => {
        };
        this.rtc.OnLocalStream = () => { };
        this.rtc.OnRemoteStream = (stream) => {
            let safeUrl = sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(stream));
            let participant = new models_1.Participant(stream, safeUrl, stream.id);
            this.onParticipant(participant);
            this.RemoteStreams.push(participant);
        };
        this.rtc.OnRemoteStreamlost = (streamId, peerId) => {
            var remoteStream = this.findMediaStream(streamId);
            this.RemoteStreams.splice(this.RemoteStreams.indexOf(remoteStream), 1);
        };
        this.rtc.OnContextChanged = (context) => {
            this.context = context;
            this.rtc.ConnectContext();
        };
        this.proxy.On("instantMessage", (message) => {
            this.InstantMessages.unshift(message);
        });
    }
    onParticipant(participant) {
    }
    getSlug() {
        let req = this.http.get("/client/data/slugs.json");
        let slugs = req.toPromise().then((resp) => {
            let slugs = resp.json();
            return slugs[Math.floor(Math.random() * slugs.length)].toString().toLowerCase();
        });
        // return this.http.get("/data/slugs.json"
        // ).map( (res:Response) => {
        //        let slugs = res.json();
        //        return slugs[Math.floor(Math.random() * slugs.length) ].toString().toLowerCase();
        // });
        return slugs;
    }
    joinConference(context) {
        this.proxy.Invoke("changeContext", { context: context });
    }
    findMediaStream(streamId) {
        var match = this.RemoteStreams.filter((pre) => {
            return pre.id === streamId;
        })[0];
        return match;
    }
    addLocalMediaStream(stream) {
        this.rtc.AddLocalStream(stream);
    }
    ;
    connectContext(context) {
        this.proxy.Invoke("connectContext", { context: context });
    }
    sendInstantMessage(instantMessage) {
        instantMessage.timeStamp = new Date();
        this.proxy.Invoke("instantMessage", instantMessage);
    }
};
ConferenceService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [thor_io_connection_provider_1.ConnectionProvider, platform_browser_1.DomSanitizer, http_1.Http])
], ConferenceService);
exports.ConferenceService = ConferenceService;
//# sourceMappingURL=conference.service.js.map