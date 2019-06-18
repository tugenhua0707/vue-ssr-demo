
<template>
  <div>item页 请求数据结果：{{ item.name.text }}</div>
</template>
<script>
  import titleMixin from '../mixins/title-mixins.js';
  export default {
    name: "item",
    mixins: [titleMixin],
    title() {
      return 'item页面';
    },
    asyncData ({ store, route }) {
      // 触发action代码，会返回 Promise
      return store.dispatch('fetchItem', 'name');
    },
    computed: {
      // 从 store 的 state 对象中的获取 item。
      item () {
        console.log(this.$store.state);
        return this.$store.state.items;
      }
    }
  }
</script>

<style scoped>

</style>

