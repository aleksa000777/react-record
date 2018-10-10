let audioCtx = null
let analyser = null
let AudioExists = false

const waitForAudio = (timeout = 5000) =>
  new Promise((resolve, reject) => {
    const check = () => {
      if (typeof AudioContext !== 'undefined') {
        AudioExists = true
        audioCtx = new window.AudioContext()
      } else if (typeof webkitAudioContext !== 'undefined') {
        AudioExists = true

        audioCtx = new window.webkitAudioContext()
      } else if (typeof mozAudioContext !== 'undefined') {
        AudioExists = true
        audioCtx = new window.mozAudioContext()
      }
      if (AudioExists) {
        window.cancelAnimationFrame(check)
        resolve(audioCtx)
      }
    }

    window.setTimeout(() => {
      cancelAnimationFrame(check)
      reject(new Error('Took to long to load'))
    }, timeout)
    requestAnimationFrame(check)
  })

waitForAudio()
  .then(res => {
    audioCtx = res
    if (audioCtx) {
      analyser = audioCtx.createAnalyser()
    }
  })

const AudioContext = {
  getAudioContext () {
    return audioCtx
  },

  getAnalyser () {
    return analyser
  }
}

export default AudioContext
