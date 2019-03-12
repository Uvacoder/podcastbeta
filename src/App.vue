<template>
<div>
  <LoadingScreen :isLoading="isLoading" />
    <div v-if="!isLoading">
  <div class="app-content">
    
    <div ref="myref">
      <div class="app-header">
        <h1 class="logo">LOGO</h1>
        <div class="category-link">
          <router-link :to="{ path: '/Topic/Art/' }" class="category-path" >Art</router-link>
          <router-link :to="{ path: '/Topic/Business/' }" class="category-path" >Business</router-link>
          <router-link :to="{ path: '/Topic/Crime/' }" class="category-path" >Crime</router-link>
          <router-link :to="{ path: '/Topic/Food/' }" class="category-path" >Food</router-link>
          <router-link :to="{ path: '/Topic/Movies/' }" class="category-path" >Movies</router-link>
          <router-link :to="{ path: '/Topic/Music/' }" class="category-path" >Music</router-link>
          <router-link :to="{ path: '/Topic/Startup/' }" class="category-path" >Startup</router-link>
          <router-link :to="{ path: '/Topic/Technology/' }" class="category-path" >Technology</router-link>
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
  </div>
  </div>
</template>

<script>
import axios from "axios";
import EpisodeList from "./components/EpisodeList";
import EpisodeProfile from "./components/EpisodeProfile";
import SearchBar from "./components/SearchBar";
import EpisodeProfileDefaultPlayer from "./components/EpisodeProfileDefaultPlayer";
import LoadingScreen from './components/LoadingScreen';

export default {
  name: "App",
  components: {
    LoadingScreen,
    EpisodeList,
    EpisodeProfile,
    SearchBar,
    EpisodeProfileDefaultPlayer
  },
  data() {
    return {
      episodes: [],
      episodespodcast: [],
      currentPodcastUrl: null,
      inputChange: "",
      defaultSeries: "Business",
      isLoading: true
    };
  },
  mounted() {
     setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    this.getSoundCloud();
  },
   watch: {
    $route() {
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
     if (!this.$route.params.podcastseries) {
      axios
        .get(
          `https://listennotes.p.rapidapi.com/api/v1/search?sort_by_date=0&type=episode&offset=0&len_min=2&len_max=10&genre_ids=68%2C82&published_before=1490190241000&published_after=1390190241000&only_in=title&language=English&safe_mode=1&q=${this.$route.params.series || this.defaultSeries}`, {
            headers: {
              'X-RapidAPI-Key': `${CLIENT_ID_LISTEN}`
            }
          }
        )
        .then(response => {
          this.episodes = response.data.results;
        });
     } else if (this.$route.params.podcastseries) {
          axios
        .get(
          `https://listennotes.p.rapidapi.com/api/v1/search?sort_by_date=0&type=episode&offset=0&len_min=2&len_max=10&genre_ids=68%2C82&published_before=1490190241000&published_after=1390190241000&only_in=title&language=English&ocid=${this.$route.params.podcastseries}&safe_mode=1&q=${this.$route.params.series}`, {
            headers: {
              'X-RapidAPI-Key': `${CLIENT_ID_LISTEN}`
            }
          }
        )
        .then(response => {
          this.episodes = response.data.results;
        });
        }
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
  padding: 15px 20px;
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
  color: #63ab97;
  margin: 0;
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

.category-path:hover {
  color: #63ab97;
}

.router-link-active {
  color: #63ab97;
  font-weight: bold;
  font-size: 1.3em;
}
</style>
