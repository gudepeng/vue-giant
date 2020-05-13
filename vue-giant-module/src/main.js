import './public-path'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/utils/permission.js'

Vue.config.productionTip = false

let instance = null

export async function bootstrap({ prototype }) {
  prototype.map(p => {
    Vue.prototype[p.name] = p.value
  })
}

function initStore(props) {
  props.onGlobalStateChange && props.onGlobalStateChange((value, prev) => {})
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name
      }
    })
}

function render(props = {}) {
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

export async function mount(props) {
  initStore(props)
  if (props.data.userInfo.roles) {
    store.commit('permission/SET_ROLES', props.data.userInfo.roles)
  }
  render()
}

export async function unmount() {
  instance.$destroy()
  instance = null
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
