<template>
  <div class="content" v-if="data">
    <div class="dd_info" @click="OnTap">
      <div class='info_left'><img :src="img1" /></div>
      <div v-if="data.defaultAddress">
        <div class='info_midden' v-for="(item,index) in data.defaultAddress" :key="index" v-if="item.defaulted">
          <div class='s_icade'>
            <div class='s_i_one'>收货人：{{item.consigneeName}}</div>
            <div class='s_i_two'>{{item.contact}}</div>
          </div>
          <div class='s_address'>收货地址：{{item.province}}{{item.city}}{{item.district}}{{item.address}}</div>
          <div class='bg_code'></div>
        </div>
        <div v-else class='info_midden'>请选择收货地址</div>
      </div>
      <div v-if="getAddress">
        <div class='info_midden'>
          <div class='s_icade'>
            <div class='s_i_one'>收货人：{{getAddress.consigneeName}}</div>
            <div class='s_i_two'>{{getAddress.contact}}</div>
          </div>
          <div class='s_address'>收货地址：{{getAddress.province}}{{getAddress.city}}{{getAddress.district}}{{getAddress.address}}</div>
          <div class='bg_code'></div>
        </div>
      </div>
      <div v-else class='info_midden'>请添加收货地址</div>
      <div class='info_right'><img :src="img2" /></div>
   </div>
   <div class="dd_info_up">
          <div class="sy_bk_detail">
            <img :src="dataValue.thumbnail" class="bk_det_left" />
            <div class="bk_det_right">
                <div class="bk_right_up">{{dataValue.number}} {{dataValue.name}} {{dataValue.level}}</div>
                <div class="bk_bott_dis_mon">￥{{dataValue.price}}<i class='bk_num'>x{{dataValue.numValue}}</i></div>
            </div>
          </div>
          <div class='info_div'>
           <div class="dd_info_detail">
               <div class="info_det_txt">配送费</div>
               <div class="info_det_num total_mon">￥{{data.postageFee}}</div>
           </div>
           <div class="dd_info_detail">
               <div class="info_det_txt">总价</div>
               <div class="info_det_num total_mon">￥{{dataValue.price*dataValue.numValue}}</div>
           </div>
           <div class="dd_info_remark">
           <div class="remark_title">买家备注</div>
           <textarea placeholder="请输入商品备注，最多50字哦" maxlength="50" v-model="remake"  class="remark_cont" placeholder-style="font-size:28rpxcolor:#bfbfbf"/>
         </div>
        </div>

    </div>
    <div class='s_bottom'>
      <div class='s_left'>
        <div>余额：<i>￥{{data.balance}}</i></div>
      </div>
      <div class='s_right' @click="buttonSave">提交订单</div>
    </div>
  </div>
</template>

<script>
import {getStore} from '@/utils/helps'
import {mapActions,mapGetters} from 'vuex'
export default {
  data () {
    return {
      img1: require('@/assets/images/address.png'),
      img2: require('@/assets/images/right.png'),
      dataValue:'',
      data:null,
      remake:''

    }
  },
  created() {
    this.dataValue=JSON.parse(this.$route.query.data)
    this.initData()
  },
  methods: {
    ...mapActions(['setFetching','setMessage']),
    initData(){
      let data='openId='+ getStore('openId')
      this.setFetching({fetching:true})
      this.$http.post('/merchat/deliveryAddress',data)
        .then(({data})=>{
          if(data.status === '200'){
            this.setFetching({fetching:false})
            this.data = data.data
          }
        })
    },
    OnTap(){
      this.$router.push({path:'/address'})
    },
    buttonSave(){
      if(this.data.balance>0){
         if(this.getAddress){
          let data = Object.assign({},{"deliveryAddrId": this.getAddress.id,"num": this.dataValue.numValue,"openId":getStore('openId'),"productId": this.dataValue.id,'remake':this.remake})
          this.$http.post('/order/create',data)
            .then(({data})=>{
              if(data.status === '200'){
                this.setMessage({type:'success',message:'购买成功'})
                setTimeout(()=>{
                  this.$router.replace({path:'/'})
                },1000)
              }
            })
        }else if(this.selAddress){
          let data = Object.assign({},{"deliveryAddrId": this.selAddress.id,"num": this.dataValue.numValue,"openId":getStore('openId'),"productId": this.dataValue.id,'remake':this.remake})
          this.$http.post('/order/create',data)
            .then(({data})=>{
              if(data.status === '200'){
                this.setMessage({type:'success',message:'购买成功'})
                setTimeout(()=>{
                  this.$router.replace({path:'/'})
                },1000)
              }
            })
        }else{
          this.setMessage({type:'error',message:['请选择收货地址']})
        }
      }else{
        this.setMessage({type:'error',message:['余额不足']})
      }
    }
  },
  computed:{
    ...mapGetters(['getAddress']),
    selAddress(){
      if(this.data.defaultAddress){
        return this.data.defaultAddress.map((item,index)=>{
          if(item.defaulted){
            return item
          }
        })
      }else{
        return null
      }
    }
  }
}
</script>
<style scoped lang="scss">
  @import "../../styles/order.scss"
</style>
