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
  },{
    path: '/login',
    name: '登入绑定',
    component: ()=>import('../views/login/index')
  },{
    path: '/rechange',
    name: '充值',
    component: ()=>import('../views/rechange/index')
  },{
    path: '/product',
    name: '商品详情',
    component: ()=>import('../views/product/index')
  },{
    path: '/order',
    name: '确定支付',
    component: ()=>import('../views/product/order')
  },{
    path: '/address',
    name: '',
    component: ()=>import('../views/product/address'),
    children: [{
      path: '',
      name: '选择地址',
      component: ()=>import('../views/product/selectAddress')
    },{
      path: 'create',
      name: '创建收货地址',
      component: ()=>import('../views/product/createAddress')
    }]
  }]
})

router.beforeEach(beforeEach)
router.afterEach(afterEach)
export default router