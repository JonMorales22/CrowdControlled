const EventEmitter = require('events');

var midiStuff;

class Midi extends EventEmitter {
  Input;
  InputsArray = [];

  async setMidiAccess(navigator) {
    try {
      midiStuff = await navigator.requestMIDIAccess();
    }
    catch(error) {
      console.error(error)
    }
  }

  async setInputByIndex(index) {
    try {
      this.Input = this.setInput(this.InputsArray[index]);
      this.Input;
    }
    catch(error) {
      console.error(error);
    }
  }

  setInputByName(inputName) {
     var input = this.InputsArray.find( a => {
       return a.name === inputName
     })
     this.setInput(input);
  }

  setInput(input) {
     this.Input = input;
     this.Input.onmidimessage = MIDIMessageEventHandler;
     //this.Input.onstatechange = StateChangeHandler;
     var result = this.Input.open();   
  }

  getInputs() {
    var inputValues = midiStuff.inputs;
    var inputs = [];    
    midiStuff.inputs.forEach((port, key) => {
      this.InputsArray.push(port);
    })

    return this.InputsArray;
  }

  getOutputs() {
    var inputValues = midiStuff.outputs;
    var inputs = [];    
    midiStuff.inputs.forEach((port, key) => {
      this.InputsArray.push(port);
    })

    return this.InputsArray;
  }

}

function MIDIMessageEventHandler(event) {
    // Mask off the lower nibble (MIDI channel, which we don't care about)
    switch (event.data[0] & 0xf0) {
      case 0x90:
        if (event.data[2]!=0) {  // if velocity != 0, this is a note-on message
          Midis.emit("noteOn", event.data[1]);
          return;
        }
        // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
      case 0x80: {
        Midis.emit("noteOff");
        return;
      }
    }
  }

export var Midis = new Midi();
