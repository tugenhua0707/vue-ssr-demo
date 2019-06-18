
import Vue from 'vue';

import App from './App.vue';

// 引入 router
import { createRouter } from './router';

// 导出函数，用于创建新的应用程序
export function createApp () {
  // 创建 router的实列 
  const router = createRouter();

  const app = new Vue({
    // 注入 router 到 根 vue实列中
    router,
    // 根实列简单的渲染应用程序组件
    render: h => h(App)
  });
  return { app, router };
}