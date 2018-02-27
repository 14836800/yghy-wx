import Vue from 'vue'
import Router from 'vue-router'
import Index from '../page/index'
import Login from '../page/login'
import Arclist from '../page/arclist'
import Order from '../page/order'
import Add_AD from '../page/add_AD'
import Add_adres from '../page/add_adres'
import Search from '../page/search'
import Myorder from '../page/myorder'
import Rechange from '../page/rechange'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta:{
        notKeepAlive:true
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/arclist',
      name: 'Arclist',
      component: Arclist,
      meta:{
        notKeepAlive:false
      },
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta:{
        notKeepAlive:false
      },
    },
    {
      path: '/add_AD',
      name: 'Add_AD',
      component: Add_AD
    },
    {
      path: '/add_adres',
      name: 'Add_adres',
      component: Add_adres
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/myorder',
      name: 'Myorder',
      component: Myorder
    },
    {
      path: '/rechange',
      name: 'Rechange',
      component: Rechange
    }
  ],
  // mode:'history'
});
