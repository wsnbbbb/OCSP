import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect:'/login',
  },
  {
  //登录
    path: '/login',
    name: 'login',
    component: resolve => require.ensure([], () => resolve(require('../components/login/Login.vue')), 'Login'),
  },
  //注册
  {
    path: '/Register',
    name: 'Register',
    component: resolve => require.ensure([], () => resolve(require('../components/login/Register.vue')), 'Register'),
  },
  //注册成功
  {
    path: '/register_yes',
    name: 'register_yes',
    component: resolve => require.ensure([], () => resolve(require('../components/login/register_yes.vue')), 'register_yes'),
  },
  //找回密码
    {
      path: '/for_pwd',
      name: 'for_pwd',
      component: resolve => require.ensure([], () => resolve(require('../components/login/for_pwd.vue')), 'for_pwd'),
    },
  //重置密码
  {
      path: '/user_update_pwd',
      name: 'user_update_pwd',
      component: resolve => require.ensure([], () => resolve(require('../components/login/user_update_pwd.vue')), 'user_update_pwd'),
    },
  //首页
  {
      path: '/index',
      name: 'index',
      component: resolve => require.ensure([], () => resolve(require('../components/admin/index.vue')), 'index'),
      meta: {loginRequest: true} 
    },
  //用户基本信息
   {
      path: '/user_information',
      name: 'user_information',
      component: resolve => require.ensure([], () => resolve(require('../components/user/user_information.vue')), 'user_information'),
      meta: {loginRequest: true} 
    },
  //用户认证信息
  {
      path: '/user_Authen',
      name: 'user_Authen',
      component: resolve => require.ensure([], () => resolve(require('../components/user/user_Authen.vue')), 'user_Authen'),
      meta: {loginRequest: true} 
    },
  //个人认证
  {
      path: '/user_Personal',
      name: 'user_Personal',
      component: resolve => require.ensure([], () => resolve(require('../components/user/user_Personal.vue')), 'user_Personal'),
      meta: {loginRequest: true} 
    },
   //人工认证
  {
      path: '/user_Persoals',
      name: 'user_Persoals',
      component: resolve => require.ensure([], () => resolve(require('../components/user/user_Persoals.vue')), 'user_Persoals'),
      meta: {loginRequest: true} 
    },
  //企业认证
  {
      path: '/user_enterprise',
      name: 'user_enterprise',
      component: resolve => require.ensure([], () => resolve(require('../components/user/user_enterprise.vue')), 'user_enterprise'),
      meta: {loginRequest: true} 
    },
    {
      //产品列表
       path: '/Product_list',
       name: 'Product_list',
       component: resolve => require.ensure([], () => resolve(require('../components/product/Product_list.vue')), 'Product_list'),
     },
     //产品详情
     {
        path: '/Product_details',
        name: 'Product_details',
        // component: resolve => require.ensure([], () => resolve(require('../components/product/Product_details.vue')), 'Product_details'),
        component: resolve => require.ensure([], () => resolve(require('../components/product/detail.vue')), 'Product_details'),
      },
     //确认配置
     {
      path: '/product_Confirm',
      name: 'product_Confirm',
      component: resolve => require.ensure([], () => resolve(require('../components/product/product_Confirm.vue')), 'product_Confirm'),
     },
     //不可选参数
     {
       path: '/product_Non_optional',
       name: 'product_Non_optional',
       component: resolve => require.ensure([], () => resolve(require('../components/product/product_Non_optional.vue')), 'product_Non_optional'),
     },
  //消息中心
  {
      path: '/user_message',
      name: 'user_message',
      component: resolve => require.ensure([], () => resolve(require('../components/user/user_message.vue')), 'user_message'),
      meta: {loginRequest: true} 
    },
]
const router = new Router({
    //访问地址需要加#就打开
    mode: 'history', 
    routes: routes
})
export default router