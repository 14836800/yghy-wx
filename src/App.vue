<template>
  <div id="app">
    <!-- 加载动画 -->
    <loading :isLoading="isLoading" :loadingText="'正在加载中'"></loading>
    <loading :isLoading="fetching" :loadingText="'请求数据中'"></loading>
    <!-- toats 提示-->
    <toats></toats>
    <!-- 路由插座-->
    <router-view></router-view>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Toats from '@/components/toats'
import Loading from '@/components/loading'
import WxConfig from '@/utils/wxConfig'
export default {
  components:{
    Toats,
    Loading
  },
  beforeCreate(){
    WxConfig(this)
  },
  computed:{
    ...mapState({
      'isLoading': state=> state.app.isLoading,
      'fetching': state=> state.app.fetching
    })
  },
  metaInfo(){
    // 设置应用标题
    return {
      title: this.$route.name
    }
  }
}
</script>
