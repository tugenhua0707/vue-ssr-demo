
// router.js

import Vue from 'vue';

import Router from 'vue-router';

Vue.use(Router);

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/home',
        component: resolve => require(['./components/home'], resolve)
      },
      {
        path: '/item',
        component: resolve => require(['./components/item'], resolve)
      },
      {
        path: '*',
        redirect: '/home'
      }
    ]
  });
}