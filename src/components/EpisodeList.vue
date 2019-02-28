<template>
  <div>
    <ul class="list-group col-md-12">
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
}
</style>
