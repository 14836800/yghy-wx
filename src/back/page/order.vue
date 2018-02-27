<template>
  <div class="content">
    <div class="dd_info">
      <div class='info_left'><img src="../images/address.png" /></div>
      <div class='info_midden' @click="OnTap()" v-if="deliveryAddress">
        <div class='s_icade'>
          <div class='s_i_one'>收货人：{{deliveryAddress.consigneeName}}</div>
          <div class='s_i_two'>{{deliveryAddress.contact}}</div>
        </div>
        <div class='s_address'>收货地址：{{deliveryAddress.province}}{{deliveryAddress.city}}{{deliveryAddress.district}}{{deliveryAddress.address}}</div>
        <div class='bg_code'></div>
      </div>
      <div v-else class='info_midden'>请添加收货地址</div>
      <div class='info_right'><img src="../images/right.png" /></div>
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
           <textarea placeholder="请输入商品备注，最多50字哦" maxlength="150" v-model="remake"  class="remark_cont" placeholder-style="font-size:28rpx;color:#bfbfbf"/>
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
import Make from '../components/make.vue';
import { reqest,toast} from '../components/common';
var _this;
export default {
  name: 'Order',
  data () {
    return {
      fixedHeight:0,
      disClose:'none',
      dataValue:'',
      deliveryAddress:'',
      data:'',
      remake:''

    }
  },
  created() {
    this.dataValue=JSON.parse(this.$route.query.data);
    console.log(this.dataValue);
    var data='openId='+sessionStorage.getItem('openId');
    _this=this;
    reqest(this,'/merchat/deliveryAddress',data,undefined,function(data){
        if(data.status==200){
          _this.data=data.data;
          for(var i=0;i<data.data.addressList.length;i++){
            if(data.data.addressList[i].defaulted){
              _this.deliveryAddress=data.data.addressList[i];
            }
          }
        }
    })
  },
  components:{
    Make
  },
  methods: {
    OnTap(index){
      this.$router.push('./add_AD');
    },
    buttonSave(){
        if(this.data.balance>0){
          var headers={'Content-Type':'application/json;charset=utf-8'};
          var data={"deliveryAddrId": this.deliveryAddress.id,"num": this.dataValue.numValue,"openId":sessionStorage.getItem('openId'),"productId": this.dataValue.id,'remake':this.remake}
          reqest(this,'/order/create',data,headers,function(data){
              if(data.status==200){
                toast('购买成功',1000);
                setTimeout(function(){
                  _this.$router.replace('/');
                },1000);
              }else{
                toast(data.msg,undefined);
              }
          })
        }
        else{
          toast('余额不足，请尽快充值',undefined);
        }
    }
  },
  mounted(){
    var _this=this;

  }

}
</script>
<style scoped lang="scss">
  @import "../css/order.scss";
</style>
