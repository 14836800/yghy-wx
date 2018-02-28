let baseApi = '' //api 地址
let appId = '' //appid
let urlRedirect = ''
if (process.env.NODE_ENV == 'development') {
  baseApi = 'http://flower.okbounty.com/flower'
  appId = 'wx1533da174fa91f3b'
  urlRedirect = 'http://wwf.ngrok.xiaomiqiu.cn'
}else{
  baseApi = 'http://flower.okbounty.com/flower'
  appId = 'wx250903ace4240e37'
  urlRedirect = 'http://flowerweb.okbounty.com'
}
export{
  baseApi,
  appId,
  urlRedirect
}