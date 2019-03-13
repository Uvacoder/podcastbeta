<template>
  <div class="profile-content" ref="myref2">
    <div class="profile-container">
       <div class="podcast-series-container">
         <div class="podcast-series">
          <router-link :to="{ path: '/topic/' + this.$route.params.series+ '/' + episodeObject.id+ '/' + episodeObject.podcast_id }" class="category-path">More episodes in the series</router-link>
          <div>Podcast Series Link</div>
         </div>
        </div>
      <div class="profile-content-info">
       
        <img v-if="episodeObject" :src="episodeObject.image" />
        <div class="profile-title-desc">
          <h1>{{ episodeObject.title_original }}</h1>
          <p class="profile-desc">{{ episodeObject.description_original }}</p>
        </div>        
      </div>
      <div class="fixed-player">
        <div class="progress-time">
          <input ref="progressref" class="seekslider" type="range" value="0" step="any" @change="onChange" @mouseup="onMouseUp" @mousedown="onMouseDown" >
          <div class="timer">
            <p class="time">{{ currentProgress }}</p>
            <p class="time">{{ totalDuration }}</p>
          </div>
        </div>
        <div class="profile-content-player">
       
          <div class="audio-player">
            <audio ref="playerref"
              v-if="episodeToPlay"
              id="player"
              :src="episodeToPlay"
              @loadedmetadata="onLoadedMetaData"
            :ontimeupdate.prop="onTimeUpdate"            
              >
            </audio>
            <div class="audio-controls">
              <span class="ui button" @click="rewind"><i class="large backward icon" /></span>
              <span class="ui button" v-if="!playStatus" @click="play"><i class="huge play icon" /></span>
              <span class="ui button" v-else @click="pause"><i class="huge pause icon" /></span>
              <span class="ui button" @click="skip"><i class="large forward icon" /></span>
              <span class="ui button" v-if="!speed" @click="normalSpeed(), speed = true">1x</span>
              <span class="ui button" v-else @click="playbackSpeed(), speed = false">1.5x</span>
              <span class="ui button" v-if="!silent" @click="mute"><i class="large volume up icon" /></span>
              <span class="ui button" v-else @click="mute" ><i class="large volume off icon" /></span>
              <input ref="volumeref" id="volumeslider" type="range" min="0" max="100" value="100" step="1" @mousemove="volume">
            </div>
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
      defaultSeries: 'Business',
      volumeslider: null,
      // seeking: false,
      // seekTo: null,
      silent: false
    };
  },
  watch: {
    $route() {
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
    },
    play() {
      this.$refs.playerref.play();
      this.playStatus = true;
    },
    pause() {
      this.$refs.playerref.pause();
      this.playStatus = false;
    },
    skip() {
      let player = this.$refs.playerref
      player.currentTime += 15.0;
    },
    rewind() {
      let player = this.$refs.playerref
      player.currentTime -= 15.0;
    },
    playbackSpeed() {
      let player = this.$refs.playerref
      player.playbackRate = 1.5;
    },
    normalSpeed() {
      let player = this.$refs.playerref
      player.playbackRate = 1;
    },
    volume() {
      let player = this.$refs.playerref
      let volumeslider = this.$refs.volumeref
	    player.volume = volumeslider.value / 100;
    },
    mute() {
      let player = this.$refs.playerref
      this.silent = !this.silent;

      if (this.silent) {
        player.muted = true;
      } else {
        player.muted = false;
      }
    },
    onLoadedMetaData() {
      const player = this.$refs.playerref;
      const progressbar = this.$refs.progressref;

      progressbar.max = player.duration;
    },
    onChange() {
      const player = this.$refs.playerref;
      const progressbar = this.$refs.progressref;
      player.currentTime = progressbar.value;
    },
     onMouseDown() {
      const player = this.$refs.playerref;
      player.pause();

    },
    onMouseUp() {
      const player = this.$refs.playerref;
      const progressbar = this.$refs.progressref;
      player.play();
      player.currentTime = progressbar.value;
      

    },
    onTimeUpdate() {
      const player = this.$refs.playerref;
      const progressbar = this.$refs.progressref;

      progressbar.value = player.currentTime;

        const timeConvert = (num) => { 
          const date = new Date(null);
          date.setSeconds(num);
          const result = date.toISOString().slice(-10, -5);

          return result;
      }

      this.currentProgress = timeConvert(player.currentTime);
      this.totalDuration = timeConvert(player.duration);
    }
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

.audio-controls {
  display: flex;
  align-items: center;
  justify-content: center;
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.profile-content-info {
  /* height: 100vh; */
  width: 70vw;
  padding: 50px;
  display: flex;
  justify-content: space-evenly;
}

.profile-title-desc {
  margin: 0 20px;
}

/* .profile-content-player {
  margin: 0 50px 50px 50px;
} */


.audio-player {
  width: inherit;
}

/* progress {
  -webkit-appearance: none;
  width: 100%;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
} */

/* progress {
  -webkit-appearance: none;
  height: 3px;
  width: 40vw;
  position: relative;
  top: 0;
  left: 0;
} */

/* progress[value]::-webkit-progress-bar {
  background-color: transparent;
  border-radius: 5px;   
  background: #d3d3d3;
} */

/* progress[value]::-webkit-progress-value {
  background-color: rgba(195, 223, 224, 0.3);
  border-right: 5px solid rgb(127, 183, 190);
} */

.fixed-player {
    position: sticky;
    width: inherit;
    /* background-color: darksalmon; */
    left: 0;
    bottom: 0;
    /* z-index: 9; */
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 20vh;
    padding: 20px;
}

audio {
  position: relative;
  z-index: 1;
}

button {
  padding: 0;
  border: 0;
  height: 25px;
  width: 25px;
  /* background-color: #5000FF; */
  border: 1px solid white;
  border-radius: 5px;
  color: black;
  font-weight: bold;
  font-size: 0.8em;
  position: relative;
  z-index: 1;
}

button:focus {
  outline: none;
  /* border-bottom-color: #C3DFE0; */
}

.icon {
  margin: 0 !important;
}

.ui.button {
  background: none;
  color: black;
  margin: 0;
}

/* .ui.button:hover {
  color: #63ab97;
  background: none;
} */

p {
white-space: pre-wrap;
font-size: 1rem;
line-height: 1.5rem;
color: rgba(255,255,255,0.75);
/* font-family: 'ModernEra', 'Roboto', 'Noto', sans-serif; */
}

/* button:hover {
  background-color: #63ab97;
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

.profile-desc {
    /* overflow: auto;
    height: 350px; */
    font-size: 0.8em;
    color: black;
}

.timer {
  display: flex;
  justify-content: space-between;
}

.time {
  color: black;
}

.seekslider {
  -webkit-appearance: none;
  width: 50vw;
  height: 3px;
  border-radius: 5px;   
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.seekslider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%; 
  background:#63ab97;
  cursor: pointer;
}

.seekslider::-moz-range-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #63ab97;
  cursor: pointer;
}

.podcast-series-container {
  width: inherit;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
}

.podcast-series{
  text-align: right;
  padding: 10px;
  background-color: #DDD;
  border-radius: 5px;
}
</style>
