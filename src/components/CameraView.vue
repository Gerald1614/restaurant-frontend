<template>
  <div class="camera-modal">
    <video ref="video" class="camera-stream"/>
    <canvas ref="canvas" class="canvas"></canvas>
    <q-btn ref="captureBtn" round @click="capture" color="secondary" icon="camera"/>
  </div>
</template>

<script>
var audio = new Audio(require('../../src/statics/camera-shutter.mp3'))
export default {
  name:'CameraView',
  data () {
      return {
        mediaStream: null
      }
    },
  mounted () {
    this.$refs.canvas.style.display = 'none'
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(mediaStream => {
          this.mediaStream = mediaStream
          this.$refs.video.srcObject = mediaStream
          this.$refs.video.play()
        })
        .catch(error => console.error('getUserMedia() error:', error))
    },
    destroyed () {
    const tracks = this.mediaStream.getTracks()
    tracks.map(track => track.stop())
  },
  methods: {
    capture () {
      audio.play();
      this.$refs.video.style.display = 'none';
      this.$refs.captureBtn.disable = true;
      this.$refs.canvas.style.display = 'block';
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
      const imageCapture = new window.ImageCapture(mediaStreamTrack)
      return imageCapture.takePhoto().then(blob => {
      console.log(blob)
      this.$store.dispatch('restaurants/ADD_PICTURE', {picture:blob})
      createImageBitmap(blob)
        .then(imageBitmap => {
          drawCanvas(this.$refs.canvas, imageBitmap);
        })
      })
    }
  },
 
}

 function drawCanvas (canvas, img) {
    canvas.width = getComputedStyle(canvas).width.split('px')[0];
    canvas.height = getComputedStyle(canvas).height.split('px')[0];
    let ratio  = Math.min(canvas.width / img.width, canvas.height / img.height);
    let x = (canvas.width - img.width * ratio) / 2;
    let y = (canvas.height - img.height * ratio) / 2;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
        x, y, img.width * ratio, img.height * ratio);
  }
</script>

<style lang="stylus" scoped>

.camera-modal 
  width: 100%;
  top: 0;
  left: 0;
  text-align center
  background-color: white;
  z-index: 10;
    
.camera-stream
  width: 100%;
  height 400px;

.canvas
  max-width: 100%;
  height 400px;

</style>
