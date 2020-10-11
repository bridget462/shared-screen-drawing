const videoElement = document.getElementById("video");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
let videoRect; // store video position
let canvas;

// mouse coordinate divided by canvas size
let proportionalPMouseX;
let proportionalPMouseY;
let proportionalMouseX;
let proportionalMouseY;

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

function setup() {
  // initial canvas is not visible so size doesn't matter
  canvas = createCanvas(360, 120);
  canvas.hide();
}

function responsiveCanvas() {
  videoRect = videoElement.getBoundingClientRect();

  resizeCanvas(videoRect.width, videoRect.height);
  canvas.position(videoRect.x, videoRect.y);
  canvas.style("z-index", "1");
  // background("rgba(255, 0, 255, 0.5)");
}

function windowResized() {
  responsiveCanvas();
}

function mouseDragged() {
  if (videoRect === undefined || videoElement.srcObject === null) {
    return null;
  }
  // TODO share with others
  proportionalPMouseX = pmouseX / videoRect.width;
  proportionalPMouseY = pmouseY / videoRect.height;
  proportionalMouseX = mouseX / videoRect.width;
  proportionalMouseY = mouseY / videoRect.height;
  console.log(
    proportionalPMouseX,
    proportionalPMouseY,
    proportionalMouseX,
    proportionalMouseY
  );

  strokeWeight(4);
  stroke("rgb(0,255,0)");
  line(mouseX, mouseY, pmouseX, pmouseY);
}

// Prompt to select media stream, pass to video element and play
async function startStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia(
      gdmOptions
    );
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
      responsiveCanvas();
      canvas.show();
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
    canvas.hide();
  } else {
    return "no stream is active";
  }
}

startBtn.addEventListener("click", startStream);
stopBtn.addEventListener("click", stopStream);
