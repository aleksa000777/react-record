// cool blog article on how to do this: http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

// distortion curve for the waveshaper, thanks to Kevin Ennis
// http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion

import React, { Component } from "react";
import MicrophoneRecorder from "../libs/MicrophoneRecorder";
import AudioPlayer from "../libs/AudioPlayer";

export default class ReactRecord extends Component {
 constructor(props) {
   super(props);
   this.state = {
     microphoneRecorder: null
   };
 }

 componentDidMount() {
   if(!AudioPlayer) return
   const { onSave, onStop, onStart, onData, audioElem, audioBitsPerSecond, mimeType } = this.props;
   const options = {
     audioBitsPerSecond,
     mimeType
   };

   if (audioElem) {
     AudioPlayer.create(audioElem);
   } else {
     this.setState({
       microphoneRecorder: new MicrophoneRecorder(onStart, onStop, onSave, onData, options)
     });
   }
 }

 render() {
   const { record, onStop, children } = this.props;
   const { microphoneRecorder } = this.state;

   if (microphoneRecorder) {
     if (record) {
       microphoneRecorder.startRecording();
     } else {
       microphoneRecorder.stopRecording(onStop);
     }
   }

   return <React.Fragment>{children}</React.Fragment>;
 }
}

ReactRecord.defaultProps = {
 className: "record",
 audioBitsPerSecond: 128000,
 mimeType: "audio/webm;codecs=opus",
 record: false
};
