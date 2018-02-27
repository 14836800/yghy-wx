import { Toast } from 'mint-ui';
import wx from 'weixin-js-sdk';
var reqestUrl = 'http://flower.okbounty.com/flower';
import axios from 'axios'
var headers={'Content-Type': 'application/x-www-form-urlencoded'};
// 78202fb83815c847df27081d9a705115c01789c3
//数据请求
export function reqest(_this,url,data,headers={'Content-Type': 'application/x-www-form-urlencoded'},callBack){
  axios({
      method:'post',
      url:reqestUrl+url,
      data:data,
      // headers:headers,

  })
  .then(function(data){
    var data=data.data;
    if(data.status!=='0'){
      callBack(data);
    }
    else{
      toast(data.msg,undefined)
    }
  })
  .catch(function(err){
    console.log(err);
  });

}
//日期转换
export function getDiffTime(data) {
  var date = new Date(data);
  var Y = date.getFullYear() + '-',
    M = (date.getMonth() + 1 < 10 ? "0"+(date.getMonth() + 1) : date.getMonth() + 1) + '-',
    D = date.getDate() < 10 ? "0"+date.getDate() : date.getDate() + ' ',
    h, m, s;
  return Y + M + D;
}

//一周前
export function beforData(){
  var now = new Date();
  var date = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
  var Y = date.getFullYear() + '-',
    M = (date.getMonth() + 1 < 10 ? "0"+(date.getMonth() + 1) : date.getMonth() + 1) + '-',
    D = date.getDate() < 10 ? "0"+date.getDate() : date.getDate() + ' ',
    h, m, s;
  return Y + M + D;
}

export let shareTitle = '阳光花业';
export let shareDesc = '阳光花业';
export let shareLink = 'http://m.okbounty.com/qsApp2/Vomanage/index.html';
export let shareImgUrl = 'http://m.okbounty.com/qsApp2/Vomanage/images/avar.jpg';
export let appId = 'wx1533da174fa91f3b';
// export let appId = 'wx250903ace4240e37';
//微信配置
export function wxCofig(){
  let origUrl = window.location.href.split('#')[0];
  let url = encodeURIComponent(origUrl);
  let noncestr = new Date().getTime() + "";
  let timestr = noncestr + "";
  if(timestr.length > 10){
    timestr = timestr.substring(0, 10);
  }
  let timestamp =  timestr;
  //分享相关属性
  //数据注册
  let data={noncestr:noncestr,timestamp:timestamp,url:url};
  reqest(this,'/wx/signature',data, undefined ,function(data){
    if(data.status==200){
      var signature=data.data;
          wx.config({
              debug: false,
              appId: appId,
              timestamp: timestamp,
              nonceStr: noncestr,
              signature: signature,
              jsApiList: [
                 "onMenuShareTimeline",
                 "onMenuShareAppMessage",
                 "previewImage",
                 "chooseWXPay"
                  ]
          });
          wx.error(function(res){
          });
          initWx();
    }

  })
}
export function getUrlParam(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r!=null) return unescape(r[2]); return null; //返回参数值
}

//分享成功
export function shareSuccessFn(){

}
//分享成功
export function shareCancelFn(){

}
//再次渲染
export function initWx(){
        wx.ready(function(){
          wx.onMenuShareAppMessage({
                title: shareTitle, // 分享标题
                desc:shareDesc, // 分享描述
                link: shareLink, // 分享链接
                imgUrl: shareImgUrl, // 分享图标
                success: function () {
                  shareSuccessFn();
                },
                cancel: function () {
                  shareCancelFn();
                }
            });
            wx.onMenuShareTimeline({
                title: shareTitle, // 分享标题
                link: shareLink, // 分享链接
                imgUrl:  shareImgUrl, // 分享图标
                success: function () {
                    shareSuccessFn();
                },
                cancel: function () {
                  shareCancelFn();
                }
              });
            });
}
//日期比较
export function duibi(a, b) {
   var arr = a.split("-");
   var starttime = new Date(arr[0], arr[1], arr[2]);
   var starttimes = starttime.getTime();

   var arrs = b.split("-");
   var lktime = new Date(arrs[0], arrs[1], arrs[2]);
   var lktimes = lktime.getTime();

   if (starttimes >= lktimes) {
        toast('结束时间不能大于开始时间',undefined);
       return false;
   }
   else
       return true;

}

export function isNo(name,errordata){
    if(name){name=name.trim();}
		if(!name){
      toast(errordata+'不能为空',undefined)
		}
    else{
      return true;
    }
}
export function toast(message,duration=2000){
  Toast({
    message: message,
    position: 'bottom',
    duration: duration
  });
}
export function isiPone(name){
  if(name){name=name.trim();}
  if(!name){
    isNo(name,'手机号')
  }
  else{
    var reg=/^1(3|4|5|7|8)[0-9]\d{8}$/;
    if(!reg.test(name)){
      toast('手机号码不正确',undefined);
    }
    else{
      return true;
    }
  }
}

export function trim(_this) {
  return _this.replace(/\s+/g, "");
}
