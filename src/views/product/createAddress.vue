<template>
  <div class="content">
    <div class="shdz">
      <div class="shdz_addr">
       <div class="addr_item">
         <span>姓名</span>
         <input type="span" placeholder="最少两个字" v-model="consigneeName"  class="place_holder" />
       </div>
        <div class="addr_item">
         <span>手机</span>
         <input type="number" placeholder="那个输入11位手机号" v-model="contact"  class="place_holder" />
       </div>
        <div class="addr_item padding">
         <span>地区</span>
         <div class="place_holder" @click="handleClick">{{cnCityProvince}} {{cnCityCity}} {{cnCityCounty}}</div>
       </div>
        <div class="addr_item">
         <span>地址</span>
         <input type="span" v-model="address" placeholder="详细地址" class="place_holder" />
       </div>
      </div>
       <div class="addr_save_btn" @click="save">保存</div>
      </div>
      <div class="pos_bottom" style="background-color:white">
        <Popup
          v-model="popupVisible"
          position="bottom">
          <Picker :slots="slots" @change="onMyAddressChange"></Picker>
        </Popup>
      </div>
  </div>
</template>
<script>
import { Picker,Popup} from 'mint-ui'
import {mapActions} from 'vuex'
import cnCity from '@/assets/cnCity.json'
import {isEmpty,isPhone,getStore} from '@/utils/helps'
export default {
  components:{
    Picker,
    Popup
  },
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
      consigneeName: '',
      contact: '',
      address: ''
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.slots[0].defaultIndex = 0
    })
  },
  methods:{
    ...mapActions(['setMessage','setFetching']),
    onMyAddressChange(picker, values) {
      if(cnCity[values[0]]){  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
        picker.setSlotValues(1,Object.keys(cnCity[values[0]])) // Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2,cnCity[values[0]][values[1]]) // 区/县数据就是一个数组
        this.cnCityProvince = values[0]
        this.cnCityCity = values[1]
        this.cnCityCounty = values[2]
      }
    },
    handleClick() {
      this.popupVisible = true
    },
    save(){
      if(isEmpty(this.consigneeName,'姓名不能为空') && isEmpty(this.address,'地址不能为空') && isPhone(this.contact)){
        let data = Object.assign({},{province:this.cnCityProvince,city:this.cnCityCity,district:this.cnCityCounty,openId:getStore('openId'),consigneeName:this.consigneeName,address:this.address,contact:this.contact})
        this.setFetching({fetching:true})
        this.$http.post('/merchat/deliveryAddress/add',data)
          .then(({data})=>{
            if(data.status === '200'){
              this.setFetching({fetching:false})
              this.setMessage({type:'success',message:'添加成功'})
              setTimeout(()=>{
                this.$router.back()
              },500)
            }
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../styles/add_adres.scss"
</style>

