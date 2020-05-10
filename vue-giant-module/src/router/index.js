import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const routers = [
  {
    path: '/page1',
    name: 'page1',
    meta: {
      title: '页面一',
      icon: 'el-icon-headset'
    },
    component: () => import('@/views/page1')
  },
  {
    path: '/page2',
    name: 'page2',
    meta: {
      title: '页面二',
      icon: 'el-icon-setting'
    },
    component: () => import('@/views/page2')
  },
  {
    path: '/page3parent',
    name: 'page3parent',
    meta: {
      title: '页面三父菜单',
      icon: 'el-icon-edit-outline'
    },
    component: () => import('@/views/routeview'),
    children: [
      {
        path: 'page3',
        name: 'page3',
        meta: {
          title: '页面三',
          icon: 'el-icon-date'
        },
        component: () => import('@/views/page3')
      }
    ]
  }

]

const createRouter = () => new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? '/app1' : '/',
  mode: 'history',
  routes: []
})

const router = createRouter()

export default router
