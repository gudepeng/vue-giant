import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const hasRouter = store.getters.routes && store.getters.routes.length > 0

  if (hasRouter) {
    next()
  } else {
    // get user info
    const roles = await store.state.permission.roles
    const accessRoutes = await store.dispatch(
      'permission/generateRoutes',
      roles
    )
    router.addRoutes(accessRoutes)
    next({ ...to, replace: true })
  }
})

router.afterEach(() => {
  NProgress.done()
})
