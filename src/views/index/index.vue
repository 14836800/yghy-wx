<template>
  <div class="content">
    <div class="cont_fixed" ref='cont_fixed'>
      <div class="cont_top">
          <div class="cont_t_left">
              余额：<i>{{balance}}元</i>
          </div>
          <router-link class="cont_t_right" to="/rechange">
              <button>充值</button>
          </router-link>
      </div>
      <div class="c_fen"></div>
      <div class="box">
        <div class="container-4" @click.stop.prevent="allCategory(undefined)">
            <span>全部分类</span><img :src="img1" :class="arrowClass"/>
        </div>
        <div class="container-4">
          <form v-on:submit.prevent="handleSearch" class="search-form">
            <input type="search" id="search" placeholder="请输入产品名称"  v-model="search"/>
            <button class="icon" type="submit"><img :src="img2" class="arrow"/></button>
          </form>
        </div>
      </div>
      <transition name="router-slid" mode="out-in">
        <section class="food_container" v-show="isShowArrow">
          <section class="menu_container">
            <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
              <ul>
                <li v-for="(item,index) in menuList" :key="index" class="menu_left_li" :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </section>
            <section class="menu_right" ref="menuFoodList">
                  <header class="menu_detail_header">
                    <section class="menu_detail_header_left">
                      <strong class="menu_item_title">{{subMenuName}}</strong>
                    </section>
                  </header>
                  <ul class="menu_right_list" v-if="subMenu">
                    <li v-for="(foods,foodindex) in subMenu" :key="foodindex" @click.stop.prevent="allCategory(foods.id)">
                      {{foods.name}}
                    </li>
                  </ul>
                  <div v-else class="order_info_more">没有更多啦！</div>
            </section>
          </section>
        </section>
      </transition>
      <transition name="router-slid" mode="out-in">
        <div v-if="!isShowArrow" class="details">
          <ul class="c_i_list" v-if="details !== null">
              <li v-for="(item,index) in details" @click='routerClick(item)' :key="index">
                <div class="c_i_left"><img :src="item.thumbnail" /></div>
                <div class="c_i_middle">
                    <p>{{item.number}} {{item.name}} {{item.level}}</p>
                    <p>规格:{{item.spec}}  装量:{{item.boxQuantity}}  箱号:{{item.boxNo}}</p>
                    <p>单价:<span>￥{{item.price}}</span>/箱 库存:<span>{{item.stock}}</span>箱</p>
                </div>
                <div class="c_i_right">
                   详情<img :src="img3" />
                </div>
              </li>
          </ul>
          <div v-else class="order_info_more">没有更多啦！</div>
        </div>
      </transition>
    </div>
    <div class="button_bottom" ref='button_bottom'>
      <!-- <div class="b_one" @click="handleMessage">账单详情</div>
      <div class="b_two"  @click="handleMessage">查看订单</div> -->
      <router-link class="b_one" to="/order-details">账单详情</router-link>
      <router-link class="b_two"  to="/show-order">查看订单</router-link>
    </div> 
  </div>
</template>
<script>
import {mapGetters,mapActions,mapState} from 'vuex'
import {getStore,setStore} from '@/utils/helps'
import {urlRedirect,appId} from '@/config/index'
import { MessageBox } from 'mint-ui'
export default {
  data(){
    return{
      img1: require('@/assets/images/icon_one.png'),
      img2: require('@/assets/images/search.png'),
      img3: require('@/assets/images/right.png'),
      menuList: [], //食品列表
      isShowArrow: true, 
      details: null,
      subMenu:[],
      subMenuName: '',
      search:'',
      menuIndex: 0, //已选菜单索引值，默认为0
      balance: 0,//余额
    }
  },
  computed:{
    ...mapGetters(['getCode']),
    ...mapState({
      'fetching': state=>state.app.fetching
    }),
    arrowClass(){
      return this.isShowArrow?'arrow': 'arrow rotate'
    }
  },
  created(){
    if(getStore('openId')){
      let data = 'openId='+getStore('openId')
      this.initData(data)
    }else if(this.getCode){
      let data = 'code='+this.getCode
      this.initData(data)
    }else if(!this.getCode && !getStore('openId')){
      let redirect = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(urlRedirect)}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
      MessageBox.confirm('没有权限请允许授权').then(action => {
        window.location.href = redirect
      })
    }
  },
  methods:{
    ...mapActions(['setFetching','setMessage']),
    initData(val){
      this.setFetching({fetching:true})
      this.$http.post(`/shop/index`,val)
        .then(({data})=>{
          if(data.status === '200'){
            this.setFetching({fetching:false})
            this.menuList = data.data.categorys
            this.subMenu = this.menuList[this.menuIndex].subMenu
            this.subMenuName = this.menuList[this.menuIndex].name
            this.balance = data.data.balance
            if(data.data.openId){
              setStore('openId',data.data.openId)
            }
          }
        })
    },
    //点击左侧食品列表标题，相应列表移动到最顶层
    chooseMenu(index){
      this.menuIndex = index
      this.subMenu = this.menuList[index].subMenu
      this.subMenuName = this.menuList[index].name
    },
    allCategory(index){
      this.isShowArrow = !this.isShowArrow
      this.setFetching({fetching:true})
      if(!index){
        this.$http.post('/product/productList')
          .then(({data})=>{
            if(data.status === '200'){
              this.details = data.data
              this.setFetching({fetching:false})
            }
          })
      }else{
        let data = 'categoryId='+index
        this.$http.post('/product/productList',data)
          .then(({data})=>{
            if(data.status === '200'){
              this.details = data.data
              this.setFetching({fetching:false})
            }
          })
      }
    },
    handleSearch(){
      if(this.search){
        this.setFetching({fetching:true})
        let data = "productName="+encodeURI(this.search)
        this.$http.post('/product/productList',data)
          .then(({data})=>{
            if(data.status === '200'){
              this.details = data.data
              this.isShowArrow = false
              this.setFetching({fetching:false})
            }
          }) 
      }else{
        this.setMessage({type:'validation',message:'输入不能为空.'})
      }
    },
    routerClick(item){
      this.$router.push({ path: '/product', query: { content: JSON.stringify(item)}})
    }
  },
}
</script>
<style scoped lang="scss">
  @import "../../styles/index.scss";
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
  .arrow{
    transform:translate3d(0px, 0px, 0px) rotate(0deg);
    transition: all ease-out .3s;
  }
  .arrow.rotate{
    transform:translate3d(0px, 0px, 0px) rotate(-180deg);
    transition: all ease-out .3s;
  }
</style>
