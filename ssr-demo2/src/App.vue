<style lang="stylus">
  h1
    color red
    font-size 22px
</style>

<template>
  <div id="app">
    <router-view></router-view>
    <h1>{{ msg }}</h1>
    <input type="text" v-model="msg" />
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'app',
    data() {
      return {
        msg: '欢迎光临vue.js App'
      }
    }
  }
</script>