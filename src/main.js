import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
//引入element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入echarts
import Router from 'vue-router'
import axios from "axios";
// 引入封装组件库
import base from './base.js'
Vue.use(base)

//引入jQuery库
import $ from 'jquery'

//引入i18N语言包切换库
import VueI18n from 'vue-i18n'
import LangZH from './i18n/langs/zh'
import LangEN from './i18n/langs/en'
import LangFT from './i18n/langs/ft'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'en': LangEN,
    'zh': LangZH,
    'ft': LangFT,
  }
})
//判断进入页面需要登录
router.beforeEach((to,from,next) => {
  if(to.meta.loginRequest){
    if(sessionStorage.getItem("username")){
      next()
    }else{
      next({
        path: '/login',
        query:{
          redirect: to.fullPath
        }
      })
    }
  }else{
    next()
  }
})

// 登录公用头部引入
import Allnav from './components/common/nav.vue'
Vue.component('Allnav', Allnav)

// 用户资料内容公用头部引入
import Navindex from './components/common/nav_index.vue'
Vue.component('Navindex', Navindex)

// 用户资料内容公用左边引入
import Navleft from './components/common/nav_left.vue'
Vue.component('Navleft', Navleft)

// 公用底部引入
import Allfooter from './components/common/footer.vue'
Vue.component('Allfooter', Allfooter)

Vue.config.productionTip = false
let vm = new Vue({
  router,
  store,
  $,
  i18n,
  render: h => h(App)
}).$mount('#app')

export default vm
