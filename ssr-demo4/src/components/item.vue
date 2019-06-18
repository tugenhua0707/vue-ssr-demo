
<template>
  <div>item页 请求数据结果：{{ item.name.text }}</div>
</template>
<script>
export default {
  name: "item",
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

