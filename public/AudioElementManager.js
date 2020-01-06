import { eventManager } from "./EventManager"

var emoteToAudio = {
    "kekw": "C4",
    "pog": "E4",
    "lul": "G4",
    ":)": "D4",
    "kapp": "A4",
    "pepe": "E1"
};

var audioElements = [];

class AudioElementManager {
    play(audioKey) {
        const audio = this.selectAudio(audioKey);
        console.log(audioKey);
        if(!audio)
            return;

        audio.currentTime=0;
        audio.play();
    }

    selectAudio(audioKey) {
        var audio;
        audioElements.forEach(e=>{
            if(e.dataset.key==audioKey) {
                audio = e;
                return;
            }
        })
        return audio;
    }

    findAudioElements(query) {
        return document.querySelectorAll(query);
    }

    setAudioElements(elements) {
        audioElements=elements;
    }
}

function findRandomNote() {
    var index = Math.floor((Math.random()*notes.length));
    return notes[index];
}

export var audioElementManager = new AudioElementManager();
eventManager.on("EmoteReceived", emote => {
    audioElementManager.play(emoteToAudio[emote]);
})