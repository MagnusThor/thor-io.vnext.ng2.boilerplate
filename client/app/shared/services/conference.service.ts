import { Injectable } from '@angular/core';
import {ConnectionProvider} from '../../providers/thor-io.connection.provider'
import {Signal, PeerConnection, InstantMessage, Participant} from '../../../../shared/models'
import {DomSanitizationService, SafeUrl} from '@angular/platform-browser';

@Injectable()
export class ConferenceService {

    private rtc: ThorIOClient.WebRTC;

    public RemoteStreams: Array<Participant>;
    public InstantMessages: Array<InstantMessage>;
    private proxy: ThorIOClient.Channel;

    public context: string;

    constructor(private connProvider: ConnectionProvider, private sanitizer: DomSanitizationService) {
        this.proxy = connProvider.getProxy("broker");



        this.RemoteStreams = new Array<Participant>();
        this.InstantMessages = new Array<InstantMessage>();

        let config = {
            iceServers: [
                {
                    url: "stun:stun.l.google.com:19302"
                }
            ]
        };

        this.rtc = new ThorIOClient.WebRTC(this.proxy, config);

        this.rtc.onRemoteStream = (stream: MediaStream, connection: ThorIOClient.Connection) => {

            let safeUrl = sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(stream));
            let participant = new Participant(stream,
                safeUrl,
                stream.id
            );
            this.onParticipant(participant);
            this.RemoteStreams.push(participant);
        };

        this.rtc.remoteStreamlost = (streamId, peerId) => {
            var remoteStream = this.findMediaStream(streamId);
            this.RemoteStreams.splice(this.RemoteStreams.indexOf(remoteStream), 1);
        };

        this.proxy.On("contextChanged", (context: string) => {
            this.context = context;
            this.proxy.Invoke("connectContext", {});
        });

        this.proxy.On("connectTo", (peers: Array<PeerConnection>) => {
            this.rtc.connect(peers);
        });
        this.proxy.On("contextCreated", (peerConnection: PeerConnection) => {
            this.rtc.localPeerId = peerConnection.peerId;
            this.context = peerConnection.context;
        });

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
        this.rtc.addLocalStream(stream);
    };

    connectContext(context: string) {
        this.proxy.Invoke("connectContext", { context: context });
    }

    sendInstantMessage(instantMessage: InstantMessage) {
        this.proxy.Invoke("instantMessage", instantMessage);
    }
}



