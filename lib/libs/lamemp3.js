"use strict";

exports.__esModule = true;

var _lamejs = require("lamejs");

var _lamejs2 = _interopRequireDefault(_lamejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConvertToMP3 = function ConvertToMP3(blobWavUrl) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open("GET", blobWavUrl, true);
    request.responseType = "arraybuffer";
    // Our asynchronous callback
    request.onload = function () {
      var audioData = request.response;
      var wav = _lamejs2.default.WavHeader.readHeader(new DataView(audioData));
      var samples = new Int16Array(audioData, wav.dataOffset, wav.dataLen / 2);
      resolve(encodeMono(wav.channels, wav.sampleRate, samples));
    };
    request.send();
  });
};

var encodeMono = function encodeMono(channels, sampleRate, samples) {
  var buffer = [];
  var mp3enc = new _lamejs2.default.Mp3Encoder(channels, sampleRate, 128);
  var remaining = samples.length;
  var maxSamples = 1152;
  for (var i = 0; remaining >= maxSamples; i += maxSamples) {
    var mono = samples.subarray(i, i + maxSamples);
    var mp3buf = mp3enc.encodeBuffer(mono);
    if (mp3buf.length > 0) {
      buffer.push(new Int8Array(mp3buf));
    }
    remaining -= maxSamples;
  }
  var d = mp3enc.flush();
  if (d.length > 0) {
    buffer.push(new Int8Array(d));
  }
  var blob = new Blob(buffer, { type: 'audio/mp3' });
  var blobURL = window.URL.createObjectURL(blob);
  var newBlobObject = {
    blob: blob,
    blobURL: blobURL
  };
  return newBlobObject;
};

exports.default = ConvertToMP3;
module.exports = exports["default"];