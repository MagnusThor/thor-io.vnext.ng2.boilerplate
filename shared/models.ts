import {SafeUrl} from '@angular/platform-browser';

export class ChatMessage{
    message:string;
    age:number;
    constructor(message:string,age:number){
       
        this.message = message;
         this.age = age;
    }
}

export class Participant{
    stream: MediaStream;
    url: SafeUrl;
    id:string;
    constructor(stream:MediaStream,url:SafeUrl,id:string){
        this.stream = stream;
        this.url =url;
        this.id = id;
    }
}

export class InstantMessage
{
    text: string;
    timeStamp: Date;
}

export class PeerConnection {
        context:string;
        peerId: string;
        constructor(context?:string,peerId?:string){
            this.context = context;
            this.peerId = peerId;
        }
}
export class Signal {
    recipient:string;
    sender:string;
    message:string
    constructor(recipient:string,sender:string,message:string){
        this.recipient = recipient;
        this.sender = sender;
        this.message = message;
    }
}