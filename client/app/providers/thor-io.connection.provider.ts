export class ConnectionProviderError
{
        timeStamp: Date;
        error: any;
        constructor(error:any)
        {
            this.timeStamp = new Date();
            this.error = error;
        }
}

export class ConnectionProvider {
    private factory: ThorIO.Client.Factory;
    public isConnected: boolean;

    public errors: Array<ConnectionProviderError>;

    constructor()
    {
        this.errors = new Array<ConnectionProviderError>();
        //todo: controller array configurable
        this.factory  = new ThorIO.Client.Factory(location.origin.replace(/^http/, 'ws'),["broker"]);
        this.factory.OnOpen = (brokerProxy:ThorIO.Client.Proxy) =>{
                this.isConnected = true;
                brokerProxy.Connect();
        };
        this.factory.OnClose = () =>{
            this.isConnected = false;
        }

        this.factory.OnError = (err:any) =>
        {
            this.errors.unshift(new ConnectionProviderError(err));
            this.onError(err);
        } 
    }
    onError(err:any){
            
    }
   
    getProxy(controller:string){
        return this.factory.GetProxy(controller);
    }
}   