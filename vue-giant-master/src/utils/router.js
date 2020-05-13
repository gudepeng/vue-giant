import router from '../router'
import store from '../store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getUserToken } from '@/utils/user'
import Layout from '@/layout/index.vue'

NProgress.configure({
  showSpinner: false
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const hasToken = getUserToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({
        path: '/home'
      })
      NProgress.done()
    } else {
      const isLogin = store.getters.userInfo
      if (isLogin) {
        next()
      } else {
        try {
          await store.dispatch('user/getUserInfo')
          router.addRoutes([
            {
              path: '/',
              name: 'Layout',
              component: Layout,
              children: [
                {
                  path: 'app1*'
                }
              ]
            }
          ])
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
      NProgress.done()
    } else {
      next({
        path: '/login'
      })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
