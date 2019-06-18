
import Vue from 'vue';

import App from './App.vue';

// 引入 router
import { createRouter } from './router';
// 引入store
import { createStore } from './store/index.js';

import { sync } from 'vuex-router-sync';

// 导出函数，用于创建新的应用程序
export function createApp () {

  // 创建 router的实列 
  const router = createRouter();

  // 创建 store 的实列
  const store = createStore();

  // 同步路由状态 (route state) 到 store
  sync(store, router);

  const app = new Vue({
    // 注入 router 到 根 vue实列中
    router,
    store,
    // 根实列简单的渲染应用程序组件
    render: h => h(App)
  });
  // 暴露 app, router, store
  return { app, router, store };
}