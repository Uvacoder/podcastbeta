<template>
  <router-link :to="{ path: episode.id }" class="link-decoration">
    <li class="card link-decoration link-content">
      <img :src="episode.image" />
      <p class="card-body">{{ episode.title_original }}</p>
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
.card {
  display: flex;
  border: 1px solid #eee;
  /* border-radius: 5px; */
}

.card-body {
  width: inherit;
  margin: 0;
  padding: 30px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  /* text-align: center; */
}

.link-decoration {
  text-decoration: none;
  color: black; 
}

/* li:hover {
  background-color: #EFD5C3;
} */

.link-content {
  margin: 0 20px 14px 20px;
}

img {
  /* border-radius: 5px 0 0 5px; */
}
</style>
