import { Injectable } from '@angular/core';
import {ConnectionProvider} from '../../providers/thor-io.connection.provider'
import {ThorIOClient} from 'thor-io.client-vnext'
import {Signal, PeerConnection, InstantMessage, Participant} from '../../../../shared/models'
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { Http, Response, Jsonp,Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

@Injectable()
export class ConferenceService {


    private rtc: ThorIOClient.WebRTC;

    public RemoteStreams: Array<Participant>;
    public InstantMessages: Array<InstantMessage>;
    private proxy: ThorIOClient.Proxy;

    public context: string;

    constructor(private connProvider: ConnectionProvider, private sanitizer: DomSanitizer,private http:Http) {

        this.proxy = connProvider.getProxy("contextBroker");
        this.RemoteStreams = new Array<Participant>();
        this.InstantMessages = new Array<InstantMessage>();
        let config = {
            iceTransports: 'all',
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302"
                }
            ]
        };
        // add your own STUN / turn servers ..

        this.rtc = new ThorIOClient.WebRTC(this.proxy, config);

        // limit video and audio

        this.rtc.setBandwithConstraints(500,50);

        this.rtc.OnContextCreated= () => {

        }

        this.rtc.OnLocalStream = () => {}

        this.rtc.OnRemoteStream = (stream: MediaStream) => {
            let safeUrl = sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(stream));
            let participant = new Participant(stream,
                safeUrl,
                stream.id
            );
            this.onParticipant(participant);
            this.RemoteStreams.push(participant);
        };
        this.rtc.OnRemoteStreamlost = (streamId, peerId) => {
            var remoteStream = this.findMediaStream(streamId);
            this.RemoteStreams.splice(this.RemoteStreams.indexOf(remoteStream), 1);
        };
         this.rtc.OnContextChanged =  (context: string) => {
             this.context = context;
             this.rtc.ConnectContext();
        };
        
        this.proxy.On("instantMessage", (message:InstantMessage) =>{
                    this.InstantMessages.unshift(message);
        });
    }


    public onParticipant(participant: Participant) {
    }

    getSlug():Observable<string>{
       
        return this.http.get("/data/slugs.json"
       
        ).map( (res:Response) => {
               let slugs = res.json();
               return slugs[Math.floor(Math.random() * slugs.length) ].toString().toLowerCase();
        });
    }

    joinConference(context: string) {
        this.proxy.Invoke("changeContext", { context: context });
    }

    findMediaStream(streamId: string): Participant {
        var match = this.RemoteStreams.find((pre: Participant) => {
            return pre.id === streamId;
        });
      
        return match;
    }

    addLocalMediaStream(stream: MediaStream) {
      
        this.rtc.AddLocalStream(stream);
    };

    connectContext(context: string) {
        this.proxy.Invoke("connectContext", { context: context });
    }

    sendInstantMessage(instantMessage: InstantMessage) {
        instantMessage.timeStamp = new Date();
        this.proxy.Invoke("instantMessage", instantMessage);
    }
}



