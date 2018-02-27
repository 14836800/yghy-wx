import * as types from '@/store/types'
export default{
  setFetching({commit},obj){
    commit(types.SET_FETCH,obj)
  },
  setMessage({commit},obj){
    commit(types.SET_MESSAGE,obj)
  },
  resetMessage({commit}){
    commit(types.SET_MESSAGE,{type:'success',message:''})
    commit(types.SET_MESSAGE,{type:'error',message:[]})
    commit(types.SET_MESSAGE,{type: 'warning',message: ''})
    commit(types.SET_MESSAGE,{type:'validation',message:[]})
  }
}