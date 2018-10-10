import AudioContext from './AudioContext';

var audioSource = void 0;

var AudioPlayer = {
  create: function create(audioElem) {
    var audioCtx = AudioContext.getAudioContext();
    if (!audioCtx) return false;
    var analyser = AudioContext.getAnalyser();

    if (audioSource === undefined) {
      var source = audioCtx.createMediaElementSource(audioElem);
      source.connect(analyser);
      audioSource = source;
    }

    analyser.connect(audioCtx.destination);
  }
};

export default AudioPlayer;