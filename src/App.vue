<template>
<div>
  <LoadingScreen :isLoading="isLoading" />
    <div v-if="!isLoading">
  <div class="app-content">
    
    <div ref="myref">
      <div class="app-header">
        <img src="/podplay1.png" alt="logo" class="logo"/>
        <CategoryList v-if="!isMobile" />
        <CategoryListMobile v-else />
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
import CategoryList from "./components/CategoryList";
import CategoryListMobile from "./components/CategoryListMobile";

export default {
  name: "App",
  components: {
    LoadingScreen,
    EpisodeList,
    EpisodeProfile,
    SearchBar,
    EpisodeProfileDefaultPlayer,
    CategoryList,
    CategoryListMobile
  },
  data() {
    return {
      episodes: [],
      episodespodcast: [],
      currentPodcastUrl: null,
      inputChange: "",
      defaultSeries: "Business",
      isLoading: true,
      screenWidth: screen.width
    };
  },
  mounted() {
     setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    this.getSoundCloud();

    window.addEventListener('resize', () => {
      this.screenWidth = screen.width
      console.log(this.screenWidth)
      console.log(this.isMobile)
    })
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
    },
    isMobile() {
      if( this.screenWidth <= 768 ) {
        return true;
      } else {
        return false;
      }     
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
  width: 100px;

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
}

</style>
