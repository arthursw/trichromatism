var keyboard = new QwertyHancock({
     id: 'keyboard',
     width: 600,
     height: 150,
     octaves: 2
});

var context = new AudioContext(),
    masterVolume = context.createGain(),
    oscillators = {};

masterVolume.gain.value = 0.1;

masterVolume.connect(context.destination);

var getNumberOfNote = function (note) {
    var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
        key_number,
        octave;

    if (note.length === 3) {
        octave = note.charAt(2);
    } else {
        octave = note.charAt(1);
    }

    key_number = notes.indexOf(note.slice(0, -1));

    if (key_number < 3) {
        key_number = key_number + 12 + ((octave - 1) * 12) + 1;
    } else {
        key_number = key_number + ((octave - 1) * 12) + 1;
    }

    return key_number;
};

var getFrequencyOfNote = function (note) {
    var key_number = getNumberOfNote(note)

    return 440 * Math.pow(2, (key_number - 49) / 12);
};

var getNoteFromNumber = function (number) {
    var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
        key_number,
        octave;

    octave = Math.floor(number / 12)
    key_number = number % 12

    return notes[key_number] + octave;
};

keyboard.keyDown = function (note, frequency, playNote=true) {

    if(frequency == null) {
        frequency = getFrequencyOfNote(note)
    }
    // var osc = context.createOscillator(),
    //     osc2 = context.createOscillator();

    // osc.frequency.value = frequency;
    // osc.type = 'sine';
    // osc.detune.value = -10;

    // osc2.frequency.value = frequency;
    // osc2.type = 'triangle';
    // osc2.detune.value = 10;

    // osc.connect(masterVolume);
    // osc2.connect(masterVolume);

    // masterVolume.connect(context.destination);

    // oscillators[frequency] = [osc, osc2];

    // osc.start(context.currentTime);
    // osc2.start(context.currentTime);

    if(playNote) {

        let data = {velocity: 1, note: {number: getNumberOfNote(note) }}
        document.dispatchEvent(new CustomEvent('noteOn', { detail: data }));
    }
};

keyboard.keyUp = function (note, frequency) {
    // oscillators[frequency].forEach(function (oscillator) {
    //     oscillator.stop(context.currentTime);
    //     let data = {note: {number: getNumberOfNote(note) }}
    //     document.dispatchEvent(new CustomEvent('noteOff', { detail: data }));
    // });
};


document.addEventListener('cell', function (e) { 
    let note = getNoteFromNumber(e.detail)
    let frequency = getFrequencyOfNote(note)

    keyboard.keyDown(note, frequency, false)
    setTimeout(()=>{keyboard.keyUp(note, frequency)}, 50)
}, false);
