<template>
  <div class="app-content">
    <div class="app-header">
      <img class="logo" src="./assets/logo1.png" />
      category
      <SearchBar @inputChange="onInputChange"/>
    </div>
    <div class="app-body">
      <div>
        <router-view />
      </div>
      <div ref="myref">      
        <EpisodeList v-if="filteredepisodes" :episodes="filteredepisodes" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EpisodeList from "./components/EpisodeList";
import EpisodeProfile from "./components/EpisodeProfile";
import SearchBar from "./components/SearchBar";

export default {
  name: "App",
  components: {
    EpisodeList,
    EpisodeProfile,
    SearchBar
  },
  data() {
    return {
      episodes: [],
      currentPodcastUrl: null,
      inputChange: ""
    };
  },
  mounted() {
    this.getSoundCloud();
  },
  computed: {
    filteredepisodes: function() {
      return this.episodes.filter((episode) => {
        return episode.title.toLowerCase().match(this.inputChange.toLowerCase());
      });
    }
  },
  methods: {
    getSoundCloud() {
      const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;

      axios
        .get(
          `https://api.soundcloud.com/users/235518337/tracks?client_id=${CLIENT_ID}&limit=10&linked_partitioning=0&offset=0`
        )
        .then(response => {
          console.log(response);
          this.episodes = response.data.collection;
        });
    },
    onInputChange(inputChange) {      
      this.inputChange = inputChange;
      console.log(this.inputChange);
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato');
body {
  margin: 0;
}

.app-content {
  height: 100vh;
  /* display: flex; */
  font-family: 'Lato', sans-serif;
  letter-spacing: 0.5px;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
}

.app-body {
  display: flex;
}

.logo {
  /* padding-top: 40px;
  padding-left: 5px; */
  height: 100px;
}
</style>
