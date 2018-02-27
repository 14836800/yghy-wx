<template>
  <div>tes</div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  created(){
    this.setMessage({type:'validation',message:['sss']})
  },
  methods:{
    ...mapActions(['setMessage'])
  }
}
</script>
