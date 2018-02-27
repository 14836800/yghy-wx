let baseApi = ''
if (process.env.NODE_ENV == 'development') {
  baseApi = 'http://192.168.1.205:8081'
}else{
  baseApi = 'http://admin.zlxlhwl.com'
}
export{
  baseApi
}