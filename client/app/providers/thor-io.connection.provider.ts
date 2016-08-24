

export class ConnectionProvider {
    private factory: ThorIOClient.Factory;
    constructor()
    {
        //todo: make url and controller array configurable
        this.factory  = new ThorIOClient.Factory("ws://localhost:1337",["broker"]);
        this.factory.OnOpen = (brokerProxy:ThorIOClient.Channel) =>{
                brokerProxy.Connect();
        }; 
    }
   
    getProxy(controller:string){
        return this.factory.GetChannel(controller);
    }
}   