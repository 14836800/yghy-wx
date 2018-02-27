import '@babel/polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/styles/app.scss'
import {sync} from 'vuex-router-sync'
import store from '@/store/index'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from '@/router/index'
import httpPlugin from '@/utils/http'
import WxPlugin from '@/utils/wxPlugin'
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(VueMeta)
Vue.use(VueRouter)
Vue.use(httpPlugin,{store,router})
Vue.use(WxPlugin)
// 获取code 参数
const getUrlParam = (name)=>{
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r!=null) return unescape(r[2]); return null; //返回参数值
}
sync(store, router)
new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')