<template>
  <div class="app-content">
    <div>
      <router-link :to="{ path: '/Business/' }">Business</router-link>
      <router-link :to="{ path: '/Crime/' }">Crime</router-link>
      <router-link :to="{ path: '/Technology/' }">Technology</router-link>

    </div>
    <div ref="myref">
      <img class="logo" src="./assets/logo1.png" />
      <SearchBar @inputChange="onInputChange"/>
      <router-view name="b" v-if="filteredepisodes" :episodes="filteredepisodes"/>
      <!-- <EpisodeList v-if="filteredepisodes" :episodes="filteredepisodes" /> -->
    </div>
    <div>
      <router-view name="a" />
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
   watch: {
    $route(to, from) {
      this.getSoundCloud();
    }
  },
  computed: {
    filteredepisodes: function() {
      return this.episodes.filter((episode) => {
        return episode.title_original.toLowerCase().match(this.inputChange.toLowerCase());
      });
    }
  },
  methods: {
    getSoundCloud() {
      const CLIENT_ID_LISTEN = process.env.VUE_APP_CLIENT_ID_LISTEN;

      axios
        .get(
          `https://listennotes.p.rapidapi.com/api/v1/search?sort_by_date=0&type=episode&offset=0&len_min=2&len_max=10&genre_ids=68%2C82&published_before=1490190241000&published_after=1390190241000&only_in=title&language=English&safe_mode=1&q=${this.$route.params.series}`, {
            headers: {
              'X-RapidAPI-Key': `${CLIENT_ID_LISTEN}`
            }
          }
        )
        .then(response => {
          console.log(response);
          this.episodes = response.data.results;
          console.log(this.episodes);
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
