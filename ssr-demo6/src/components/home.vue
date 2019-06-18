<template>
  <h1>home222</h1>
</template>
<script>
  import titleMixin from '../mixins/title-mixins.js';
  export default {
    name: "home",
    mixins: [titleMixin],
    title() {
      return 'Home页面';
    },
    data(){
      return{
         
      }
    }
  }
</script>
<style scoped>

</style>

