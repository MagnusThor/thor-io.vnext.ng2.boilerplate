import { Injectable } from '@angular/core';
import {ConnectionProvider} from '../../providers/thor-io.connection.provider'
import {ChatMessage} from '../../../../shared/models'

@Injectable()
     export class ChatService {

     chatMessages: Array<ChatMessage>;

     private chatProxy: ThorIOClient.Channel; 
  
    constructor(private connProvider:ConnectionProvider) {
        this.chatMessages = new Array<ChatMessage>();
        this.chatProxy = connProvider.getProxy("chat");

        this.chatProxy.On("chatMessage",(message:ChatMessage) => {
                this.chatMessages.unshift(message);
        });
    }

    
    sendMessage(chatMessage:ChatMessage) {
    
        this.chatProxy.Invoke("sendMessage",chatMessage,"chat");
        
    }

    setAge(age:number) {
       this.chatProxy.SetProperty("age",age);
    }
}



