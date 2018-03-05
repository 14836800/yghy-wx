import store from '@/store/index'
import * as types from '@/store/types'
import {getStore,getUrlParam} from '@/utils/helps'
import {urlRedirect,appId} from '@/config/index'
const beforeEach = (to,from,next)=>{
  store.commit(types.LOADING,{isLoading:true})
  store.dispatch('resetMessage')
  let redirect = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(urlRedirect)}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
  if(!getStore('openId')){
    if(getUrlParam('code')){
      store.dispatch('setCode',getUrlParam('code'))
      next()
    }else{
      window.location.href = redirect
      next()
    }
  }else{
    next()
  }
}
export default beforeEach