import Router from 'vue-router'
export default new Router({
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
    component: ()=>import('../views/index')
  }]
})