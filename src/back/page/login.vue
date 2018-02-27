<template>
  <div class="content">
      <img src="../images/index_02.jpg" style="width:100%" />            
      <div class="in_content">
          <p>绑定会员卡</p>
          <form>
              <div class="form_one">
                <div><img src="../images/index_ico.png" /></div>
                <div><span>卡号：</span><input type='number'  v-model="usr"   /></div>
              </div>
              <div class="form_one form_two">
                <div><img src="../images/pas_ico.png" /></div>
                <div><span>密码：</span><input type='password' v-model="pas" /></div>
              </div>
          </form>
          <div class="addr_save_btn" @click="onSubmit">绑定</div>
      </div>                                                                        
  </div>
</template>

<script>
import { wxCofig,getUrlParam,reqest,appId,isNo } from '../components/common';
var _this;
export default {
  name: 'Login',
  data () {
    return {
      openId:'',
      usr:'10001',
      pas:'633147'
    }
  },
  created(){
      this.openId=this.$route.query.openId;
      _this=this;
  },
  methods: {
    onSubmit() {
      if(isNo(this.usr,'卡号不能为空') && isNo(this.pas,'密码不能为空') && isNo(this.openId,'参数错误')){
        var data="username="+this.usr+"&password="+this.pas+'&openId='+this.openId;
        reqest(this,'/merchat/bindWx',data,undefined,function(data){
          if(data.status=="10000"){
              sessionStorage.setItem('openId',_this.openId);
              window.location.href='http://wwf.ngrok.xiaomiqiu.cn';
          }
        })
      }

    }
  }
}
</script>
<style scoped lang="scss">
  @import "../css/login.scss";
</style>
