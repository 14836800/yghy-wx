<template>
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
        <div class="loading-text">{{loadingText}}</div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    isLoading:{
      type: Boolean,
      default: false
    },
    loadingText:{
      type: String,
      default: '正在加载中'
    }
  }
}
</script>
