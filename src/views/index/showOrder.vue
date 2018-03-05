<template>
  <div class="content">
    <div class="btn_searc bt_flid" @click="handleOpenStart" :style="{color:floatColor_start}">{{dateStart}}</div>
    <div class="btn_searc bt_flid" @click="handleOpenEnd" :style="{color:floatColor_end}">{{dateEnd}}</div>
    <div class="btn_searc" @click="searchButton">查询</div>
    <div class="u_btn">
      <ul class="c_i_list" v-if="dataValue">
        <li v-for="(item,index) in dataValue" :key="index">
          <div class="c_i_left"><img :src="item.thumbnail" /></div>
          <div class="c_i_middle">
              <p>{{item.number}} {{item.name}} {{item.level}}</p>
              <p>规格:{{item.spec}}  装箱数:{{item.boxQuantity}}  箱号:{{item.boxNo}}</p>
              <p>单价:<span>￥{{item.price}}</span>/{{item.unit}}</p>
              <p>订【{{item.totalQuantity}}{{item.unit}}】金额：<span>￥{{item.totalPrice}}</span></p>
              <p>{{item.status}}</p>
          </div>
        </li>
      </ul>
      <div v-else class="order_info_more">没有更多啦！</div>
    </div>
      <DatetimePicker
        ref="pickerStart"
        type="date"
        :startDate="startDate"
        :endDate="endDate"
        v-model="pickerValueStart"
        @confirm="handleStart"
        >
      </DatetimePicker>
      <DatetimePicker
      ref="pickerEnd"
      type="date"
      :startDate="startDate"
      :endDate="endDate"
      v-model="pickerValueEnd"
      @confirm="handleEnd"
      >
    </DatetimePicker>
  </div>  
</template>
<script>
import {DatetimePicker} from 'mint-ui'
import {mapActions} from 'vuex'
import {getDiffTime ,duibi,beforData,getStore} from '@/utils/helps'
export default {
   components:{
    DatetimePicker
  },
  data(){
    return{
      pickerValueStart:'',
      pickerValueEnd:'',
      dateStart:'开始时间',
      dateEnd:'结束时间',
      startDate:new Date(beforData()),
      endDate:new Date(),
      floatColor_start:"#979797",
      floatColor_end:"#979797",
      dataValue:null
    }
  },
  created(){
    this.initData()
  },
  methods:{
    ...mapActions(['setFetching','setMessage']),
    initData(){
      let data = 'openId='+getStore('openId')
      this.setFetching({fetching:true})
      this.$http.post('/order/list',data)
        .then(({data})=>{
          if(data.status === '200'){
            this.setFetching({fetching:false})
            this.dataValue = data.data
          }
        })
    },
    handleOpenStart(){
        this.$refs.pickerStart.open()
    },
    handleOpenEnd(){
        this.$refs.pickerEnd.open()
    },
    handleStart(value){
      let date=getDiffTime(value)
      if(this.dateEnd !='结束时间'){
        if(duibi(date,this.dateEnd)){
          this.floatColor_start='#000000'
          this.dateStart=date
        }
      }
      else{
        this.floatColor_start='#000000'
        this.dateStart=date
      }
    },
    handleEnd(value){
      let date=getDiffTime(value)
      if(this.dateStart !='开始时间'){
        if(duibi(this.dateStart,date)){
          this.floatColor_end='#000000'
          this.dateEnd=date
        }
      }
      else{
        this.setMessage({type:'error',message:['请选择开始时间']})
      }
    },
    searchButton(){
      if(this.dateStart!="开始时间" && this.dateEnd!="结束时间"){
        let data="openId="+getStore('openId')+"&startDate="+_.trim(this.dateStart)+"&endDate="+_.trim(this.dateEnd)
        this.setFetching({fetching:true})
        this.$http.post('/order/list',data)
          .then(({data})=>{
            if(data.status === '200'){
              this.setFetching({fetching:false})
              this.dataValue = data.data
            }
          })
      }else{
        this.setMessage({type:'validation',message:'请选择查询时间'})
      }
    },
  }
}
</script>
<style lang="scss" scoped>
  @import "../../styles/search.scss";
</style>
