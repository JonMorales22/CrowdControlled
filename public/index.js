import PoopClient from "./Client";
//import { eventManager } from "./EventManager"
import { ChatAnalyzer } from "./TwitchChatAnalyzer";

//ChatAnalyzer.on("MessageReceveid", message => console.log("chat analyzer"))
// import { Midis } from "./Midis.js";
// import Audio from './Audio.js';
// import { Notes } from "./Chords/Notes.js"

// var audio = new Audio();
const client = new PoopClient();
var audioCtx = new window.AudioContext;

// client.on("MessageReceived", message => {
//     chatAnalyzer.handlePoop(message);
// })

// chatAnalyzer.on("Emote", emote => {
//     playNote(emoteToNote[emote]);
// })

// chatAnalyzer.on("Emote", emote=> {
//     numMessages++;
// })

var emoteToNote = {
    "kekw": "C4",
    "pog": "E4",
    "lul": "G4",
    ":)": "D4",
    "kapp": "A4"
};

var button = document.querySelector('#test');
var connectButton = document.querySelector('#connect');
var disconnectButton = document.querySelector('#disconnect');
var form = document.querySelector("#channelname")
var rainAudio = document.querySelector("audio[data-sound-type='effect'")
rainAudio.autoplay = true;
rainAudio.loop = true;

// var midiAccess;
var gainNode;
window.addEventListener('load', async() => {
    client.setChannel("GamesDoneQuick");
    client.connectPoop();
    //emoteToNote["pepe"] = findRandomNote().dataset.key;
    var source = audioCtx.createMediaElementSource(rainAudio);
    gainNode = audioCtx.createGain();
    console.log(gainNode.gain.maxValue);
    gainNode.gain.value=minValue;
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
})

connectButton.onclick = (e) => {
    if(!form.value) {
        alert("Must specify a channel name!");
        return;
    }

    client.setChannel(form.value);
    client.connectPoop(analyzeMessage);
}

disconnectButton.onclick = function() {
    client.disconnectPoop();
}

button.onclick = () => {
    console.log(gainNode.gain);
    gainNode.gain.value++;
};

function playNote(note) {
    var audio = document.querySelector(`audio[data-key='${note}']`)
    audio.currentTime=0;
    audio.play();
}

const notes = document.querySelectorAll("audio[data-sound-type='note']");
function findRandomNote() {
    var index = Math.floor((Math.random()*notes.length));
    return notes[index];
}


//RAIN STUFF
const maxValue = 2;
const minValue = .025;
const increment = .025;
const decrement = .025;

function incrementRainAudio() {
    var volume = gainNode.gain.value;
    volume += increment;
    if(volume>=maxValue)
        volume=maxValue;
    gainNode.gain.value = volume;
}

function decrementRainAudio() {
    var volume = gainNode.gain.value;
    volume -= decrement;
    if(volume<=minValue)
        volume=minValue;
    gainNode.gain.value = volume;
}

var numMessages = 0;
var lastCheck = 0;
var threshold=3;
setInterval(()=>{
    console.log(`Speed of chat = ${numMessages}`);
    //console.log(`tanh(${numMessages/10})=${Math.tanh(numMessages/10)}`);
    //var difference = numMessages-lastCheck;
    // console.log(`${numMessages} - ${lastCheck} = ${difference}`);
    // console.log(`tanh(${difference/10}})=${Math.tanh(difference/10)}`);

    if(numMessages>threshold) { 
        // console.log(`${numMessages} > Last check ${lastCheck}`)
        // console.log("increment");
        // incrementRainAudio(Math.tanh(difference/10));
        incrementRainAudio();
    }
    else {
        // console.log(`${numMessages} < Last check ${lastCheck}`)
        // console.log("decrement");
        // decrementRainAudio(Math.tanh(Math.abs(difference/10)));
        decrementRainAudio();
    }
    
    lastCheck=numMessages;
    numMessages=0;
}, 2000)
