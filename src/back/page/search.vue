<template>
  <div class="content">
    <div class="btn_searc bt_flid" @click="handleOpenStart" :style="{color:floatColor_start}">{{dateStart}}</div>
    <div class="btn_searc bt_flid" @click="handleOpenEnd" :style="{color:floatColor_end}">{{dateEnd}}</div>
    <div class="btn_searc" @click="searchButton">查询</div>
    <div class="u_btn">
        <ul class="c_i_list" v-if="dataValue">
          <li v-for="(item,index) in dataValue">
            <div class="c_i_left"><img src="" /></div>
            <div class="c_i_middle">
                <p>{{item.number}} {{item.name}} {{item.level}}</p>
                <p>规格:{{item.spec}}  装箱数:{{item.boxQuantity}}  箱号:{{item.boxNo}}</p>
                <p>单价:<span>￥{{item.price}}</span>/{{item.unit}}</p>
                <p>订【{{item.totalQuantity}}{{item.unit}}】金额：<span>￥{{item.totalPrice}}</span></p>
            </div>
          </li>
        </ul>
        <div v-else class="order_info_more">没有更多啦！</div>
    </div>
    <DatetimePicker
        ref="pickerStart"
        type="date"
        v-model="pickerStartValue"
        @confirm="handleStart"
        :endDate="endDate"
        >
      </DatetimePicker>
      <DatetimePicker
      ref="pickerEnd"
      type="date"
      :endDate="endDate"
      v-model="pickerEndValue"
      @confirm="handleEnd"
      >
    </DatetimePicker>
  </div>
</template>

<script>
import { DatetimePicker ,Toast} from 'mint-ui';
import { getDiffTime ,duibi ,reqest,toast} from '../components/common';
var _this;
export default {
  name: 'Order',
  data () {
    return {
      pickerStartValue:'',
      pickerEndValue:'',
      isBlock:true,
      dateStart:'开始时间',
      dateEnd:'结束时间',
      endDate:new Date(),
      floatColor_start:"#979797",
      floatColor_end:"#979797",
      dataValue:''
    }
  },
  created() {
    //do something after creating vue instance
    _this=this;
    var data="openId="+sessionStorage.getItem('openId');
    reqest(this,'/order/list',data,undefined,function(data){
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
    searchButton(){
      if(this.dateStart!="开始时间" && this.dateEnd!="结束时间"){
        var data="openId="+sessionStorage.getItem('openId')+"&startDate="+this.dateStart+"&endDate="+this.dateEnd;
        reqest(this,'/order/list',data,undefined,function(data){
            if(data.status==200){

              _this.dataValue=data.data;
            }
        })
      }
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
    }
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
  @import "../css/search.scss";
</style>
