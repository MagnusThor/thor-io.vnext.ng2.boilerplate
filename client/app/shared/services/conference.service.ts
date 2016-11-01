import { Injectable } from '@angular/core';
import {ConnectionProvider} from '../../providers/thor-io.connection.provider'
import {Signal, PeerConnection, InstantMessage, Participant} from '../../../../shared/models'
import {DomSanitizationService, SafeUrl} from '@angular/platform-browser';

@Injectable()
export class ConferenceService {

    private rtc: ThorIO.Client.WebRTC;

    public RemoteStreams: Array<Participant>;
    public InstantMessages: Array<InstantMessage>;
    private proxy: ThorIO.Client.Proxy;

    public context: string;

    constructor(private connProvider: ConnectionProvider, private sanitizer: DomSanitizationService) {

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

        this.rtc = new ThorIO.Client.WebRTC(this.proxy, config);
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



