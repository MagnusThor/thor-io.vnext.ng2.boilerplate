"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChatMessage {
    constructor(message, age) {
        this.message = message;
        this.age = age;
    }
}
exports.ChatMessage = ChatMessage;
class Participant {
    constructor(stream, url, id) {
        this.stream = stream;
        this.url = url;
        this.id = id;
    }
}
exports.Participant = Participant;
class InstantMessage {
}
exports.InstantMessage = InstantMessage;
class PeerConnection {
    constructor(context, peerId) {
        this.context = context;
        this.peerId = peerId;
    }
}
exports.PeerConnection = PeerConnection;
class Signal {
    constructor(recipient, sender, message) {
        this.recipient = recipient;
        this.sender = sender;
        this.message = message;
    }
}
exports.Signal = Signal;
//# sourceMappingURL=models.js.map