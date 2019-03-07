<template>
  <div class="app-content">
    <div ref="myref">
      <div class="app-header">
        <!-- <img class="logo" src="./assets/logo1.png" /> -->
        <h1 class="logo">LOGO</h1>
        <div class="category-link">
          <router-link :to="{ path: '/Art/' }" class="category-path">Art</router-link>
          <router-link :to="{ path: '/Business/' }" class="category-path">Business</router-link>          
          <router-link :to="{ path: '/Crime/' }" class="category-path">Crime</router-link>
          <router-link :to="{ path: '/Food/' }" class="category-path">Food</router-link>
          <router-link :to="{ path: '/Movies/' }" class="category-path">Movies</router-link>
          <router-link :to="{ path: '/Music/' }" class="category-path">Music</router-link>
          <router-link :to="{ path: '/Technology/' }" class="category-path">Technology</router-link>
        </div>
        <SearchBar @inputChange="onInputChange"/>
      </div>
      <div class="app-body">
        <div>
          <router-view name="a" />
        </div>
        <div ref="myref">  
          <router-view name="b" v-if="filteredepisodes" :episodes="filteredepisodes"/>
        </div>
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
      inputChange: "",
      defaultSeries: "Business"
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
          `https://listennotes.p.rapidapi.com/api/v1/search?sort_by_date=0&type=episode&offset=0&len_min=2&len_max=10&genre_ids=68%2C82&published_before=1490190241000&published_after=1390190241000&only_in=title&language=English&safe_mode=1&q=${this.$route.params.series || this.defaultSeries}`, {
            headers: {
              'X-RapidAPI-Key': `${CLIENT_ID_LISTEN}`
            }
          }
        )
        .then(response => {
          console.log(response);
          console.log(this.$route.params.series)
          this.episodes = response.data.results;
        });
    },
    onInputChange(inputChange) {      
      this.inputChange = inputChange;
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
  padding: 0 20px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
}

.app-body {
  display: flex;
  padding-top: 20px;
}

.logo {
  /* padding-top: 40px;
  padding-left: 5px;
  height: 100px; */
  color: #C3DFE0;
}

.category-link {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.category-path {
  text-decoration: none;
  color: black;
  text-transform: uppercase;
}

</style>
