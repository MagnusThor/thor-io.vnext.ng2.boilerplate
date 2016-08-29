import {
    ThorIO,CanInvoke,CanSet,ControllerProperties
} from "thor-io.vnext"

import {PeerConnection,Signal,InstantMessage} from '../shared/models'


// Set the alias to broker, controller is not seald and send ping/pong each 7500 ms
@ControllerProperties("broker",false,7500)
export class BrokerController  extends ThorIO.Controller
{
    public Connections:Array<PeerConnection>;
    public Peer:PeerConnection;

    constructor(connection:ThorIO.Connection){
        super(connection);
        this.Connections = new Array<PeerConnection>();    
    }
    onopen(){
        this.Peer = new PeerConnection(ThorIO.Utils.newGuid(),this.connection.id);
        this.invoke(this.Peer,"contextCreated",this.alias);
    }

    // This method deals with instant messages ( chat )
    @CanInvoke(true)
    instantMessage(instantMessage:InstantMessage) {
        var expression = (pre: BrokerController) => {
            return pre.Peer.context >= this.Peer.context
        }; // make sure we only send to Peer's at the came context / room
        this.invokeTo(expression, instantMessage, "instantMessage", this.alias);
    }
  
    @CanInvoke(true)
    changeContext(change:PeerConnection){
        this.Peer.context = change.context;
        this.invoke(this.Peer,"contextChanged",this.alias);
    }
    @CanInvoke(true)
    contextSignal(signal:Signal){
            let expression = (pre: BrokerController) => {
            return pre.connection.id === signal.recipient;
        };
        this.invokeTo(expression,signal,"contextSignal",this.alias);
    }
    @CanInvoke(true)
    connectContext(){
        let connections = this.getPeerConnections(this.Peer).map( (p:BrokerController) => {return p.Peer });
         this.invoke(connections,"connectTo",this.alias);
    }
    @CanInvoke(false)
    private getPeerConnections(peerConnetion:PeerConnection):Array<BrokerController>{
            let match = this.findOn(this.alias,(pre:BrokerController) => {
                    return pre.Peer.context === this.Peer.context && pre.Peer.peerId !== peerConnetion.peerId
                });
        return match;
    }
}