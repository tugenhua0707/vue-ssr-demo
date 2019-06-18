
import { createApp } from './app';

const { app, router } = createApp();

// App.vue 模板中根元素 id = 'app'

router.onReady(() => {
  app.$mount('#app');
});
