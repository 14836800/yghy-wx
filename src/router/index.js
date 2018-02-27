import Router from 'vue-router'
import beforeEach from '@/router/beforeEach'
import afterEach from '@/router/afterEach'
const router = new Router({
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
        return { x: 0, y: to.meta.savedPosition ||0}
    }
  },
  routes: [{
    path: '/',
    name: '首页',
    component: ()=>import('../views/index/index')
  }]
})

router.beforeEach(beforeEach)
router.afterEach(afterEach)
export default router