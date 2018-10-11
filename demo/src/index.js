import React, {Component}          from 'react';
import { render }                  from 'react-dom';

import ReactRecord from '../../src';

require ('./styles.scss');

export default class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      blobObject: null,
      isRecording: false,
      active: false
    }
  }

  startRecording= () => {
    console.log("startRecording");
    this.setState({
      isRecording: true
    });
  }

  stopRecording= () => {
    console.log("stopRecording");

    this.setState({
      isRecording: false,
      active: false
    });
  }

  onSave = (blobObject) => {
    console.log('onSave: ', blobObject);
  }

  onStart = () => {
    console.log("onStart");

    this.setState({
      active: true
    });
  }

  onStop = (blobObject) => {
    console.log("onStop");

    this.setState({
      blobURL : blobObject.blobURL
    });
    console.log("URL: ", blobObject.blobURL)
  }

  onData(recordedBlob){
    console.log('data: ', recordedBlob);
  }

  render() {
    const { isRecording } = this.state;
    return(
        <div>
          <h1>React-Mic</h1>
          <p><a href="https://github.com/aleksa000777/react-record">Documentation</a></p>
          <ReactRecord
            record={isRecording}
            audioBitsPerSecond= {128000}
            onStop={this.onStop}
            onStart={this.onStart}
            onSave={this.onSave}
            onData={this.onData}>
            <audio
              src={this.state.blobURL}
              controls>
            </audio>
            <br />
            <br />
            <button onClick={this.startRecording} disabled={isRecording} type="button">
              Start
            </button>
            <button onClick={this.stopRecording} disabled={!isRecording} type="button">
              Stop
            </button>
          </ReactRecord>
        </div>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'))
