<template>
  <div class="profile-content" ref="myref2">
    <div class="profile-container">
      <div class="profile-content-info">
        <img :src="episodeObject.artwork_url" />
        <h1>{{ episodeObject.title }}</h1>
        <p>{{ episodeObject.description }}</p>
        
      </div>
      <div>
        <progress @click="progressClick" id="seekbar" value="0.1" max="1"></progress>
      </div>
    </div>
    <div class="profile-container">
      
      <div class="profile-content-player">
        <div class="audiovisualizer">
                <div class="changeheight0" :style="{height: data1[0]+'px'}"></div>
                <div class="changeheight1" :style="{height: data1[1]+'px'}"></div>
                <div class="changeheight2" :style="{height: data1[2]+'px'}"></div>
                <div class="changeheight3" :style="{height: data1[3]+'px'}"></div>
                <div class="changeheight4" :style="{height: data1[4]+'px'}"></div>
                <div class="changeheight5" :style="{height: data1[5]+'px'}"></div>
                <div class="changeheight6" :style="{height: data1[6]+'px'}"></div>
                <div class="changeheight7" :style="{height: data1[7]+'px'}"></div>
                <div class="changeheight8" :style="{height: data1[8]+'px'}"></div>

        </div>
        <!-- <audio
          :src="episodeToPlay"
          autoplay
          controls
          crossorigin="anonymous"
        ></audio> -->
        <p>{{ currentProgress }} / {{ totalDuration }}</p>
        <div class="audio-player">
          <audio 
            :ontimeupdate.prop="udpateProgress" 
            id="player"
            :src="episodeToPlay"
            autoplay
            crossorigin="anonymous"
            >
          </audio>
          <div class="all-btns">
            <button @click="rewind">Rewind</button>
            <button v-if="!playStatus" @click="play(), playStatus = true">Play</button>
            <button v-else @click="pause(), playStatus = false">Pause</button>
            <button @click="skip">Forward</button>
            <button v-if="!speed" @click="normalSpeed(), speed = true">1</button>
            <button v-else @click="playbackSpeed(), speed = false">1.5</button>
          </div>
        </div>
      </div>   
    </div>    
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EpisodeProfile",
  props: ["episodes"],
  data() {
    return {
      episodeToPlay: null,
      episodeObject: null,
      playStatus: false,
      currentProgress: 0,
      totalDuration: 0,
      speed: null,
      data1: [100, 100, 50, 100, 50, 150, 150, 50, 90],
      boxposition: null
    };
  },
  watch: {
    $route(to, from) {
      this.getSoundCloud();
    }
  },
  created() {
    this.getSoundCloud();
  },
  computed: {

  },
  methods: {
    async getSoundCloud() {
      const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;
      const response = await axios.get(
        `https://api.soundcloud.com/users/235518337/tracks?client_id=${CLIENT_ID}&limit=10&linked_partitioning=0&offset=0`
      );
      const result = response.data.collection.find(
        findid => findid.id === Number(`${this.$route.params.id}`)
      );
      this.episodeObject = result;
      this.episodeToPlay = `${result.stream_url +
        "?client_id=" + CLIENT_ID}`;

    var audioElement = document.getElementById('player');
    audioElement.src = `${result.stream_url +
        "?client_id=" + CLIENT_ID}`
    // audioElement.src = require('../assets/SampleAudio.mp3');
    audioElement.crossOrigin = "anonymous";

    var ctx = new AudioContext();
    var sourceNode = ctx.createMediaElementSource(audioElement);

    var analyser = ctx.createAnalyser();
    analyser.smoothingTimeConstant = 0.85
    analyser.fftSize = 1024;
    sourceNode.connect(analyser);
    analyser.connect(ctx.destination);

    audioElement.play()

    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    // analyser.frequencyBinCount

    analyser.getByteFrequencyData(frequencyData);

    this.data1 = frequencyData;

    // console.log(frequencyData);

      setInterval(function() {
        analyser.getByteFrequencyData(frequencyData);
        // console.log(frequencyData);
    //     function groupAverage(arr, n) {
    //   var result = [];
    //   for (var i = 0; i < arr.length;) {
    //    var sum = 0;
    //    for(var j = 0; j< n; j++){
    //   // Check if value is numeric. If not use default value as 0
    //     sum += +arr[i++] || 0
    //    }
    //    result.push(sum/n);
    //  }
    //    return result
      // }
        // console.log(result);
        this.data1 = frequencyData;
        console.log(this.data1)
      }, 1000);




    },
    play() {
      document.getElementById('player').play();
    },
    pause() {
      document.getElementById('player').pause();
    },
    skip() {
     let player = document.getElementById('player')
      player.currentTime += 30.0;
    },
    rewind() {
       let player = document.getElementById('player')
      player.currentTime -= 30.0;
    },
    playbackSpeed() {
       let player = document.getElementById('player')
      player.playbackRate = 1.5;
    },
    normalSpeed() {
       let player = document.getElementById('player')
      player.playbackRate = 1;
    },

    progressClick(e) {
      let el = document.getElementById('seekbar');
      var x = e.pageX - this.$parent.$refs['myref'].getBoundingClientRect().width
      var startPos = document.getElementById('seekbar').position;
      console.log(this.$refs['myref2'].getBoundingClientRect().width);
      var xconvert = x/this.$refs['myref2'].getBoundingClientRect().width;
      var finalx = (xconvert).toFixed(1);
      document.getElementById('seekbar').value = finalx
     
      var player = document.getElementById('player');
      var finalseconds = xconvert*player.duration;
      player.currentTime = finalseconds;

    },

    udpateProgress() {
      const player = document.getElementById('player');
      const progressbar = document.getElementById('seekbar');
      progressbar.value = (player.currentTime / player.duration);

      const timeConvert = (num) => { 
        const hours = Math.floor(num / 60);  
        const minutes = Math.floor(num % 60);
        return `${hours}:${minutes}`;  
      }
      this.currentProgress = timeConvert(player.currentTime);
      this.totalDuration = timeConvert(player.duration); 
    },
  }
};
</script>

<style scoped>

.audiovisualizer {
  height: 330px;
  width: 400px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-content {
  display: flex;
  background-color: #5000FF;
  color: white;
  position: relative;
}

img {
  height: 300px;
}

.profile-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  /* padding-top: 250px; */
}

.profile-content-info {
  width: 80%;
  height: 80%;
}

.profile-content-player {
  height: 80%;
}


.audio-player {
  width: inherit;
  /* height: inherit; */
}

progress {
  -webkit-appearance: none;
  /* width: 100%; */
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

progress[value]::-webkit-progress-bar {
  background-color: transparent;
}

progress[value]::-webkit-progress-value {
  background-color: rgba(255,255,255,0.34);
  border-right: 1px solid orangered;
}

audio {
  position: relative;
  z-index: 1;
}

button {
  padding: 0;
  border: 0;
  height: 100px;
  width: 100px;
  background-color: #5000FF;
  border: 1px solid white;
  color: white;
  font-weight: bold;
  position: relative;
  z-index: 1;
}
p {
white-space: pre-wrap;
font-size: 1rem;
line-height: 1.5rem;
color: rgba(255,255,255,0.75);
/* font-family: 'ModernEra', 'Roboto', 'Noto', sans-serif; */
}

/* button:hover {
  background-color: orangered;
} */

button::after {
  position: absolute;
  content: '';
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 0;
  background-color: orangered;
  transition: 0.25s ease;
  z-index:-1;
}

button:hover::after {
  height: 100%;
}

.changeheight0 {
  display: flex;
  background-color: #5000FF;
  /* border: 1px solid white; */
  color: white;
  width: 20px;
  justify-items: center;
}

.changeheight1 {
  display: flex;
  background-color: #5000FF;
  /* border: 1px solid white; */
  color: white;
  width: 20px;
  justify-items: center;
}

.changeheight2 {
  display: flex;
  background-color: #5000FF;
  /* border: 1px solid white; */
  color: white;
  width: 20px;
  justify-items: center;
}

.changeheight3 {
  display: flex;
  background-color: #5000FF;
  /* border: 1px solid white; */
  color: white;
  width: 20px;
  justify-items: center;
}

.changeheight4 {
  display: flex;
  background-color: #5000FF;
  /* border: 1px solid white; */
  color: white;
  width: 20px;
  justify-items: center;
}

.changeheight5 {
  display: flex;
  background-color: #5000FF;
  /* border: 1px solid white; */
  color: white;
  width: 20px;
  justify-items: center;
}

.changeheight6 {
  display: flex;
  background-color: #5000FF;
  /* border: 1px solid white; */
  color: white;
  width: 20px;
  justify-items: center;
}

.changeheight7 {
  display: flex;
  background-color: #5000FF;
  /* border: 1px solid white; */
  color: white;
  width: 20px;
  justify-items: center;
}

.changeheight8 {
  display: flex;
  background-color: #5000FF;
  /* border: 1px solid white; */
  color: white;
  width: 20px;
  justify-items: center;
}
</style>
