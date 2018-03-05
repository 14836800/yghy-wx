import '@babel/polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import '@/utils/rem'
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
sync(store, router)
new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')