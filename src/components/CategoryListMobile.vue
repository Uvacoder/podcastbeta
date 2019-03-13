<template>
  <div class="category-link">
    <div ref="app_type" class="ui simple dropdown">
      <!-- <input type="hidden" name="category"> -->
      <div class=text>Category</div>
      <i class="dropdown icon"></i>
      <!-- <div class="default text">Category</div> -->
      <div class="menu">
        <router-link :to="{ path: '/topic/art/' }" class="category-path item" data-value="art">Art</router-link>
        <router-link :to="{ path: '/topic/business/' }" class="category-path item" data-value="business">Business</router-link>
        <router-link :to="{ path: '/topic/crime/' }" class="category-path item" data-value="crime">Crime</router-link>
        <router-link :to="{ path: '/topic/food/' }" class="category-path item" data-value="food">Food</router-link>
        <router-link :to="{ path: '/topic/movies/' }" class="category-path item" data-value="movies">Movies</router-link>
        <router-link :to="{ path: '/topic/music/' }" class="category-path item" data-value="music">Music</router-link>
        <router-link :to="{ path: '/topic/startup/' }" class="category-path item" data-value="startup">Startup</router-link>
        <router-link :to="{ path: '/topic/technology/' }" class="category-path item" data-value="technology">Technology</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryListMobile",
  // mounted() {
  //   $(this.$refs.app_type).dropdown();
  // }
}
</script>

<style scoped>

.category-link {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.category-path {
  text-decoration: none;
  color: black;
  text-transform: uppercase;
}

.category-path:hover {
  color: #63ab97;
}

</style>