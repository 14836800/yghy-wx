<template>
  <div class="content">
    <div class="btn_searc bt_flid" @click="handleOpenStart" :style="{color:floatColor_start}">{{dateStart}}</div>
    <div class="btn_searc bt_flid" @click="handleOpenEnd" :style="{color:floatColor_end}">{{dateEnd}}</div>
    <div class="btn_searc" @click="searchButton">查询</div>
    <div class="u_btn">
      <ul class="c_i_list" v-if="dataValue">
        <li class="i_one i_spance">
          <div>类型</div>
          <div>收入</div>
          <div>支出</div>
        </li>
        <li v-for="(item,index) in dataValue" class="i_one cont_data">
          <center>{{item.queryDate}}</center>
          <div class="i_spance" v-if="item.actionType==2">
            <div>{{item.typeName}}</div>
            <div>/</div>
            <div>{{item.amount}}</div>
          </div>
          <div v-else-if="item.actionType==1" class="i_spance" >
            <div>{{item.typeName}}</div>
            <div>{{item.amount}}</div>
            <div>/</div>
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
import { DatetimePicker ,Toast} from 'mint-ui';
import { getDiffTime ,duibi,beforData,reqest,trim } from '../components/common';
var _this;
var date_start=beforData();
export default {
  name: 'Myorder',
  data () {
    return {
      pickerValueStart:'',
      pickerValueEnd:'',
      dateStart:'开始时间',
      dateEnd:'结束时间',
      startDate:new Date(date_start),
      endDate:new Date(),
      floatColor_start:"#979797",
      floatColor_end:"#979797",
      dataValue:''
    }
  },
  created() {
    _this=this;
    var data="openId="+sessionStorage.getItem('openId');
    reqest(this,'/merchat/accountNote',data,undefined,function(data){
        if(data.status==200){
          _this.dataValue=data.data;
        }
    })
  },
  methods: {
    handleOpenStart(){
        this.$refs.pickerStart.open();
    },
    handleOpenEnd(){
        this.$refs.pickerEnd.open();
    },
    searSumit(){
    },
    handleStart(value){
      let date=getDiffTime(value);
      if(this.dateEnd !='结束时间'){
        if(duibi(date,this.dateEnd)){
          this.floatColor_start='#000000';
          this.dateStart=date
        }
      }
      else{
        this.floatColor_start='#000000';
        this.dateStart=date
      }
    },
    handleEnd(value){

      let date=getDiffTime(value);
      if(this.dateStart !='开始时间'){
        if(duibi(this.dateStart,date)){
          this.floatColor_end='#000000';
          this.dateEnd=date
        }
      }
      else{
        Toast({
          message: '请先选中开始时间',
          position: 'bottom',
          duration: 2000
        });
      }
    },
    searchButton(){
      if(this.dateStart!="开始时间" && this.dateEnd!="结束时间"){
        var data="openId="+sessionStorage.getItem('openId')+"&startDate="+trim(this.dateStart)+"&endDate="+trim(this.dateEnd);
        reqest(this,'/merchat/accountNote',data,undefined,function(data){
            if(data.status==200){

              _this.dataValue=data.data;
            }
        })
      }
    },
  },

  mounted(){
    var _this=this;

  },
  components: {
    DatetimePicker
  }

}
</script>
<style scoped lang="scss">
  @import "../css/myorder.scss";

</style>
