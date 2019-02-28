<template>
  <div class="profile-content">
    <div class="profile-container">
      <div class="profile-content-info">
        <img :src="episodeObject.artwork_url" />
        <h1>{{ episodeObject.title }}</h1>
        <p>{{ episodeObject.description }}</p>
        
      </div>
      <div>
        <progress id="seekbar" value="0" max="1"></progress>
      </div>
    </div>
    <div class="profile-container">
      <div class="profile-content-player">
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
      speed: null
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
    },
    play() {
      document.getElementById('player').play();
    },
    pause() {
      document.getElementById('player').pause();
    },
    skip() {
      document.getElementById('player')
      player.currentTime += 30.0;
    },
    rewind() {
      document.getElementById('player')
      player.currentTime -= 30.0;
    },
    playbackSpeed() {
      document.getElementById('player')
      player.playbackRate = 1.5;
    },
    normalSpeed() {
      document.getElementById('player')
      player.playbackRate = 1;
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
}

.profile-content-info {
  width: 80%;
}

.audio-player {
  width: inherit;
  height: inherit;
}

progress {
  -webkit-appearance: none;
  width: 100%;
  height: 100%;
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
</style>
