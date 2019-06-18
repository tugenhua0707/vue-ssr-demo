
import { createApp } from './app';

export default context => {
  /*
  const { app } = createApp();
  return app;
  */
  /*
   由于 路由钩子函数或组件 有可能是异步的，比如 同步的路由是这样引入 import Foo from './Foo.vue'
   但是异步的路由是这样引入的：
   {
      path: '/index',
      component: resolve => require(['./views/index'], resolve)
   }
   如上是 require动态加载进来的，因此我们这边需要返回一个promise对象。以便服务器能够等待所有的内容在渲染前
   就已经准备好就绪。
  */
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    // 设置服务器端 router的位置
    router.push(context.url);

    /* 
      router.onReady()
      等到router将可能的异步组件或异步钩子函数解析完成，在执行，就好比我们js中的 
      window.onload = function(){} 这样的。
      官网的解释：该方法把一个回调排队，在路由完成初始导航时调用，这意味着它可以解析所有的异步进入钩子和
      路由初始化相关联的异步组件。
      这可以有效确保服务端渲染时服务端和客户端输出的一致。
    */
    router.onReady(() => {
      /*
       getMatchedComponents()方法的含义是：
       返回目标位置或是当前路由匹配的组件数组 (是数组的定义/构造类，不是实例)。
       通常在服务端渲染的数据预加载时使用。
       有关 Router的实列方法含义可以看官网：https://router.vuejs.org/zh/api/#router-forward
      */
      const matchedComponents = router.getMatchedComponents();

      // 如果匹配不到路由的话，执行 reject函数，并且返回404
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
      // 对所有匹配的路由组件 调用  'asyncData()'
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          });
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state
        resolve(app);
      }).catch(reject)
      // 正常的情况
      // resolve(app);
    }, reject);
  }).catch(new Function());
}