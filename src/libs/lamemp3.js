import lamejs from "lamejs";

const ConvertToMP3 = (blobWavUrl) => {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();
    request.open("GET", blobWavUrl, true);
    request.responseType = "arraybuffer";
    // Our asynchronous callback
    request.onload = function () {
      const audioData = request.response;
      const wav = lamejs.WavHeader.readHeader(new DataView(audioData));
      const samples = new Int16Array(audioData, wav.dataOffset, wav.dataLen / 2);
      resolve(encodeMono(wav.channels, wav.sampleRate, samples));
    };
    request.send();
  })
}

const encodeMono = (channels, sampleRate, samples) => {
  let buffer = [];
  const mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128);
  let remaining = samples.length;
  const maxSamples = 1152;
  for (let i = 0; remaining >= maxSamples; i += maxSamples) {
    const mono = samples.subarray(i, i + maxSamples);
    const mp3buf = mp3enc.encodeBuffer(mono);
    if (mp3buf.length > 0) {
        buffer.push(new Int8Array(mp3buf));
    }
    remaining -= maxSamples;
  }
  const d = mp3enc.flush();
  if(d.length > 0){
    buffer.push(new Int8Array(d));
  }
  const blob = new Blob(buffer, {type: 'audio/mp3'});
  const blobURL = window.URL.createObjectURL(blob);
  const newBlobObject = {
                  blob: blob,
                  blobURL: blobURL
                }
  return newBlobObject
}

export default ConvertToMP3;
