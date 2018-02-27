import store from '@/store/index'
import * as types from '@/store/types'
const afterEach = (to,from,next)=>{
  store.commit(types.LOADING,{isLoading:false})
}
export default afterEach