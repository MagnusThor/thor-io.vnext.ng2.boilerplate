import {
ThorIO,CanInvoke,CanSet,ControllerProperties

} from 'thor-io.vnext'

import { ChatMessage } from '../client/app/shared/models'; //should be in root/shared


@ControllerProperties("chat",false)
export class ChatController extends ThorIO.Controller
{
    @CanSet(true)
    age:number;
    constructor(connection:ThorIO.Connection){
        super(connection);
        this.age = 1;
    }
    @CanInvoke(true)
    sendMessage(message:ChatMessage){
         var expression = (pre: ChatController) => {
            return pre.age >= this.age;
        };
        this.invokeTo(expression,message,"chatMessage",this.alias);
    }
  
}