import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";
import EpisodeProfile from "./components/EpisodeProfile.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/profile/:id",
      name: "episodestart",
      component: EpisodeProfile
    }
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
