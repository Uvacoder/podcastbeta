<template>
  <div> 
    <ul
        ref="getHeightUl"      
        @scroll="onScroll"
        >
      
      <EpisodeListItem 
      
        v-for="episode in episodes"
        :episode="episode"
        :key="episode.id"
        active-class="active"
      >
      </EpisodeListItem> 
    </ul>
   <p>{{ offsetTop }}</p>
  </div>
</template>

<script>
import EpisodeListItem from "./EpisodeListItem";
import axios from "axios";
import _ from 'lodash';

export default {
  name: "EpisodeList",
  components: {
    EpisodeListItem
  },
  props: ["episodes", "inputChange"],
  data: () => ({
    offsetTop: 0,
    offsetHeightRef: 0,
    totalHeight: 0,
    pageTotal: 10
  }),
   watch: {
    inputChange: function(nv, ov) {
      this.onScroll()
    },
  },
methods: {
    onScroll: _.throttle( function (e) {
      this.offsetTop = e.target.scrollTop;
      this.offsetHeightRef = window.scrollY + window.innerHeight;
      this.totalHeight = this.$refs.getHeightUl.scrollHeight;
     
      
      if ((this.offsetTop + this.offsetHeightRef) > (this.totalHeight) - 50) {
        console.log("bottom of page reached");


      const CLIENT_ID_LISTEN = process.env.VUE_APP_CLIENT_ID_LISTEN;
          if (!this.$route.params.podcastseries) {
      axios
        .get(
          `https://listennotes.p.rapidapi.com/api/v1/search?sort_by_date=0&type=episode&offset=${this.pageTotal}&len_min=2&len_max=10&genre_ids=68%2C82&published_before=1490190241000&published_after=1390190241000&only_in=title&language=English&safe_mode=1&q=${this.$route.params.series || this.defaultSeries}`, {
            headers: {
              'X-RapidAPI-Key': `${CLIENT_ID_LISTEN}`
            }
          }
        )
        .then(response => {
          console.log(response);
          console.log(this.$route.params.series)
          this.episodes.push(...response.data.results)
        });
     } else if (this.$route.params.podcastseries) {
          axios
        .get(
          `https://listennotes.p.rapidapi.com/api/v1/search?sort_by_date=0&type=episode&offset=${this.pageTotal}&len_min=2&len_max=10&genre_ids=68%2C82&published_before=1490190241000&published_after=1390190241000&only_in=title&language=English&ocid=${this.$route.params.podcastseries}&safe_mode=1&q=${this.inputChange || this.$route.params.series}`, {
            headers: {
              'X-RapidAPI-Key': `${CLIENT_ID_LISTEN}`
            }
          }
        )
        .then(response => {
          console.log(response);
          console.log(this.$route.params.series)
          this.episodes.push(...response.data.results)
        });
        }
    
        this.pageTotal = this.pageTotal + 10
        e.target.scrollTop -= 200;
      }
    
    }, 2000)
  }
};
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0;
  /* width: 30vw; */
  overflow: auto;
  height: 98vh;
}

p {
  display: hidden;
  color: white;
}
</style>
