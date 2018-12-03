import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ConferenceService } from '../shared/services/conference.service';
import { Participant, InstantMessage, PeerConnection } from '../../../shared/models';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Pipe({
    name: 'sanitizeUrl'
})
class SanitizeUrl implements PipeTransform {

    constructor(private _sanitizer: DomSanitizer) { }

    transform(v: string): SafeUrl {
        return this._sanitizer.bypassSecurityTrustUrl(v);
    }
}

@Component({
    moduleId: module.id,
    selector: 'conference',
    templateUrl: 'conference.component.html',



})
export class ConferenceComponent {


    LocalStreamUrl: SafeUrl;
    MainVideoUrl: SafeUrl;

    public ContextUrl: string;
    public actionButtonCaption: string;
    public inConference: boolean;
    public InstantMessages: Array<InstantMessage>;
    public InstantMessage: InstantMessage;

    public Participants: Array<Participant>;

    public Context: string; //  context can be condidered as a "room"

    constructor(private conferenceService: ConferenceService, private sanitizer: DomSanitizer,
        private route: ActivatedRoute

    ) {

        this.actionButtonCaption = "START";

        this.InstantMessages = new Array<InstantMessage>();
        this.InstantMessage = new InstantMessage();

        this.route.params.subscribe((params: Params) => {

            if (!params.hasOwnProperty("slug")) {
                this.conferenceService.getSlug().then((randomSlug: string) => {
                    this.Context = randomSlug;
                    this.ContextUrl = "https://" + location.host + "/#/join/" + randomSlug
                });
            } else {
                this.Context = params["slug"].toString();
                this.actionButtonCaption = "JOIN";
                this.ContextUrl = "https://" + location.host + "/#/join/" + this.Context;
            }
            this.Participants = new Array<Participant>();


            this.Participants = this.conferenceService.RemoteStreams;
            this.InstantMessages = this.conferenceService.InstantMessages;

            this.conferenceService.onParticipant = (participant: Participant) => {
                this.MainVideoUrl = participant.url;
            }


        });

    }
    sendIM() {
        this.conferenceService.sendInstantMessage(this.InstantMessage);

        this.InstantMessage.text = "";
    }
    changeMainVideo(participant: Participant) {
        this.MainVideoUrl = participant.url;
    }

    joinConference() {
        navigator.getUserMedia({ audio: true, video: true }, (stream: MediaStream) => {
            this.conferenceService.addLocalMediaStream(stream);
            let blobUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(stream));
            this.LocalStreamUrl = blobUrl;
            this.conferenceService.joinConference(this.Context);
            this.inConference = true;
        }, (err) => {

            console.log("getUserMedia error", err);
        });



    }


}

