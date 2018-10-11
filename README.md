# React-record
Simple React Record
Works via the HTML5 MediaRecorder API ([MediaRecorder](https://caniuse.com/#search=MediaRecorder)).
Supports Chrome, Firefox, Safari.

## Installation

`npm install --save react-record`

## Demo

[Demo](https://aleksa000777.github.io/react-record/)
## Features

- Record audio from microphone
- Save audio as BLOB
- saved as type `audio/mp3`

## Usage

```js

<ReactRecord
  record={boolean}         // defaults -> false.  Set to true to begin recording
  className={string}       // provide css class name
  onStop={function}        // callback to execute when audio stops recording
  onData={function}        // callback to execute when chunk of audio data is available
  >       
  <audio
    ref={c => {
      this.audioSource = c;
    }}
    controls="controls"
    src={string}
  >
    <track kind="captions" />
  </audio>
  <button onClick={boolean} type="button">
    Start
  </button>
  <button onClick={boolean} type="button">
    Stop
  </button>
<ReactRecord/>

```

## Example

```js
import ReactRecord from 'react-record';

export class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blobURL: null,
      isRecording: false
    }
  }

  startRecording = () => {
    this.setState({
      isRecording: true
    });
  }

  stopRecording = () => {
    this.setState({
      isRecording: false
    });
  }

  onData = recordedBlob => {
    console.log('chunk of data is: ', recordedBlob);
  }

  onSave = blobObject => {
    console.log("You can tap into the onSave callback", blobObject);
  };

  onStop = blobObject => {
    console.log('blobObject is: ', blobObject);
    this.setState({
      blobURL: blobObject.blobURL
    });
  }

  onStart = () => {
    console.log('You can tap into the onStart callback');
  };

  render() {
    const { isRecording } = this.state;
    return (
      <div className="record-mic">
        <ReactRecord
          record={isRecording}
          onStop={this.onStop}
          onStart={this.onStart}
          onSave={this.onSave}
          onData={this.onData}
        >
          <div>
            <audio
              ref={c => {
                this.audioSource = c;
              }}
              controls="controls"
              src={this.state.blobURL}
            >
              <track kind="captions" />
            </audio>
          </div>
          <button onClick={this.startRecording} type="button">
            Start
          </button>
          <button onClick={this.stopRecording} type="button">
            Stop
          </button>
        </ReactRecord>
      </div>
    );
  }
}
```
# Having issues with the lambda function?
Try installing babel-preset-stage-1

Include stage-1 in your webpack.config under presets.

e.g.

```js
module.exports = {
    entry: "./scripts/Main.js",
    output: {
        path: __dirname,
        filename: "./static/script.js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.js$/,
            // exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react', 'stage-1']
            }
        }]

    }
};
```

## License

MIT
