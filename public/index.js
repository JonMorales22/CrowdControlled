import PoopClient from "./Client";
import { audioElementManager } from "./AudioElementManager"
import { ChatAnalyzer } from "./TwitchChatAnalyzer";

const client = new PoopClient();
var audioCtx = new window.AudioContext;

var button = document.querySelector('#test');
var connectButton = document.querySelector('#connect');
var disconnectButton = document.querySelector('#disconnect');
var form = document.querySelector("#channelname")


// var midiAccess;
window.addEventListener('load', async() => {
    initClient("johnnycolision");
    initRainAudio();
    initAudioElementManager();
})

function initAudioElementManager() {
    const audioElements = audioElementManager.findAudioElements("audio[data-sound-type='note']");
    audioElementManager.setAudioElements(audioElements);
}

function initClient(channelName) {
    client.setChannel(channelName);
    client.connectPoop();
}

connectButton.onclick = (e) => {
    if(!form.value) {
        alert("Must specify a channel name!");
        return;
    }

    initClient(form.value);
}

disconnectButton.onclick = function() {
    client.disconnectPoop();
}

button.onclick = () => {
    console.log(gainNode.gain);
    gainNode.gain.value++;
};

// const notes = document.querySelectorAll("audio[data-sound-type='note']");


//RAIN STUFF
var rainAudio = document.querySelector("audio[data-sound-type='effect'")
rainAudio.autoplay = true;
rainAudio.loop = true;

var gainNode;

const maxValue = 2;
const minValue = .025;
const increment = .025;
const decrement = .025;

function initRainAudio() {
    var source = audioCtx.createMediaElementSource(rainAudio);
    gainNode = audioCtx.createGain();
    gainNode.gain.value=minValue;
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
}


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
// setInterval(()=>{
//     console.log(`Speed of chat = ${numMessages}`);
//     //console.log(`tanh(${numMessages/10})=${Math.tanh(numMessages/10)}`);
//     //var difference = numMessages-lastCheck;
//     // console.log(`${numMessages} - ${lastCheck} = ${difference}`);
//     // console.log(`tanh(${difference/10}})=${Math.tanh(difference/10)}`);

//     if(numMessages>threshold) { 
//         // console.log(`${numMessages} > Last check ${lastCheck}`)
//         // console.log("increment");
//         // incrementRainAudio(Math.tanh(difference/10));
//         incrementRainAudio();
//     }
//     else {
//         // console.log(`${numMessages} < Last check ${lastCheck}`)
//         // console.log("decrement");
//         // decrementRainAudio(Math.tanh(Math.abs(difference/10)));
//         decrementRainAudio();
//     }
    
//     lastCheck=numMessages;
//     numMessages=0;
// }, 2000)
