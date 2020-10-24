import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let state = {
   //用户模块 
   aip: window.g.baseURL+"/api-cust/customer/",
   //登录
   w_aip: window.g.backlogin+"/api-auth/", 
   //用户ID
   user_id:sessionStorage.getItem("id"),
   //读取token
   token:sessionStorage.getItem("token"),
}
//定义方法
let mutations = {}
let actions = {}
//定义store
const store  = () => {
  return new Vuex.Store({
      state,
      mutations,
      actions
  })
}
export default store;

