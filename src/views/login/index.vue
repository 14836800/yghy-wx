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
          <div class="addr_save_btn" @click="handleSubmit">绑定</div>
      </div>                                                                        
  </div>
</template>
<script>
import {isEmpty,getStore} from '@/utils/helps'
import {urlRedirect,appId} from '@/config/index'
export default {
  data(){
    return{
      img0: require('@/assets/images/index_02.jpg'),
      img1: require('@/assets/images/index_ico.png'),
      img2: require('@/assets/images/pas_ico.png'),
      user: '',
      pwd: ''
    }
  },
  methods:{
    handleSubmit(){
      if(isEmpty(this.user,'用户名不能为空') && isEmpty(this.pwd,'密码不能为空') && isEmpty(getStore('openId'),'oepnid不能为空')){
        let data = 'username='+this.user+'&password='+this.pwd+'&openId='+getStore('openId')
        this.$http.post('/merchat/bindWx',data)
          .then(({data})=>{
            if(data.status === '10000'){
              this.$router.push('/')
            }
          })
      }else{
        setTimeout(()=>{
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(urlRedirect)}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
        },2000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/login.scss";
</style>
