<template>
  <div class="camera-modal">
    <video ref="video" class="camera-stream"/>
    <q-btn round @click="capture" color="secondary" icon="camera"/>
  </div>
</template>

<script>
export default {
  name:'CameraView',
  data () {
      return {
        mediaStream: null
      }
    },
  mounted () {
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
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
      const imageCapture = new window.ImageCapture(mediaStreamTrack)
      return imageCapture.takePhoto().then(blob => {
      console.log(blob)
       this.$store.dispatch('restaurants/ADD_PICTURE', {picture:blob})
      })
    }
  }
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
  max-height 400px;
</style>
