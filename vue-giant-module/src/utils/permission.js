import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const hasRoles = store.getters.routes && store.getters.routes.length > 0

  if (hasRoles) {
    next()
  } else {
    // get user info
    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
    // const { roles } = await store.dispatch('user/getInfo')
    const accessRoutes = await store.dispatch('permission/generateRoutes', 'admin')
    router.addRoutes(accessRoutes)
    next({ ...to, replace: true })
  }
})

router.afterEach(() => {
  NProgress.done()
})
