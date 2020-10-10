const videoElement = document.getElementById("video");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");

const gdmOptions = {
  video: {
    cursor: "always",
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100,
  },
};

// Prompt to select media stream, pass to video element and play
async function startStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia(
      gdmOptions
    );
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.log(`whops!: ${error}`);
  }
}

function stopStream() {
  if (videoElement.srcObject !== null) {
    let tracks = videoElement.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    videoElement.srcObject = null;
  } else {
    return "no stream is active";
  }
}

startBtn.addEventListener("click", startStream);
stopBtn.addEventListener("click", stopStream);
