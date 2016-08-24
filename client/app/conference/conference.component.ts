import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { ConferenceService } from '../shared/services/conference.service';
import { Participant, InstantMessage, PeerConnection } from '../../../shared/models';
import {DomSanitizationService, SafeUrl} from '@angular/platform-browser';

// @Pipe({
//     name: 'sanitizeUrl'
// })
// class SanitizeUrl implements PipeTransform  {

//    constructor(private _sanitizer: DomSanitizationService){}  

//    transform(v: string) : SafeUrl {
//       return this._sanitizer.bypassSecurityTrustUrl(v); 
//    } 
// } 

@Component({
    moduleId: module.id,
    selector: 'conference',
    templateUrl: 'conference.component.html',
    pipes: [
        //   SanitizeUrl
    ]


})
export class ConferenceComponent implements OnInit {


    LocalStreamUrl: SafeUrl;
    MainVideoUrl: SafeUrl;

    public inConference: boolean;
    public InstantMessages:Array<InstantMessage>;
    public InstantMessage:InstantMessage;

    public Participants: Array<Participant>;

    public Context: string; //  context can be condidered as a "room"

    constructor(private conferenceService: ConferenceService, private sanitizer: DomSanitizationService) {
        this.InstantMessages = new Array<InstantMessage>();
        this.InstantMessage = new InstantMessage();
        this.InstantMessage = new InstantMessage();
                
        this.Participants = new Array<Participant>();
        navigator.getUserMedia({ audio: false, video: true }, (stream: MediaStream) => {
            this.LocalStreamUrl = sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(stream));
            conferenceService.addLocalMediaStream(stream);
        }, (err) => {
            // deal with the gum error
            console.log("getUserMedia error", err);
        })

        this.Participants = conferenceService.RemoteStreams;
        this.InstantMessages = conferenceService.InstantMessages;

        conferenceService.onParticipant = (p: Participant) => {
            this.MainVideoUrl = p.url;
        }
        this.Context = "foo"
    }
    sendIM()
    {
        this.conferenceService.sendInstantMessage(this.InstantMessage);

        this.InstantMessage.text = "";
    }
    changeMainVideo(participant:Participant)
    {
       
        this.MainVideoUrl =  this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(participant.stream));
    }

    joinConference() {
        this.conferenceService.joinConference(this.Context);
        this.inConference = true;
    }

    ngOnInit() {

    }
}

