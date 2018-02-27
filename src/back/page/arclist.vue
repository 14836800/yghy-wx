<template>
  <div class="content">
    <Popup
      v-model="popupVisible"
      position="bottom">
      <div class='cade_div'>
        <div class='cade_image'>
          <div class='cade_left'>
            <img :src="content.thumbnail"  class="store_det_img" />
          </div>
          <div class='txt_up_money'>
              <p><span>￥{{content.price}}</span>/箱</p>
              <p>库存{{content.stock}}箱</p>
          </div>
        </div>
        <div class='cade_number'>
            <div class='c_n_left'>购买数量</div>
            <div class='c_n_right'>
                <div class="num_btn num_box" @click='numChange(0)'>-</div>
                <div class="num num_box">{{numValue}}</div>
                <div class="num_btn num_box" @click='numChange(1)'>+</div>
            </div>
        </div>
        <div class="button_bottom">
            <div class="b_one">总价：<span>￥{{moneyValue}}</span></div>
            <div class="b_two" @click='onToorder()'>确定</div>
        </div>
      </div>
    </Popup>
    </Make>
    <img class="c_img" :src="content.imgUrl" />
    <div class="c_a_list">
      <p>{{content.number}} {{content.name}} {{content.level}}</p>
      <p><span>￥{{content.price}}</span>/{{content.unit}}</p>
    </div>
    <div class="c_a_content">
        <center>产品参数</center>
        <div class="c_arc_list">
            <ul>
                <li>
                  <div><span>编码</span> <span>{{content.number}}</span></div>
                  <div><span>规格</span><span>{{content.spec}}</span></div>
                </li>
                <li>
                  <div><span>等级</span><span>{{content.level}}</span></div>
                  <div><span>单位</span><span>{{content.unit}}</span></div>
                </li>
                <li>
                  <div><span>箱号</span><span>{{content.boxNo}}</span></div>
                  <div><span>包装</span><span>{{content.boxQuantity}}</span></div>
                </li>
                <li>
                  <div><span>插牌</span><span>{{content.card}}</span></div>
                  <div><span>套袋</span><span>{{content.package}}</span></div>
                </li>
                <li>
                  <div><span>高度</span><span>{{content.height}}</span></div>
                  <div><span>冠幅</span><span>{{content.crownDiameter}}</span></div>
                </li>
                <li>
                  <div><span>株数</span><span>≥{{content.plantNumber}}</span></div>
                  <div><span>枝条数</span><span>≥{{content.branchesNumber}}</span></div>
                </li>
                <li>
                  <div><span>叶数</span><span>≥{{content.abnormalLeaf}}</span></div>
                  <div><span>花数</span><span>≥{{content.flowerNumber}}</span></div>
                </li>
                <li>
                  <div><span>花色</span><span>{{content.flowerColor}}</span></div>
                  <div><span>花径</span><span>{{content.flowerDiamete}}</span></div>
                </li>
                <li>
                  <div><span>杆径</span><span>{{content.stemDiameter}}</span></div>
                  <div><span>不正常叶</span><span>{{content.abnormalLeaf}}</span></div>
                </li>
                <li>
                  <div><span>高度差</span><span>{{content.altitudeDifference}}</span></div>
                  <div><span>净重</span><span>{{content.netWeight}}</span></div>
                </li>
            </ul>
        </div>
    </div>
    <div class="button_bottom">
        <div class="b_one" @click="share()">分享</div>
        <div class="b_two" @click.stop.prevent="makeDis()">立即订购</div>
    </div>
    <Make  :disClose="{disClose}">
      <div class="sha_cas" @click="disBnoe"><img src="../images/share.png"></div>
    </Make>
    <img src="../images/share.png" style="display:none">
  </div>
</template>

<script>
import { Popup} from 'mint-ui'
import Make from '../components/make.vue';
export default {
  name: 'Arclist',
  data () {
    return {
      fixedHeight:0,
      popupVisible:false,
      numValue:1,
      content:"",
      moneyValue:0,
      disClose:'none'
    }
  },
  created(){
      this.content=JSON.parse(this.$route.query.content);
      this.moneyValue=this.content.price;
  },
  components:{
    Popup,Make
  },
  methods: {
    makeDis(){
      this.popupVisible = true
    },
    disBnoe(){
      this.disClose = 'none'
    },
    numChange(value){
      if(value){
        this.numValue+=1;
      }
      else{
        if(this.numValue<=1){
          this.numValue==1
        }
        else{
          this.numValue-=1;
        }
      }
      this.moneyValue=this.content.price*this.numValue;
    },
    onToorder(){
      var data={"number":this.content.number,"level":this.content.level,"thumbnail":this.content.thumbnail,"name":this.content.name,"price":this.content.price,"numValue":this.numValue,id:this.content.id};
      this.$router.push({ path: '/order', query: { data: JSON.stringify(data)}});
    },
    share(){
      this.disClose='block';
    }
  },
  mounted(){
    var _this=this;
  }

}
</script>
<style scoped lang="scss">
  @import "../css/arclist.scss";
</style>
