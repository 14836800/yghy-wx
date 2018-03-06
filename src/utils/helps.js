import Cookies from 'js-cookie'
import _ from 'lodash'
import store from '@/store/index'
export const isPhone = (phone) => {
    if (!_.trim(phone)) {
        store.dispatch('setMessage',{type:'error',message:['手机号码不能为空']})
    } else {
        if (phone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/)) {
            return true
        } else {
            store.dispatch('setMessage',{type:'error',message:['手机号码不正确']})
            return false
            // return true
        }
    }
}
export const isEmpty = (num, str) => {
    if (!_.trim(num)) {
        store.dispatch('setMessage',{type:'error',message:[str]})
    } else {
        return true
    }
}
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    // window.localStorage.setItem(name, content);
    Cookies.set(name, content, { expires: 7, path: '' });
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    // return window.localStorage.getItem(name);
    return Cookies.get(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    // window.localStorage.removeItem(name);
    Cookies.remove(name);
}
/*获取微信code */
export const getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    } else if (element.currentStyle) {
        target = element.currentStyle[attr];
    } else {
        target = document.defaultView.getComputedStyle(element, null)[attr];
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
}

//日期转换
export function getDiffTime(data) {
    var date = new Date(data);
    var Y = date.getFullYear() + '-',
      M = (date.getMonth() + 1 < 10 ? "0"+(date.getMonth() + 1) : date.getMonth() + 1) + '-',
      D = date.getDate() < 10 ? "0"+date.getDate() : date.getDate() + '',
      h, m, s;
    return Y + M + D;
  }
  
  //一周前
  export function beforData(){
    var now = new Date();
    var date = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
    var Y = date.getFullYear() + '-',
      M = (date.getMonth() + 1 < 10 ? "0"+(date.getMonth() + 1) : date.getMonth() + 1) + '-',
      D = date.getDate() < 10 ? "0"+date.getDate() : date.getDate() + '',
      h, m, s;
    return Y + M + D;
  }
  export function afterData(){
    var now = new Date();
    var date = new Date(now.getTime() + 7 * 24 * 3600 * 1000);
    var Y = date.getFullYear() + '-',
      M = (date.getMonth() + 1 < 10 ? "0"+(date.getMonth() + 1) : date.getMonth() + 1) + '-',
      D = date.getDate() < 10 ? "0"+date.getDate() : date.getDate() + '',
      h, m, s;
    return Y + M + D;
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
         store.dispatch('setMessage',{type:'error',message:['结束时间不能小于开始时间']})
        return false;
    }
    else
        return true;
 
 }