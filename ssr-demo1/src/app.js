
const Vue = require('vue');

module.exports = function createApp (ctx) {
  return new Vue({
    data: {
      url: ctx.url
    },
    template: `<div>访问的URL是：{{url}}</div>`
  })
} 