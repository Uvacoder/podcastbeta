<template>
  <router-link :to="{ path: episode.id }" class="link-decoration">
    <li class="list-group-item media link-decoration link-content">
      <img class="mr-3" :src="episode.image" />
      <p class="media-body">{{ episode.title_original }}</p>
    </li>
  </router-link>
</template>

<script>
export default {
  name: "EpisodeListItem",
  props: ["episode"]
};
</script>

<style scoped>
.media {
  display: flex;
}

.media-body {
  width: inherit;
  margin: 0;
  padding: 16px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9em;
  background-color: #F3F4F5;
  display: flex;
  align-items: center;
  text-align: center;
}

.link-decoration {
  text-decoration: none;
  color: #4F00FF;
}

li:hover {
  background-color: #eee;
}

.link-content {
  padding: 0 20px 14px 20px;
}
</style>
