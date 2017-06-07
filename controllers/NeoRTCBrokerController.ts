import {
    ThorIO,
    ControllerProperties,
    CanInvoke,
    CanSet
} from 'thor-io.vnext'
@ControllerProperties("neoBroker", false, 2000)
export class NeoRTCBrokerController extends ThorIO.Controllers.BrokerController {


    constructor(connection: ThorIO.Connection) {
        super(connection);
    }

    @CanInvoke(true)
    fileShare(fileInfo, topic, controlle, blob) {
        this.invokeToAll(fileInfo, "fileShare", this.alias, blob);
    }


}