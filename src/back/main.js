// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  './assets/Adaptive.js'
import axios from 'axios'
import 'mint-ui/lib/style.css';
Vue.config.productionTip = false
Vue.use(axios)
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
