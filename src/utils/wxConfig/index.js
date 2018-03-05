// import Vue from 'vue'
import store from '@/store/index'
import {appId} from '@/config/index'
export default function(that,userConfig){
  let origUrl = window.location.href.split('#')[0]
  let url = encodeURIComponent(origUrl)
  let noncestr = new Date().getTime()+''
  let timestr = noncestr+''
  if(timestr.length>10){
    timestr = timestr.substring(0,10)
  }
  let defaultConfig = {
    title: '阳光花业',
    desc: '阳光花业',
    link: 'http://m.okbounty.com/qsApp2/Vomanage/index.html',
    imgUrl: 'http://m.okbounty.com/qsApp2/Vomanage/images/avar.jpg',
    success: function(){
      store.dispatch('setMessage',{type:'success',message:'分享成功'})
    }
  }
  let wxConfig = Object.assign({},defaultConfig,userConfig)
  let data = `noncestr=${noncestr}&timestamp=${timestr}&url=${url}`
  store.dispatch('setFetching', { fetching: true })
  that.$http.post('/wx/signature',data)
    .then((res)=>{
      if(res.data.status === '200'){
        store.dispatch('setFetching', { fetching: false })
        that.$wx.config({
          appId: appId,
          timestamp: timestr, // 必填，生成签名的时间戳
          nonceStr: noncestr, // 必填，生成签名的随机串
          signature: res.data.data,
          jsApiList: [
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            // 'hideAllNonBaseMenuItem',
            'scanQRCode',
            'chooseWXPay'
          ]
        })
        that.$wx.ready(()=>{
          //分享给朋友
          that.$wx.onMenuShareAppMessage(wxConfig)
          //分享到朋友圈
          that.$wx.onMenuShareTimeline(wxConfig)
        })
      }else{
        store.dispatch('setMessage',{type:'error',message:'获取微信签名失败'})
      }
    })
}