import Jssdk from 'weixin-js-sdk'
export default function install(Vue){
  Object.defineProperty(Vue.prototype,'$wx',{
    get(){
      return Jssdk
    }
  })
}