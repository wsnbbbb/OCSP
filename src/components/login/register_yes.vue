<template>
<div>
    <!-- 头部内容模块 -->
    <Allnav></Allnav>
    <div class="register-yes-content">
        <div class="register_with"  v-show="register_zg">
            <!-- 注册成功内容 -->
           <div class="register-with-padd">
                <div>
                    <img src="../../assets/authr/rzyes.png">
                </div>
                <div>
                    <span>注册成功</span><span>为了您的账号安全，请按照以下方法开启google二次验证</span>
                </div>
          </div> 
        </div>
           <!-- 谷歌二次验证内容  -->
           <div class="register_two_google">
               <div class="register_two_list">
                   <p>一、下载Google Authenticator APP，以下二维码为安卓使用浏览器扫码后下载，苹果手机用户请到应用商店进行下载，也可使用微信小程序搜索google动态密码验证器验证</p>
                   <div>
                       <img src="../../assets/authr/google.png" title="android">
                   </div>
                   <!-- <div>
                       <img src="../../assets/login/newber.png" alt="ios">
                   </div> -->
               </div>
               <div class="register_two_list two_bar_code">
                   <p>二、打开Google Authenticator APP，扫描以下二维码或者输入验证码：《密钥》</p>
                   <img :src="imgs==null?'':imgs" title="验证码">
               </div>
               <div class="register_two_list two_bar_input">
                   <p>三、请输入Google Authenticator 中6位验证码</p>
                   <el-input placeholder="请输入内容" v-model="goo_value" maxlength="6"  clearable> </el-input>
               </div>
               <el-button type="primary" :loading="loading" @click="regis_goole_next">开启验证</el-button>
               <el-link :underline="false" @click="index_link('login')">跳过</el-link>
           </div>
    </div>
    <!-- 底部内容模块-->
    <Allfooter></Allfooter>
</div>
</template>
<style lang="less" scoped>
    .register-yes-content{
        width:1160px;
        // height:800px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(222,229,235,1);
         border-radius: 2px;
         margin: 80px auto 140px;
        .register_with{
            width:1088px;
            height:170px;
            line-height: 30px;
            margin: 20px auto;
            background:rgba(238,253,252,1);
            .register-with-padd{
                width: 536px;
                padding: 50px 0px;
                margin: 0 auto;
                div{
                     display: inline-block;
                     padding-right: 10px;
                }
            }
        .register-with-padd div img:nth-child(1){
            width: 60px;
        }
         .register-with-padd div:nth-child(2) span:nth-child(1){
            color:rgba(80,80,80,1);
            font-size: 24px;
        }
        .register-with-padd  div:nth-child(2) span:nth-child(2){
            color:rgba(180,180,180,1);
            font-size: 14px;
            display: block;
            letter-spacing: 2px;
        }
       }
    }
        // 谷歌二次验证样式
       .register_two_google{
                width: 536px;
                margin: 60px auto;
                .register_two_list{
                    margin-bottom: 20px;
                    p{
                       color:rgba(80,80,80,1);
                       font-size: 12px;    
                       line-height: 20px; 
                    }
                    div{
                        display: inline-block;
                        // background:rgba(255,255,255,1);
                        img{
                            width:145px;
                            height:145px;      
                        }
                    }                    
                }
                .two_bar_code{
                    height: 200px;
                }
                .two_bar_code img{
                     width: 150px !important;
                     height: 150px;
                }
                .two_bar_input{
                    margin-bottom: 40px;  
                }
                .two_bar_input .el-input{
                    height:40px;
                    width: 264px;
                    border: none;
                }
                .register_two_list div:last-child{
                    margin-right: 0px;
                }
                 .el-link{
                    width: 180px;
                }
                .el-button{
                    width:120px;
                    height:40px;
                    border-radius:2px;
                }
            }
</style>
<script>
export default {
    data (){
        return {
            //谷歌二次验证码
            goo_value:"",
            //获取注册邮箱内容
            type_emila:sessionStorage.getItem('emilaz'),
            //二维码图片
            imgs:"",
            loading:false,
            //判断隐藏注册成功模块
            register_zg:true,
        }
    },
    mounted(){
        let that = this;
        //判断显示注册成功元素
        sessionStorage.getItem("link") == 2 ? that.register_zg = false : that.register_zg = true;
        //获取google 二次验证图形码
        sessionStorage.getItem("link") == 2 ? that.type_emila = sessionStorage.getItem("dt_email") : that.type_emila = sessionStorage.getItem('emilaz');
        that.post(that.$store.state.aip+'customerInfo/genSecret',{
            email: that.type_emila
        }).then((res)=>{
            if(res.code == 20000){
                that.imgs = res.message;
            }else{
                that.$message.error(res.message);
            }
        });
    },
    methods:{
        //开始谷歌二次验证
        regis_goole_next(){
            let that = this;
            if(that.goo_value == "" || that.goo_value == null){
                that.$message.error("请输入谷歌验证码！");
            }else{
                that.loading = true;
                that.post(that.$store.state.aip+'customerInfo/verify',{
                    email:that.type_emila,
                    code:that.goo_value
                }).then((res)=>{
                    if(res.code == 20000){
                    that.$message({ message: '谷歌二次验证成功！',type: 'success' });
                    sessionStorage.getItem("link") == 2 ?  setTimeout(function(){that.$router.push("/user_information"); },1000) : setTimeout(function(){ that.$router.push("/login"); },1000);
                    }else{
                        that.loading = false;
                        that.$message.error(res.message);
                    }
                });
            }
        },
        //跳过验证到登录页面
        index_link(name,index){
             sessionStorage.getItem("link") == 2 ? name = "user_information" :  name = "login";
             sessionStorage.setItem("index",0)
             this.$router.push({ path: name }); 
        }
    },
}
</script>