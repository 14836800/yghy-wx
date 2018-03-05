<template>
  <div class="content">
    <div class="cont_fixed" ref='cont_fixed'>
      <div class="cont_top">
          <div class="cont_t_left">
              余额：<i>{{balance}}</i>
          </div>
          <div class="cont_t_right" @click="onTo('/rechange')">
              <button>充值</button>
          </div>
      </div>
      <div class="c_fen"></div>
      <div class="cont_middle">
          <div class="cont_m_left" @click='tableClass()'>
              全部分类<img src="../images/icon_one.png" :class="[IndexShow ? '' : 'index_close' ]" />
          </div>
          <div class="cont_m_right">
              <input type="text" ref='search' placeholder="请输入产品名称" />
              <button type="button" @click='searchBtn()'><img src="../images/search.png" /></button>
          </div>
      </div>
    </div>
     
      <div class="button_bottom" ref='button_bottom'>
          <div class="b_one" @click="onTo('/myorder')">账单详情</div>
          <div class="b_two" @click="onTo('/search')">查看订单</div>
      </div>
      <Make :disClose="{disClose}">
          <div><Spinner type="fading-circle" :size="60" color="#158d48"></Spinner></div>
      </Make>
  </div>
</template>

<script>
import { Spinner } from 'mint-ui';
import Make from '../components/make.vue'
import { wxCofig ,getUrlParam,reqest,appId,toast} from '../components/common';
var _this;
export default {
  name: 'Index',
  data () {
    return {
      fixedHeight:0,
      IndexShow:true,
      balance:0,
      items: '',
      itemsModel:{title:'',content:''},
      itemHonet:'',
      IndexClass:0,
      disClose:'none'
    }
  },
  created() {
    var Code=getUrlParam('code');
    // var Urid='http://wwf.ngrok.xiaomiqiu.cn';
    var Urid='http://flowerweb.okbounty.com';
    var domain_url_find='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appId+'&redirect_uri='+encodeURIComponent(Urid)+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
    //do something after creating vue instance
    var openId=sessionStorage.getItem('openId');
    var data;
    if(openId){
      data='openId='+openId;
    }
    else{
      if(!Code){
        window.location.href=domain_url_find;
      }
       data='code='+Code;
    }
    _this=this;
    reqest(this,'/shop/index',data,undefined,function(data){
      if(data.status==200){
        if(data.data.openId){
          openId=sessionStorage.setItem('openId',data.data.openId);
        }
        _this.items=data.data.categorys;
        for(var i=0;i<_this.items.length;i++){
          _this.items[i].class='';
        }
        _this.items[0].class='li_over';
        _this.itemsModel.title=_this.items[0].name;
        _this.itemsModel.content=_this.items[0].subMenu;
        _this.balance=data.data.balance;
        sessionStorage.setItem('balance',data.data.balance);
      }
      else{
        _this.$router.replace({ path: '/login', query: { openId: data.data.openId }});
      }
    })
  },
  methods: {
    routerClick(index) {
      this.$router.push({ path: '/arclist', query: { content: JSON.stringify(index)}});
    },
    haldClass(index){
      this.items[this.IndexClass].class='';
      this.items[index].class='li_over';
      this.IndexClass=index;
      this.itemsModel.title=this.items[index].name;
      this.itemsModel.content=this.items[index].subMenu;
      //数据
    },
    ToClass(index){
      var data="categoryId="+this.itemsModel.content[index].id;
      reqest(this,'/product/productList',data,undefined,function(data){
          _this.itemHonet=data.data;
          _this.IndexShow=false;
      })
    },
    tableClass(){
      this.IndexShow=true;
    },
    searchBtn(){
      var value=this.$refs.search.value;
      if(value){
          this.disClose='block';
          var data="productName="+encodeURI(value);
          reqest(this,'/product/productList',data,undefined,function(data){
            if(data.status==200){
              _this.itemHonet=data.data;
              _this.IndexShow=false;
              _this.disClose='none';
            }
            else{
              toast(data.msg)
            }

          })
      }
      else{
        toast('搜索值不能为空',undefined)
      }
    },
    onTo(data){
      this.$router.push(data);
    }
  },
  mounted(){
    var _this=this;
    setTimeout(function(){
      var W_height=window.innerHeight;
      var O_height=_this.$refs.cont_fixed.offsetHeight+_this.$refs.button_bottom.offsetHeight;
      _this.fixedHeight=W_height-O_height-20+'px';
    },100);

  },
  components: {
    Make,Spinner
  }

}
</script>
<style scoped lang="scss">
  @import "../css/index.scss";
</style>
