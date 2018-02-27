import * as types from '@/store/types'
const mutations = {
  // loading 状态
  [types.LOADING](state,payload){
    state.isLoading = payload.isLoading
  },
  // 获取数据
  [types.SET_FETCH](state,obj){
    state.fetching = obj.fetching
  },
  // 设置消息
  [types.SET_MESSAGE](state,obj){
    state.message[obj.type] = obj.message
  }
}
export default mutations