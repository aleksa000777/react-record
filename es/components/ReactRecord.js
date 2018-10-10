function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// cool blog article on how to do this: http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

// distortion curve for the waveshaper, thanks to Kevin Ennis
// http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion

import React, { Component } from "react";
import MicrophoneRecorder from "../libs/MicrophoneRecorder";
import AudioPlayer from "../libs/AudioPlayer";

var ReactRecord = function (_Component) {
  _inherits(ReactRecord, _Component);

  function ReactRecord(props) {
    _classCallCheck(this, ReactRecord);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      microphoneRecorder: null
    };
    return _this;
  }

  ReactRecord.prototype.componentDidMount = function componentDidMount() {
    if (!AudioPlayer) return;
    var _props = this.props,
        onSave = _props.onSave,
        onStop = _props.onStop,
        onStart = _props.onStart,
        onData = _props.onData,
        audioElem = _props.audioElem,
        audioBitsPerSecond = _props.audioBitsPerSecond,
        mimeType = _props.mimeType;

    var options = {
      audioBitsPerSecond: audioBitsPerSecond,
      mimeType: mimeType
    };

    if (audioElem) {
      AudioPlayer.create(audioElem);
    } else {
      this.setState({
        microphoneRecorder: new MicrophoneRecorder(onStart, onStop, onSave, onData, options)
      });
    }
  };

  ReactRecord.prototype.render = function render() {
    var _props2 = this.props,
        record = _props2.record,
        onStop = _props2.onStop,
        children = _props2.children;
    var microphoneRecorder = this.state.microphoneRecorder;


    if (microphoneRecorder) {
      if (record) {
        microphoneRecorder.startRecording();
      } else {
        microphoneRecorder.stopRecording(onStop);
      }
    }

    return React.createElement(
      React.Fragment,
      null,
      children
    );
  };

  return ReactRecord;
}(Component);

export { ReactRecord as default };


ReactRecord.defaultProps = {
  className: "record",
  audioBitsPerSecond: 128000,
  mimeType: "audio/webm;codecs=opus",
  record: false
};