<template>
  <router-link :to="{ path: '/topic/' +this.$route.params.series+ '/' + episode.id }" class="link-decoration">
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
  border: 1px solid #DDD;
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
  /* height: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px; */
}

img {
  /* height: 150px; */
  /* border-radius: 5px; */
  /* border: 1px solid #eee; */
}

.router-link-active li {
  background-color: #DDD;
}
</style>
