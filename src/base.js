import axios from 'axios';
//引入elm组件
import { Message} from 'element-ui';
import router from './router'
axios.interceptors.request.use(  
  // 判断是否存在token，如果存在的话，则每个http header都加上token  
    config => {
        if (sessionStorage.token) {  
          // 'token'与token值中间要有个空格
            config.headers['Authorization'] = 'token ' + sessionStorage.token;
        }
        return config;
    },
    err => {
        return Promise.reject(err)
})
//异步请求后，判断token是否过期
axios.interceptors.response.use(
  response =>{
    return response;
  },
  error => {
    if(error.response){
      switch (error.response.status) {
          case 401:
          sessionStorage.removeItem('token');
          // router.push('/login');
          break;
          case 403:
          Message.error("您没有访问权限！");
          router.push('/login');
          break;
          case 404:
          Message.error("您访问的接口不存在！");
          break;
          case 500:
          Message.error("接口报错，状态码为500！"); 
          break;
          case 503:
          Message.error("接口报错，状态码为503！"); 
          break;
      }
     return Promise.reject(error.response.status);
   }
  }
)

const CryptoJS = require('crypto-js');  //引用AES源码js    
const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

export default {
  install: function (Vue) {
    
  //加密方法
  Vue.prototype.Encrypt = function (word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
  }
 /**
  * get方法，对应get请求
  */
 Vue.prototype.get = function (url, params) {
   return new Promise((resolve, reject) => {
     axios.get(url, {
       params: params
     }).then(res => {
        resolve(res.data)
     }).catch(err => {
        reject(err)
     })
   })
 }
 /**
  * post方法，对应post请求
  */
 Vue.prototype.post = function (url, params) {
   return new Promise((resolve, reject) => {
     axios.post(url, params)
       .then(res => {
          resolve(res.data)
       })
       .catch(err => {
          reject(err)
       })
   })
 }
  /**
  * put方法，对应put请求
  */
 Vue.prototype.put = function (url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params)
      .then(res => {
         resolve(res.data)
      })
      .catch(err => {
         reject(err)
      })
  })
}
/**
* delete方法，对应delete请求
*/
Vue.prototype.delete = function (url, params) {
return new Promise((resolve, reject) => {
  axios.delete(url, params)
    .then(res => {
        resolve(res.data)
    })
    .catch(err => {
        reject(err)
    })
})
}

 // 获取倒计时
 Vue.prototype.countDown = function () {
  // 设置btn倒计时时显示的信息
  this.btnMsg = null;
  // 更改btn状态
  this.countFlag =! this.countFlag;
  // 设置倒计时
  this.intervalBtn = setInterval(() => {
      if(this.countNum <= 1) {
          // 重置btn提示信息
          this.btnMsg = "获取验证码";
          // 清除定时器
          clearInterval(this.intervalBtn)
          // 更改btn状态
          this.countFlag =! this.countFlag;
          // 重置倒计时状态
          this.countNum = 60;
      };
      // 倒计时
      this.countNum -- ;
  }, 1000);
 }

 // 服务阅读倒计时
 Vue.prototype.countyd = function () {
  // 设置btn倒计时时显示的信息
  this.btnMsg_yd = null;
  // 更改btn状态
  this.countFlag_yd =! this.countFlag_yd;
  // 设置倒计时
  this.intervalBtn_yd = setInterval(() => {
      if(this.countNum_yd <= 1) {
          // 重置btn提示信息
          this.btnMsg_yd = "同 意";
          // 清除定时器
          clearInterval(this.intervalBtn_yd)
          // 更改btn状态
          this.countFlag_yd =! this.countFlag_yd;
          this.countNum_yd = 10;
      };
      // 倒计时
      this.countNum_yd -- ;
  }, 1000);
 }

 // 隐私阅读倒计时
 Vue.prototype.countys = function () {
  this.btnMsg_ys = null;
  this.countFlag_ys =! this.countFlag_ys;
  this.intervalBtn_ys = setInterval(() => {
      if(this.countNum_ys <= 1) {
          this.btnMsg_ys = "同 意";
          clearInterval(this.intervalBtn_ys)
          this.countFlag_ys =! this.countFlag_ys;
          this.countNum_ys = 10;
      };
      this.countNum_ys -- ;
  }, 1000);
 }
 // 入网安全责任书倒计时
 Vue.prototype.countas = function () {
  this.btnMsg_as = null;
  this.countFlag_as =! this.countFlag_as;
  this.intervalBtn_as = setInterval(() => {
      if(this.countNum_as <= 1) {
          this.btnMsg_as = "同 意";
          clearInterval(this.intervalBtn_as)
          this.countFlag_as =! this.countFlag_as;
          this.countNum_as = 10;
      };
      this.countNum_as -- ;
  }, 1000);
 }


  }
}