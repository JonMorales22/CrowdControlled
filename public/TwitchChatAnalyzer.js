import { eventManager } from "./EventManager";

// const EventEmitter = require("events");
// var eventManager = new EventManager();

export default class TwitchChatAnalyzer  {
    // constructor() {
    //     //super();
    //     this.handlePoop = this.handlePoop.bind(this);
    // }
    analyzeMessage(message){
        message = message.toLowerCase()
        
        if(message.includes("kekw")) {
            return "kekw";
        }
        else if(message.includes("pog")) {
            return "pog";	
        }
        else if(message.includes("lul")) {
            return "lul";	
        }
        else if(message.includes(":)")) {
            return ":)";	
        }
        else if(message.includes("kapp")) {
            return "kapp";	
        }
        else if(this.isPepe(message)) {
            return "pepe";
        }
    }
    
    isPepe(message) {
        if(message.includes("pepe") || message.includes("peepo") || message.includes("pepo") || message.includes("monk"))
            return true;    
    }

    handlePoop(message) {
        const emote = this.analyzeMessage(message);
        // console.log("Poop Handled: " + message);
        
        if(!emote)
            return;
        
            eventManager.emitEmoteEvent(emote);
    }
}

export var ChatAnalyzer = new TwitchChatAnalyzer();
eventManager.on("MessageReceived", message => ChatAnalyzer.handlePoop(message))