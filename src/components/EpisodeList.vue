<template>
  <div>
    <ul>
      <EpisodeListItem
        v-for="episode in episodes"
        :episode="episode"
        :key="episode.id"
      >
      </EpisodeListItem>
    </ul>
  </div>
</template>

<script>
import EpisodeListItem from "./EpisodeListItem";

export default {
  name: "EpisodeList",
  components: {
    EpisodeListItem
  },
  props: ["episodes"]
};
</script>

<style>
ul {
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 30vw;
}
</style>
