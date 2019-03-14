import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";
import EpisodeProfile from "./components/EpisodeProfile.vue";
import EpisodeList from "./components/EpisodeList.vue";
import EpisodeProfileDefaultPlayer from './components/EpisodeProfileDefaultPlayer';

import VueLodash from "lodash";

const options = { name: 'lodash' }; // customize the way you want to call it

Vue.filter('striphtml', function (value) {
  var div = document.createElement("div");
  div.innerHTML = value;
  var text = div.textContent || div.innerText || "";
  return text;
});

Vue.use(VueLodash, options); // options is optional

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/topic/:series/:id",
      name: "episodestart",
      components: {
        a: EpisodeProfile,
        b: EpisodeList
      }
    },
    {
      path: "/topic/:series/",
      name: "episodelist",
      components: {
        a: EpisodeProfile,
        b: EpisodeList
      }
    },
    {
      path: "/topic/:series/:id/:podcastseries/",
      name: "episodeseries",
      components: {
        a: EpisodeProfile,
        b: EpisodeList
      }
    },
      {
        path: "/audiovisualizer",
        name: "audiovisualizer",
        components: {
          a: EpisodeProfileDefaultPlayer,
          b: EpisodeList
        }
    },
    {
      path: '/',
      redirect: '/topic/art/'
    },
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
