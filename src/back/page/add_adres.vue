<template>
  <div class="content">
    <div class="shdz">
      <div class="shdz_addr">
       <div class="addr_item">
         <span>姓名</span>
         <input type="span" placeholder="最少两个字" v-model="callMe.consigneeName"  class="place_holder" />
       </div>
        <div class="addr_item">
         <span>手机</span>
         <input type="number" placeholder="那个输入11位手机号" v-model="callMe.contact"  class="place_holder" />
       </div>
        <div class="addr_item padding">
         <span>地区</span>
         <div class="place_holder" @click="handleClick">{{cnCityProvince}} {{cnCityCity}} {{cnCityCounty}}</div>
       </div>
        <div class="addr_item">
         <span>地址</span>
         <input type="span" v-model="callMe.address" placeholder="详细地址" class="place_holder" />
       </div>
        <!-- <div class="addr_item">
         <span>邮编</span>
         <input type="number" placeholder="6位邮政编码"  v-model="callMe.province"  class="place_holder" />
       </div> -->
      </div>
       <div class="addr_save_btn" @click="save()">保存</div>
      </div>
      <div class="pos_bottom" style="background-color:white;">
        <Popup
          v-model="popupVisible"
          position="bottom">
          <Picker :slots="slots" @change="onMyAddressChange"></Picker>
        </Popup>
      </div>
  </div>
</template>

<script>
import { Picker,Popup,Toast } from 'mint-ui'
import cnCity from '../assets/cnCity.json'
import {reqest,isNo,isiPone} from '../components/common';
var _this;
export default {
  name: 'Order',
  data () {
    return {
      slots: [
        {
          flex: 1,
          values: Object.keys(cnCity),
          className: 'slot1',
          textAlign: 'left'
        },{
          flex: 1,
          values: Object.keys(cnCity),
          className: 'slot1',
          textAlign: 'center'
        } ,{
          flex: 1,
          values: Object.keys(cnCity),
          className: 'slot1',
          textAlign: 'right'
        }
      ],
      cnCityProvince:'省',
      cnCityCity:'市',
      cnCityCounty:'区/县',
      popupVisible:false,
      callMe: {"address": "","city": "","consigneeName": "","contact": "","district": "","province": "",openId:""}
    }
  },
  created() {
    //do something after creating vue instance
    _this=this;
  },
  methods: {
    onMyAddressChange(picker, values) {
       if(cnCity[values[0]]){  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
          picker.setSlotValues(1,Object.keys(cnCity[values[0]])); // Object.keys()会返回一个数组，当前省的数组
          picker.setSlotValues(2,cnCity[values[0]][values[1]]); // 区/县数据就是一个数组
          this.cnCityProvince = values[0];
          this.cnCityCity = values[1];
          this.cnCityCounty = values[2];
        }
      },
      handleClick: function() {
        this.popupVisible = true
      },
      save(){
        this.callMe.province=this.cnCityProvince;
        this.callMe.city=this.cnCityCity;
        this.callMe.district=this.cnCityCounty;
        this.callMe.openId=sessionStorage.getItem('openId');
        if(isNo(this.callMe.consigneeName,'姓名不能为空') && isiPone(this.callMe.contact) && isNo(this.callMe.address,'详细地址不能为空')){
          var data=this.callMe;
          var headers={'Content-Type':'application/json;charset=utf-8'};
          reqest(this,'/merchat/deliveryAddress/add',data,headers,function(data){
            if(data.status==200){
              Toast({
                message: '新增成功',
                position: 'bottom',
                duration: 1000
              });
              setTimeout(function(){
                _this.$router.back();
              },1000);
            }
          })
        }
      }
  },
  mounted(){
    this.$nextTick(() => {
        this.slots[0].defaultIndex = 0
    });

  },
  components: {
    Picker,
    Popup
  }

}
</script>
<style scoped lang="scss">
  @import "../css/add_adres.scss";
</style>
