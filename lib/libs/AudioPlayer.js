'use strict';

exports.__esModule = true;

var _AudioContext = require('./AudioContext');

var _AudioContext2 = _interopRequireDefault(_AudioContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var audioSource = void 0;

var AudioPlayer = {
  create: function create(audioElem) {
    var audioCtx = _AudioContext2.default.getAudioContext();
    if (!audioCtx) return false;
    var analyser = _AudioContext2.default.getAnalyser();

    if (audioSource === undefined) {
      var source = audioCtx.createMediaElementSource(audioElem);
      source.connect(analyser);
      audioSource = source;
    }

    analyser.connect(audioCtx.destination);
  }
};

exports.default = AudioPlayer;
module.exports = exports['default'];