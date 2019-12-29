import PoopClient from "./Client.js"
import { Midis } from "./Midis.js";
import Audio from './Audio.js';
import { Notes } from "./Chords/Notes.js"

var audio = new Audio();
var client = new PoopClient();

var button = document.querySelector('#test');
var connectButton = document.querySelector('#connect');
var disconnectButton = document.querySelector('#disconnect');
var form = document.querySelector("#channelname")

var midiAccess;

window.addEventListener('load', async() => {
    midiAccess = await navigator.requestMIDIAccess();
    // midiAccess.outputs.forEach((port, key) => {
    //     console.log(port);
    // })
    // sendNote();
    client.setChannel("pokimane");
    client.connectPoop(handleMessageEvent);
})

// function sendNote(noteName="c4", time=500.0 ) {
//     var noteOnMessage = [0x90, Notes.NoteNameToMidi[noteName], 0x7f];    // note on, middle C, full velocity
//     var output = midiAccess.outputs.get(371816370);
//     output.send( noteOnMessage );  //omitting the timestamp means send immediately.
//     output.send( [0x80, Notes.NoteNameToMidi[noteName], 0x40], window.performance.now() + time); // Inlined array creation- note off, middle C,  
//                                                                         // release velocity = 64, timestamp = now + 1000ms.
// }

// function sendNoteMidi(midiNote=60, time=1000.0) {
//     var noteOnMessage = [0x90, midiNote, 0x7f];    // note on, middle C, full velocity
//     var output = midiAccess.outputs.get(371816370);
//     output.send( noteOnMessage );  //omitting the timestamp means send immediately.
//     output.send( [0x80, midiNote, 0x40], window.performance.now() + time); // Inlined array creation- note off, middle C,  
//                                                                         // release velocity = 64, timestamp = now + 1000ms.
// }

connectButton.onclick = (e) => {
    if(!form.value) {
        alert("Must specify a channel name!");
        return;
    }

    client.setChannel(form.value);
    client.connectPoop(handleMessageEvent);
}

disconnectButton.onclick = function() {
    client.disconnectPoop();
}

button.onclick = () => playNote("B3");

function playNote(note) {
    var audio = document.querySelector(`audio[data-key='${note}']`)
    audio.currentTime=0;
    audio.play();
}

function handleMessageEvent(message) {
	var message = message.toLowerCase();
    // console.log(message);
	if(message.includes("kekw")) {
		playNote("C4");
		return;
	}
	if(message.includes("pog")) {
		playNote("E4");	
		return;
	}
	if(message.includes("lul")) {
		playNote("G4");
		return;
	}
	if(message.includes(":)")) {
		playNote("D4");
		return;
	}
	if(message.includes("kappa")) {
		playNote("A4");
		return;
    }
    if(isPepe(message)) {
        const note = findRandomNote();
        playNote(note.dataset.key);
    }
}

function isPepe(message) {
    if(message.includes("pepe") || message.includes("peepo") || message.includes("pepo") || message.includes("monk"))
        return true;    
}

const notes = document.querySelectorAll("audio");
console.log("notes: " + notes);
function findRandomNote() {
    var index = Math.floor((Math.random()*notes.length));
    return notes[index];
}