import axios from 'axios'
import {baseApi} from '@/config/index'
import interceptors from './interceptors'
export const http = axios.create({
  baseURL: baseApi
})
// $http
export default function install(Vue,{store,router}){
  interceptors(http,store,router)
  Object.defineProperty(Vue.prototype,'$http',{
    get(){
      return http
    }
  })
}