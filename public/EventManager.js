const EventEmitter = require('events');

class EventManager extends EventEmitter {
    constructor(){
        super();
    }
    emitEvent(event, data) {
        switch(event){
            case "MessageReceived": {
                this.emitMessageReceivedEvent(data)
            } 
        }
    }

    emitMessageReceivedEvent(message) {
        //console.log("Message received: " + message)
        this.emit("MessageReceived", message);
    }

    emitEmoteEvent(emote) {
        // console.log("EmoteEvent: " + emote)
        this.emit("EmoteReceived", emote);
    }
}

export var eventManager = new EventManager();