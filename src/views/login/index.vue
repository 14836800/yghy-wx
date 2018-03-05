<template>
  <div class="content">
      <img :src="img0" style="width:100%" />            
      <div class="in_content">
          <p>绑定会员卡</p>
          <form>
              <div class="form_one">
                <div><img :src="img1" /></div>
                <div><span>卡号：</span><input type='number'  v-model="user"   /></div>
              </div>
              <div class="form_one form_two">
                <div><img :src="img2" /></div>
                <div><span>密码：</span><input type='password' v-model="pwd" /></div>
              </div>
          </form>
          <div class="addr_save_btn" >绑定</div>
      </div>                                                                        
  </div>
</template>
<script>
export default {
  data(){
    return{
      img0: require('@/assets/images/index_02.jpg'),
      img1: require('@/assets/images/index_ico.png'),
      img2: require('@/assets/images/pas_ico.png'),
      user: '',
      pwd: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/login.scss";
</style>
