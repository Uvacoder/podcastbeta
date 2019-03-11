import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";
import EpisodeProfile from "./components/EpisodeProfile.vue";
import EpisodeList from "./components/EpisodeList.vue";
import EpisodeProfileDefaultPlayer from './components/EpisodeProfileDefaultPlayer';
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

// Vue.use(Vuetify);

import VueLodash from "lodash";

const options = { name: 'lodash' }; // customize the way you want to call it

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
