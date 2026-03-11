window.onload = getMicrophoneInput;

async function getMicrophoneInput() {
  console.log("here we are ");

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  let audioContext = new AudioContext(); //using the web audio library
  try {
    //returns a MediaStreamAudioSourceNode.
    let audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    // console.log(audioStream)
    //pass the microphone input to the web audio API
    let microphoneIn = audioContext.createMediaStreamSource(audioStream);
    console.log(microphoneIn);
}
catch (err) {
    /* handle the error */
    console.log("had an error getting the microphone");
  }
} 