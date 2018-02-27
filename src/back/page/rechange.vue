<template>
  <div class="content">
      <div class="cont_re">
          <p>充值金额</p>
          <div class="cont_pt">
            <label><span>￥</span><input ref='money' @input="exchange" type="number" placeholder="" /></label>
          </div>
          <div :class="['addr_save_btn',{ save_btn: isActive}]"  @click="saveButton()">充值</div>
      </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk';
import { Field  ,DatetimePicker} from 'mint-ui';
import {reqest,wxCofig,toast} from '../components/common';
var _this;
export default {
  name: 'Order',
  data () {
    return {
      isActive:false
    }
  },
  methods: {
    saveButton(){
      var value=this.$refs.money.value;
      var openId=sessionStorage.getItem('openId');
      if(value){
        var data="openId="+openId+"&amount="+value;
        reqest(this,'/merchat/recharge',data,undefined,function(data){
          if(data.status==200){
            wx.chooseWXPay({
                appId: data.data.appId, // 支付签名随机串，不长于 32 位
                nonceStr: data.data.nonceStr, // 支付签名随机串，不长于 32 位
                package: "prepay_id="+data.data.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                paySign: data.data.sign, // 支付签名
                signType: 'MD5',
                timestamp:data.data.timeStamp,
                success: function (res) {
                     if(res.errMsg == "chooseWXPay:ok" ) {
                        Global.str_error("支付成功");
                        setTimeout(function(){
                          wx.closeWindow();
                        },500);
                     }
                },
                cancel:function(res){
                    toast('支付失败');
                }
              });
            // toast('充值成功',1000);
            // setTimeout(function(){
            //   _this.$router.replace('/');
            // },1000);
          }
        })
      }
      else{
        toast('请输入充值金额');
      }
    },
    exchange(){
      var value=this.$refs.money.value;
      if(value){
        this.isActive=true;
      }
      else{
        this.isActive=false;
      }
    }
  },
  mounted(){
    _this=this;

  },
  components: {
    Field
  }

}
</script>
<style scoped lang="scss">
  @import "../css/rechange.scss";

</style>
