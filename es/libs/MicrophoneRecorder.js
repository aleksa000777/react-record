function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import MediaRecorder from "audio-recorder-polyfill";
import ConvertToMP3 from "./lamemp3";

var mediaRecorder = void 0;
var chunks = [];
var startTime = void 0;
var mediaOptions = void 0;
var onStartCallback = void 0;
var onStopCallback = void 0;
var onSaveCallback = void 0;
var onDataCallback = void 0;

var constraints = { audio: true };

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

var MicrophoneRecorder = function MicrophoneRecorder(onStart, onStop, onSave, onData, options) {
  var _this = this;

  _classCallCheck(this, MicrophoneRecorder);

  this.startRecording = function () {
    startTime = Date.now();
    if (!mediaRecorder) {
      if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia(constraints).then(function (str) {
          mediaRecorder = new MediaRecorder(str);
          if (onStartCallback) {
            onStartCallback();
          }
          mediaRecorder.addEventListener("dataavailable", function (e) {
            chunks = e.data;
            if (onDataCallback) {
              onDataCallback(e.data);
            }
          });

          mediaRecorder.start();
          mediaRecorder.addEventListener("stop", _this.onStop);
        }).catch(function (err) {
          return console.log(err.name + ": " + err.message);
        });
      } else {
        alert("Your browser does not support audio recording");
      }
    }
  };

  this.stopRecording = function () {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks()[0].stop();
      mediaRecorder.stream.getTracks().forEach(function (i) {
        return i.stop();
      });
    }
    mediaRecorder = null;
  };

  this.onStop = function () {
    var blobObject = void 0;
    var blobWavUrl = window.URL.createObjectURL(chunks);

    ConvertToMP3(blobWavUrl).then(function (blobObj) {
      blobObject = {
        blob: blobObj.blob,
        startTime: startTime,
        stopTime: window.Date.now(),
        options: mediaOptions,
        blobURL: blobObj.blobURL
      };
      chunks = [];

      if (onStopCallback) {
        onStopCallback(blobObject);
      }
      if (onSaveCallback) {
        onSaveCallback(blobObject);
      }
    }).catch(function (err) {
      console.error('Augh, there was an error!', err.statusText);
    });
  };

  onStartCallback = onStart;
  onStopCallback = onStop;
  onSaveCallback = onSave;
  onDataCallback = onData;
  mediaOptions = options;
};

export { MicrophoneRecorder as default };