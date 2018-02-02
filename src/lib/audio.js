import * as loaders from 'waves-loaders';

// safari compatible
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();


class SampleSynth {
    constructor(buffer) {
        this.buffer = buffer;
        this.output = audioContext.createGain();
        // this.trigger = this.trigger.bind(this);
    }
    startTrigger() {
        const src = audioContext.createBufferSource();
        src.buffer = this.buffer;
        src.connect(audioContext.destination);
        src.start(0);
    }
    stopTrigger() {
        this.src.stop(0);
    }
}

let sampleSynths = [];

function init(buffers) {
  buffers.forEach(buffer => {
    const synth = new SampleSynth(buffer);
    sampleSynths.push(synth);
  });
}

function loadSoundIntoBuffers(buffers, callback) {
  const loader = new loaders.AudioBufferLoader();
  loader
    .load(buffers) // return a Promise
    .then(callback); 
}

function loadSounds(buffers) {
    loadSoundIntoBuffers(buffers, init);
}

function deleteSynths() {
    sampleSynths = [];
}

function playSound(index) {
    sampleSynths[index - 1].startTrigger();
}

function stopSound(index) {
    sampleSynths[index - 1].stopTrigger();
}

function stopAllSounds() {
    // TODO if needed
}



export { loadSounds, playSound, stopSound, stopAllSounds};


