<template>
  <div class="content">
    <div class="order">
      <div class="order_up">
          <div v-if="addressList">
            <div class="order_up_item" v-for="(item,index) in addressList" :key="index">
                <div class="sy_bk_detail" @click="handleSelAddress(item,index)">
                  <div class='sy_check' ><div :class="['sy_check_div', (item.defaulted) ? 'sy_check_div_over' : '']"></div></div>
                  <div class='info_midden'>
                    <div class='s_icade'>
                      <div class='s_i_one'>收货人：{{item.consigneeName}}</div>
                      <div class='s_i_two'>{{item.contact}}</div>
                    </div>
                    <div class='s_address'>收货地址：{{item.province}}{{item.city}}{{item.district}}{{item.address}}</div>
                    <div class='bg_code'></div>
                  </div>
                </div>
            </div>
            <button type="button" @click="save" class="addr_save_btn">确定</button>
          </div>
          <div v-else class="order_info_more">没有更多啦！</div>
      </div>
    </div>
    <router-link class='add_adres' to="/address/create">添加新地址</router-link>
  </div>
</template>
<script>
import {getStore} from '@/utils/helps'
import {mapActions} from 'vuex'
export default {
  data(){
    return {
      addressList:null,
      addressData: null,
      // isActive: false
    }
  },
  mounted(){
    this.initData()
  },
  methods:{
    ...mapActions(['setFetching','setAddress','setMessage']),
    initData(){
      let data='openId='+ getStore('openId')
      this.setFetching({fetching:true})
      this.$http.post('/merchat/deliveryAddress',data)
        .then(({data})=>{
          if(data.status === '200'){
            this.setFetching({fetching:false})
            if(data.data.addressList){
              this.addressList = data.data.addressList
            }
          }
        })
    },
    handleSelAddress(item,index){
      this.addressList[index].defaulted = !this.addressList[index].defaulted
      // this.isActive = !this.isActive
      if(this.addressList[index].defaulted){
        this.addressData = item
      }else{
        this.addressData = null
      } 
    },
    save(){
      if(this.selAddress[0]){
        this.setAddress(this.selAddress[0])
        this.$router.back()
      }else if(this.addressData){
        this.setAddress(this.addressData)
        this.$router.back()
      }else{
        this.setMessage({type:'error',message:['请选择地址']})
      }
    }
  },
  computed:{
    selAddress(){
      return this.addressList.map((item,index)=>{
        if(item.defaulted){
          return item
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../styles/add_AD.scss'
</style>

