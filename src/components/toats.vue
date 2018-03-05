<template>
  <div class="toats">
    <transition name="slide-fade">
      <div id="success-msg" v-show="hasSuccessMessage">{{message.success}}</div>
    </transition>
    <transition name="slide-fade">
      <div id="error-msg" v-show="hasErrorMessage">{{formatedErrorMessage}}</div>
    </transition>
    <transition name="slide-fade">
      <div id="validation-msg" v-show="hasValidationMessage">{{formatedValidationMessage}}</div>
    </transition>
  </div>
</template>
<script>
  import {mapState,mapActions} from 'vuex'
  export default{
    computed: {
      ...mapState({
        'message': state=>state.app.message
      }),
      hasSuccessMessage() {
        return this.message.success !== ''
      },
      hasErrorMessage() {
        return this.message.error.length > 0
      },
      hasValidationMessage() {
        return this.message.validation !== ''
      },
      formatedErrorMessage() {
        return this.message.error.map(msg => `${msg}`).join('<br>')
      },
      formatedValidationMessage() {
        return this.message.validation
      },
    },
    methods:{
      ...mapActions(['setMessage'])
    },
    watch:{
      hasSuccessMessage(val){
        if(val){
          setTimeout(()=>{
            this.setMessage({type:'success',message:''})
          },1000);
        }
      },
      hasErrorMessage(val){
        if(val){
          setTimeout(()=>{
            this.setMessage({type:'error',message:[]})
          },1000); 
        }
      },
      hasValidationMessage(val){
        if(val){
          setTimeout(()=>{
            this.setMessage({type:'validation',message:''})
          },1000); 
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  bottom: 10px;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  bottom: 0px;
  opacity: 0;
}
</style>

