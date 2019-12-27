class NotesUtility {

  ChordTypes = {
    Major: 'Major',
    Minor: 'Minor',
    Diminished: 'Diminished'
  }
  
  MidiToFrequency = {
    60: 261.63,
    62: 293.66,
    64: 329.63,
    65: 349.23,
    67: 392.00,
    69: 440.00,
    71: 493.88,
    72: 523.25,
    74: 587.32,
    76: 659.25,
    77: 698.45,
    79: 783.98,
    81: 880.00,
    83: 987.76,
    84: 1046.50,
  }

  FrequencyToMidi = {
    261.63: 60,
    293.66: 62,
    329.63: 64,
    349.23: 65,
    392.00: 67,
    440.00: 69,
    493.88: 71,
    523.25: 72,
    587.32: 74, 
    659.25: 76, 
    698.45: 77, 
    783.98: 79, 
    880.00: 81, 
    987.76: 83, 
    1046.50: 84
  }

  MidiToNoteName = {
    60: "c4",
    61: "c#4",
    62: "d4",
    63: "d#4",
    64: "e4",
    65: "f4",
    66: "f#4",
    67: "g4",
    68: "g#4",
    69: "a4",
    70: "a#4",
    71: "b4",
    72: "c5"
  }

  NoteNameToFrequency = {
    "c4": 261.63, 
    "d4": 293.66, 
    "e4": 329.63, 
    "f4": 349.23, 
    "g4": 392.00, 
    "a4": 440.00, 
    "b4": 493.88, 
    "c5": 523.25
  }

  FrequencyToNoteName = {
    261.63: "c4", 
    293.66: "d4", 
    329.63: "e4", 
    349.23: "f4", 
    392.00: "g4", 
    440.00: "a4", 
    493.88: "b4", 
    523.25: "c5",
    587.32: "d5", 
    659.25: "e5", 
    698.45: "f5", 
    783.98: "g5", 
    880.00: "a5", 
    987.76: "b5", 
    1046.50: "c6" 
  }

  GetNoteFrequenciesArray() {
    var NoteFrequenicesArray = []
    for(var key in this.NoteNameToFrequency) 
      NoteFrequenicesArray.push( this.NoteNameToFrequency[key] );
    
    return NoteFrequenicesArray;
  }

  GetMidiNotesArray() {
    var MidiNotesArray = []
    
    for(var key in this.FrequencyToMidi) 
      MidiNotesArray.push(this.FrequencyToMidi[key]);
    
    return MidiNotesArray;
  }

  CalcFrequencyFromNoteNumber( note ) { return Round(440 * Math.pow(2,(note-69)/12), 2); }
  CalcNoteNumberFromFrequency( freq ) { return 69 + ( 12 * Math.log2(freq/440)) }
}

function Round(value, decimals) { return Number(Math.round(value+'e'+decimals)+'e-'+decimals); }

export var Notes = new NotesUtility();