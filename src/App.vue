<template>
  <div class="app-content">
    <div ref="myref">
      <img class="logo" src="./assets/logo1.png" />
      <EpisodeList :episodes="episodes" />
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EpisodeList from "./components/EpisodeList";
import EpisodeProfile from "./components/EpisodeProfile";

export default {
  name: "App",
  components: {
    EpisodeList,
    EpisodeProfile
  },
  data() {
    return {
      episodes: [],
      currentPodcastUrl: null
    };
  },
  mounted() {
    this.getSoundCloud();
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
  display: flex;
  font-family: 'Lato', sans-serif;
  letter-spacing: 0.5px;
}

.logo {
  padding-top: 40px;
  padding-left: 5px;
  width: 220px;
}
</style>
