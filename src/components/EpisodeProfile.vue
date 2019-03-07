<template>
  <div class="profile-content" ref="myref2">
    <div class="profile-container">
      <div class="profile-content-info">
        <img v-if="episodeObject" :src="episodeObject.image" />
        <div class="profile-title-desc">
          <h1>{{ episodeObject.title_original }}</h1>
          <p class="profile-desc">{{ episodeObject.description_original }}</p>
        </div>        
      </div>
      <div>
        <progress ref="progressref" @click="progressClick" id="seekbar" value="0.1" max="1"></progress>
      </div>
      <div class="profile-content-player">
        <div class="audiovisualizer">
          <div v-for="(item, index) in data1" class="changeheight" :style="{height: data1[index]+'px'}" :key="index"></div>
        </div>
        <p class="timer">{{ currentProgress }} / {{ totalDuration }}</p>
        <div class="audio-player">
          <audio ref="playerref"
            :ontimeupdate.prop="updateProgress" 
            id="player"
            :src="episodeToPlay"
            autoplay
       
            >
          </audio>
          <div class="ui buttons">
            <button @click="rewind">Rewind</button>
            <button class="ui button" v-if="!playStatus" @click="play">Play</button>
            <!-- <button class="ui button"><i class="play icon">Play</i></button> -->
            <button v-else @click="pause">Pause</button>
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
      playStatus: true,
      currentProgress: 0,
      totalDuration: 0,
      speed: null,
      data1: null,
      boxposition: null,
      analyser1: null,
      analyser2: null,
      defaultSeries: 'Business'
    };
  },
  watch: {
    $route(to, from) {
      this.getSoundCloud();
      this.$refs.playerref.currentTime = 0
      this.$refs.progressref.value = 0.1
      this.data1 = null;
      this.playStatus = true;
        
      
    }
  },
  created() {
    this.getSoundCloud();
  },
  computed: {
    thumbnailImage() { 
      let str = this.episodeObject.artwork_url;
       let result = str.replace("large", "t500x500");
       return result;
    }
  },
  methods: {
    async getSoundCloud() {
      // this.data1 = null;
      const CLIENT_ID_LISTEN = process.env.VUE_APP_CLIENT_ID_LISTEN;
      const response = await axios.get(
        `https://listennotes.p.rapidapi.com/api/v1/search?sort_by_date=0&type=episode&offset=0&len_min=2&len_max=10&genre_ids=68%2C82&published_before=1490190241000&published_after=1390190241000&only_in=title&language=English&safe_mode=1&q=${this.$route.params.series || this.defaultSeries}`, {
            headers: {
              'X-RapidAPI-Key': `${CLIENT_ID_LISTEN}`
            }
          });
      const result = response.data.results.find(
        findid => findid.id === `${this.$route.params.id}`
      );
      this.episodeObject = (result || response.data.results[0]);
      this.episodeToPlay = (result.audio || response.data.results[0].audio);


  
       

    // webaudio API;
      
    // audioElement.src = this.episodeToPlay;
    //   audioElement.play()

   
      // setInterval(function() {
      //   this.analyser1.getByteFrequencyData(frequencyData);
      //   this.data1 = frequencyData;
      //   console.log(this.data1)
      // }, 5000);



    },
    play() {
      this.$refs.playerref.play();
      this.playStatus = true;

      // this.getSoundCloud();
    },
    pause() {
      this.$refs.playerref.pause();
      this.playStatus = false;
    },
    skip() {
     let player = this.$refs.playerref
      player.currentTime += 30.0;
    },
    rewind() {
       let player = this.$refs.playerref
      player.currentTime -= 30.0;
    },
    playbackSpeed() {
       let player = this.$refs.playerref
      player.playbackRate = 1.5;
    },
    normalSpeed() {
       let player = this.$refs.playerref
      player.playbackRate = 1;
    },

    progressClick(e) {
      // let el = this.$refs.progressref;
      var x = e.pageX - this.$parent.$refs['myref'].getBoundingClientRect().width
      // var startPos = this.$refs.progressref.position;
      var xconvert = x/this.$refs['myref2'].getBoundingClientRect().width;
      var finalx = (xconvert).toFixed(1);
      this.$refs.progressref.value = finalx
     
      var player = this.$refs.playerref;
      var finalseconds = xconvert*player.duration;
      player.currentTime = finalseconds;

    },

    updateProgress() {
      
      // code for updating progress value bar
      const player = this.$refs.playerref;
      const progressbar = this.$refs.progressref;
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

h1 {
  margin: 0 0 20px 0;
}

img {
  border-radius: 5px;
}

.profile-title-desc {
  width: 50%;
}



.audiovisualizer {
  /* height: 330px; */
  height: 100px;
  width: 400px;
  /* background-color: white; */
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-content {
  /* background-color: #5000FF; */
  /* color: white; */
  position: relative;
  border: 1px solid #eee;
  /* border-radius: 0 5px 5px 0; */
}

img {
  height: 300px;
}

.profile-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profile-content-info {
  padding: 50px;
  display: flex;
  justify-content: space-evenly;
  /* align-items: center; */
}

.profile-title-desc {
  margin: 0 20px;
}

.profile-content-player {
  margin: 0 50px 50px 50px;
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
  /* background-color: #5000FF; */
  border: 1px solid white;
  /* color: white; */
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

/* button::after {
  position: absolute;
  content: '';
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 0;
  background-color: #EFD5C3;
  transition: 0.25s ease;
  z-index:-1;
}

button:hover::after {
  height: 100%;
} */

.changeheight {
  display: flex;
  background-color: #5000FF;
  /* border: 1px solid white; */
  color: white;
  width: 6px;
  justify-items: center;
}

.profile-desc {
    /* overflow: auto;
    height: 350px; */
    font-size: 0.8em;
    color: black;
}

.timer {
  color: black;
}
</style>
