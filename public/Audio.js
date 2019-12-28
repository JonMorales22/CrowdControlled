import { Notes } from './Chords/Notes.js';

var audioCtx;

export default class Audio {
	constructor(){
        audioCtx = new window.AudioContext;
    }
    
    playSound() {
        var oscillator = audioCtx.createOscillator();
        oscillator.frequency.setValueAtTime(261.6, audioCtx.currentTime);
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime+1);   
    }

    playSound(notename, time=.5) {
        var oscillator = audioCtx.createOscillator();
        oscillator.frequency.setValueAtTime(Notes.NoteNameToFrequency[notename], audioCtx.currentTime);
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime+time); 
    }
}