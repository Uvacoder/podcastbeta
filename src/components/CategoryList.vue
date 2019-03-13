<template>
  <div class="category-link">

    <router-link v-for="(category, index) in categories" :to="{ path: '/topic/' + category + '/' }" class="category-path" :key="index">{{category}}</router-link>

  </div>
</template>

<script>
export default {
  name: "CategoryListMobile",
  data() {
    return {
      categories: ["art", "business", "crime", "food", "movies", "music", "startup", "technology"]
    };
  }
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