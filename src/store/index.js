import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/store/app/index'
Vue.use(Vuex)
let store = new Vuex.Store({
  modules:{
    app
  }
})
export default store