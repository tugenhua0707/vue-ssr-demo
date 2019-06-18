

function getTitle (vm) {
  // 组件可以提供一个 `title` 选项
  // 此选项可以是一个字符串或函数
  const { title } = vm.$options;

  if (title) {
    return typeof title === 'function' ? title.call(vm) : title;
  } else {
    return 'Vue SSR Demo';
  }
}

const serverTitleMixin = {
  created () {
    const title = getTitle(this);
    if (title && this.$ssrContext) {
      this.$ssrContext.title = title;
    }
  }
};

const clientTitleMixin = {
  mounted () {
    const title = getTitle(this);
    if (title) {
      document.title = title;
    }
  }
};

// 我们可以通过 'webpack.DefinePlugin' 注入 'VUE_ENV'

export default process.env.VUE_ENV === 'server' ? serverTitleMixin : clientTitleMixin;