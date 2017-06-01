import {ThorIOClient} from 'thor-io.client-vnext';

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
    private factory: ThorIOClient.Factory;
    public isConnected: boolean;

    public errors: Array<ConnectionProviderError>;

    constructor()
    {
        this.errors = new Array<ConnectionProviderError>();
        //todo: controller array configurable
      
        this.factory  = new ThorIOClient.Factory(location.origin.replace(/^http/, 'ws')
        ,["contextBroker"]);
        this.factory.OnOpen = (brokerProxy:ThorIOClient.Proxy) =>{
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