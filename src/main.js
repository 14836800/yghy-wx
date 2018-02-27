import '@babel/polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import {sync} from 'vuex-router-sync'
import VueMeta from 'vue-meta'
import App from './App.vue'
Vue.config.productionTip = false
Vue.use(MintUI)
// Vue.use(VueMeta)
Vue.use(VueRouter)
new Vue({
    // store,
    // router,
    render: h => h(App)
  }).$mount('#app')