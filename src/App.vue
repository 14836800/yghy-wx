<template>
  <div id="app">
    <!-- 加载动画 -->
    <div class="loader" v-show="isLoading">
      <div class="loader-inner">
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loading-text">加载中</div>
      </div>
    </div>
    <!-- toats 提示-->
    <toats></toats>
    <!-- 路由插座-->
    <router-view></router-view>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Toats from '@/components/toats'
import WxConfig from '@/utils/wxConfig'
export default {
  components:{
    Toats
  },
  beforeCreate(){
    WxConfig(this)
  },
  computed:{
    ...mapState({
      'isLoading': state=> state.app.isLoading,
      'fetching': state=> state.app.fetching
    })
  }
}
</script>
