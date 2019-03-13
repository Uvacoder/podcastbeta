<template>
  <div>    
    <input placeholder="Search" @input="onInputChange" ref="emptyinput"/>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: ["value"],
  data() {
    return {
      value: ""
    }
  },
  watch: {
    $route() {
      this.$refs.emptyinput.value = null;
    }
  },
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
  width: 28vw;
  border: none;
  /* border-bottom: 2px solid #DDD; */
  border-bottom: 2px solid #eee;
  height: 35px;
  transition: 0.3s ease-out;
}

input:focus {
  outline: none;
  border-bottom-color: #63ab97;
}

/* div{
  margin: 5px;
  margin-top: 30px;
  margin-bottom: 20px;
} */
</style>