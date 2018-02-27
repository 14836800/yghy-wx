<template>
  <div :style="{display:disClose.disClose}" class="c_make" @touchmove.prevent>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    'disClose':'',
  },
  methods: {
    // bontclick:function(){
    //   this.$emit('inclick');
    // }
  },
}

</script>
<style lang="scss" scoped>
  .c_make{
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.2);
    z-index: 2;
    overflow: hidden;
    >div{
      display: -webkit-box;
      -webkit-box-align:center;
      -webkit-box-pack:center;
      height: 100%;
    }
  }
</style>
