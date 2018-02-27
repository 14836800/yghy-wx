import store from '@/store/index'
import * as types from '@/store/types'
const beforeEach = (to,from,next)=>{
  store.commit(types.LOADING,{isLoading:true})
  next()
}
export default beforeEach