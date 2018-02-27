import mutations from '@/store/app/mutations'
import actions from '@/store/app/actions'
import * as getters from '@/store/app/getters'
const state = {
  isLoading: false,
  fetching: false,
  message:{
    success: '',
    error: [],
    warning: '',
    validation:[]
  }
}
export default{
  state,
  actions,
  // getters,
  mutations
}