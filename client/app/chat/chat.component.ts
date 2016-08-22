import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../shared/services/chat.service';
import { ChatMessage } from '../../../shared/models';


@Component({ 
  moduleId: module.id,
  selector: 'chat',
  templateUrl: 'chat.component.html'
  
 
})
export class ChatComponent implements OnInit {
  
   
    public chatMessages: Array<ChatMessage>;
    public chatMessage:ChatMessage;

    constructor(private chatService:ChatService){     
        this.chatMessages = chatService.chatMessages;
        this.chatMessage = new ChatMessage("",1);
    }
    sendMessage(){
        if(this.chatMessage.message.length === 0) return;
        this.chatService.sendMessage(this.chatMessage);
        this.chatMessage = new ChatMessage("",this.chatMessage.age);
    }
    setAge(){
        this.chatService.setAge(this.chatMessage.age);
    }
    ngOnInit() {
   
}
}

