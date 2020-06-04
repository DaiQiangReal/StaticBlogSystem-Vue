import Vue from 'vue'
import Blog from './Blog.vue'

Vue.config.productionTip = false
new Vue({
  render: h => h(Blog),
}).$mount('#blog')
