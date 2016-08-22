

export class ConnectionProvider {
    private factory: ThorIOClient.Factory;
    constructor()
    {
        this.factory  = new ThorIOClient.Factory("ws://localhost:1337",["chat"]);
        this.factory.OnOpen = (chatProxy:ThorIOClient.Channel) =>{
                chatProxy.Connect();
        };
    }
   
    getProxy(controller:string){
        return this.factory.GetChannel(controller);
    }
}   