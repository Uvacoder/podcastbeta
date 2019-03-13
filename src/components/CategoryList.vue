<template>
  <div class="category-link">
    <router-link :to="{ path: '/topic/art/' }" class="category-path">Art</router-link>
    <router-link :to="{ path: '/topic/business/' }" class="category-path">Business</router-link>
    <router-link :to="{ path: '/topic/crime/' }" class="category-path">Crime</router-link>
    <router-link :to="{ path: '/topic/food/' }" class="category-path">Food</router-link>
    <router-link :to="{ path: '/topic/movies/' }" class="category-path">Movies</router-link>
    <router-link :to="{ path: '/topic/music/' }" class="category-path">Music</router-link>
    <router-link :to="{ path: '/topic/startup/' }" class="category-path">Startup</router-link>
    <router-link :to="{ path: '/topic/technology/' }" class="category-path">Technology</router-link>
  </div>
</template>

<script>
export default {
  name: "CategoryListMobile"
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

.router-link-active {
  color: #63ab97;
}

</style>