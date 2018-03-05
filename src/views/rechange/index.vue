<template>
  <div class="content">
      <div class="cont_re">
          <p>充值金额</p>
          <div class="cont_pt">
            <label><span>￥</span><input v-model="price" type="number" placeholder="" /></label>
          </div>
          <button class="addr_save_btn"  :disabled="!isActive"  type="button" @click="saveButton">充值</button>
      </div>
  </div>
</template>

<script>
import {getStore} from '@/utils/helps'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      isActive:false,
      price: null
    }
  },
  methods: {
    ...mapActions(['setMessage','setFetching']),
    saveButton(){
      let that = this
      if(this.price >0){
        let data = `openId=${getStore('openId')}&amount=${this.price}`
        this.setFetching({fetching:true})
        this.$http.post('/merchat/recharge',data)
          .then(({data})=>{
            if(data.status === '200'){
              this.setFetching({fetching:false})
              this.$wx.chooseWXPay({
                appId: data.data.appId, // 支付签名随机串，不长于 32 位
                nonceStr: data.data.nonceStr, // 支付签名随机串，不长于 32 位
                package: "prepay_id="+data.data.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                paySign: data.data.sign, // 支付签名
                signType: 'MD5',
                timestamp:data.data.timeStamp,
                success: function (res) {
                     if(res.errMsg == "chooseWXPay:ok" ) {
                       that.setMessage({type:'success',message:'支付成功'})
                       setTimeout(()=>{
                         that.$router.go(-1)
                       },1500)
                     }
                },
                cancel:function(res){
                  that.setMessage({type:'error',message:['支付失败.'+res]})
                }
              })
            }
          })
      }
    }
  },
  watch:{
    price(val){
      if(val>0){
        this.isActive = true
      }else{
        this.isActive = false
      }
    }
  }
}
</script>
<style scoped lang="scss">
  @import "../../styles/rechange.scss";
</style>
