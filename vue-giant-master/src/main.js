import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './utils/router.js'

Vue.config.productionTip = false

new Vue({
  el: '#container',
  router,
  store,
  render(h) {
    return h(App)
  }
})
