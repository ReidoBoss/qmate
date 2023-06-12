<template>
  <div>
    <button @click="playAudio">Check Condition</button>
    <audio ref="audio" src="https://firebasestorage.googleapis.com/v0/b/fir-68a5f.appspot.com/o/X2Download.app%20-%20Cycle%20Bell%20Ring%20Sound%20Effect%20_%20Non%20Copyright%20(128%20kbps).mp3?alt=media&token=760578d2-3675-45d3-a3ca-f357df3699b4" loop></audio>
  </div>
</template>

<script>
export default {
  methods: {
    playAudio() {
     const condition = true;

     if (condition) {
        this.$refs.audio.play()
        

      }
    },
  
  }
}
</script>
