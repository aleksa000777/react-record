'use strict';

exports.__esModule = true;
var audioCtx = null;
var analyser = null;
var AudioExists = false;

var waitForAudio = function waitForAudio() {
  var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5000;
  return new Promise(function (resolve, reject) {
    var check = function check() {
      if (typeof AudioContext !== 'undefined') {
        AudioExists = true;
        audioCtx = new window.AudioContext();
      } else if (typeof webkitAudioContext !== 'undefined') {
        AudioExists = true;

        audioCtx = new window.webkitAudioContext();
      } else if (typeof mozAudioContext !== 'undefined') {
        AudioExists = true;
        audioCtx = new window.mozAudioContext();
      }
      if (AudioExists) {
        window.cancelAnimationFrame(check);
        resolve(audioCtx);
      }
    };

    window.setTimeout(function () {
      cancelAnimationFrame(check);
      reject(new Error('Took to long to load'));
    }, timeout);
    requestAnimationFrame(check);
  });
};

waitForAudio().then(function (res) {
  audioCtx = res;
  if (audioCtx) {
    analyser = audioCtx.createAnalyser();
  }
});

var AudioContext = {
  getAudioContext: function getAudioContext() {
    return audioCtx;
  },
  getAnalyser: function getAnalyser() {
    return analyser;
  }
};

exports.default = AudioContext;
module.exports = exports['default'];