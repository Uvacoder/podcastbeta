<template>
  <div>    
    <input placeholder="Search" @input="onInputChange"/>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  methods: {
    onInputChange: function(event) {
      this.$emit('inputChange', event.target.value);

      // console.log(event.target.value);
    }
  }
};
</script>


<style scoped>
input {
  font-family: inherit;
  font-size: 1.2em;
  width: 100%;
  border: none;
  border-bottom: 2px solid #DDD;
  height: 35px;
  transition: 0.3s ease-out;
}

input:focus {
  outline: none;
  border-bottom-color: #4F00FF;
}

div{
  margin: 5px;
}
</style>