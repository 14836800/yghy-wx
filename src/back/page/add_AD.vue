<template>
  <div class="content">
    <div class="order">
      <div class="order_up">
          <div v-if="deliveryAddress">
            <div class="order_up_item" v-for="(item,index) in deliveryAddress" >
                <div class="sy_bk_detail">
                  <div class='sy_check' @click="defaultValue()"><div :class="['sy_check_div', item.defaulted ? 'sy_check_div_over' : '']"></div></div>
                  <div class='info_midden'>
                    <div class='s_icade'>
                      <div class='s_i_one'>收货人：{{item.consigneeName}}</div>
                      <div class='s_i_two'>{{item.contact}}</div>
                    </div>
                    <div class='s_address'>收货地址：{{item.province}}{{item.city}}{{item.district}}{{item.address}}</div>
                    <div class='bg_code'></div>
                  </div>
                </div>
                <!-- <div class='s_edit'>
                    <div @click="OnTapBj()">编辑</div>
                    <div @click="OnTapDel()">删除</div>
                </div> -->
            </div>
          </div>
          <div v-else class="order_info_more">没有更多啦！</div>
      </div>
      <!-- <div class="order_info_more" wx:else>暂无收货地址</div> -->
    </div>
    <div catchtap='OnTaptoShdz' class='add_adres' @click="OnTapBj()">添加新地址</div>
  </div>
</template>

<script>
var _this;
import { reqest,toast} from '../components/common';
export default {
  name: 'Order',
  data () {
    return {
      defaultFloat:false,
      deliveryAddress:''
    }
  },
  created() {
    var data='openId='+sessionStorage.getItem('openId');
    _this=this;
    reqest(this,'/merchat/deliveryAddress',data,undefined,function(data){
        if(data.status==200){
          _this.deliveryAddress=data.data.addressList;
        }
    })
  },
  methods: {
    //编辑
    OnTapBj(index){
      this.$router.push('./add_adres');
    },
    //删除
    OnTapDel(index){
      //console.log(index);
    },
    defaultValue(){
      // if(this.defaultFloat){
      //   this.defaultFloat=false;
      // }
      // else{
      //   this.defaultFloat=true;
      // }
    }
  },
  mounted(){
    var _this=this;

  }

}
</script>
<style scoped lang="scss">
  @import "../css/add_AD.scss";
</style>
