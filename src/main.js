import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";
import EpisodeProfile from "./components/EpisodeProfile.vue";
import EpisodeList from "./components/EpisodeList.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/:series/:id",
      name: "episodestart",
      components: {
        a: EpisodeProfile,
        b: EpisodeList
      }
    },
    {
      path: "/:series/",
      name: "episodelist",
      components: {
        a: EpisodeProfile,
        b: EpisodeList
      }
    },
    //   {
    //     path: "/",
    //     name: "episodedefault",
    //     components: {
    //       a: EpisodeProfile,
    //       b: EpisodeList
    //     }
    // },
    {
      path: '/',
      redirect: '/art/'
    },
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
