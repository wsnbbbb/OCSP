<template>
 <div class="login_content_fixnd">
    <!-- 头部内容模块 -->
    <Allnav></Allnav>
    <!-- 中间内容模块 -->
    <div class="login_content">
      <el-form 
      :model="ruleForm" :rules="rules" ref="ruleForm" 
       @submit.native.prevent
        hide-required-asterisk
       @keyup.enter.native="login_submit('ruleForm')">
        <div  class="login_left">
            <img src="../../assets/login/newber.png" alt="广告">
        </div>
        <div class="login_right">
          <div class="login_width_next">
            <p class="right_title">控制台登录</p>
            <!-- 手机输入框 -->
            <el-form-item  prop="username">
                <el-input
                placeholder="邮箱/用户名/手机号"
                v-model="ruleForm.username"
                maxlength="64"
                autocomplete="off"
                clearable>
             </el-input>
            </el-form-item>
            <!-- 登录密码 -->
            <!-- $t('login.pwd') -->
            <el-form-item  prop="pwd" class="pwd_top">
               <el-input
                show-password
                placeholder="请输入登录密码"
                v-model="ruleForm.pwd"
                autocomplete="off"
                maxlength="64"
                clearable>
            </el-input>
             </el-form-item>
           <el-form-item class="login_service">
                <!-- 自动记住密码 -->
                <el-checkbox v-model="che_pwd" @change="pwd_cookie">自动记住密码</el-checkbox>
             </el-form-item>
            <!-- 登录系统 -->
            <el-form-item>
                <el-button type="primary" :loading="loading"
                    @click="login_submit('ruleForm')">登 录</el-button>
            </el-form-item>
            <!-- 注册账号@忘记密码 -->
            <p class="login_why_reg_pwd">
                <span>
                  没有账号？
                    <em @click="free_registration('Register')">免费注册</em>
                </span>
                <span>
                    <em @click="free_registration('for_pwd')">忘记密码？</em>
                </span>
            </p>
        </div>
        </div>
        </el-form>
    </div>
    <!-- 底部内容模块-->
    <Allfooter></Allfooter>
</div>
</template>
<style>
.login_content_fixnd .el-dialog--center .el-dialog__body{
    overflow-y: scroll;
    height: 500px;
}
.login_content .el-button{
    width:400px;
    height:44px;
    background:rgba(47,121,232,1);
    border-radius:2px;
    color: #fff;
    font-size:16px;
}
.login_content .el-input{
    height:44px;
}
.login_content .el-checkbox{
    font-size: 12px;
}
.login_content .el-input__inner{
    background: #F5F5F5;
    border-radius: 2px;
}
.login_content .el-checkbox__inner{
    z-index: 0;
}
.login_content .el-checkbox__input{
    line-height: 2;
}
.login_content .el-input__inner::-webkit-input-placeholder{ /* WebKit browsers */
    color: #8A8A8A;
    letter-spacing: 2px;
}
.login_content .el-input__inner:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #8A8A8A;
    letter-spacing: 2px;
}
.login_content .el-input__inner::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #8A8A8A;
    letter-spacing: 2px;
}
.login_content .el-input__inner:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #8A8A8A;
    letter-spacing: 2px;
}
</style>
<style scoped lang="less">
.el-icon-caret-bottom,.el-icon-caret-top{
    color:#9EA4AF;
    padding-left: 30px;
}
#login_nav{ 
    width:100%;
    height:70px;
    background:rgba(36,42,54,1);
    .login_width{
        width: 1200px;
        margin: 0 auto;
        line-height: 70px;
        clear: both;
        img:nth-child(1){
            width:148px;
            height:38px;
            vertical-align: middle;
        }
        span:nth-child(2){
            font-size: 14px;
            color: #fff;
            position: relative;
            left: 15px;
            top: 10px;
            letter-spacing: 1px;
        }
    }
    .login_text_drop{
        float: right;
        div:nth-child(1){
          font-size: 14px;   
          display: inline-block;   
          color:rgba(255,255,255,1);
          margin-right: 15px;
        }
        .text_i18v{
            width:130px;
            height:30px;
            letter-spacing: 1px;
            border:1px solid rgba(95,106,129,1);
            position: relative;
            display: inline-block;
            line-height: 30px;
            font-size: 14px;
            cursor: pointer;
            span:nth-child(1){
                border: none;
                outline: none;
                background: transparent;
                font-weight:400;
                color: #DFE2E8;
                vertical-align: middle;
                padding-left: 10px;
            }
             img{
                position: absolute;
                right: 12px;
                top: 35%;
                width:14px;
             }
         }
          .text_i18v_list{
                width:130px;
                height:116px;
                background:rgba(40,48,65,1);
                margin-left: 74px;
                margin-top: -18px;
                font-size: 14px;
                ul{
                    padding: 0;
                    margin: 0;
                }
                ul li{
                    height: 36px;
                    cursor: pointer;
                    line-height: 36px;
                    list-style: none;
                    color: #DFE2E8;
                    text-align: left;
                    padding-left: 10px;
                   color:rgba(164,173,195,1);
                }
                ul li:hover{
                    background-color: #21293A;
                    color: #DFE2E8;
                }
            }
    }
}
.login_why_reg_pwd span:nth-child(2){
    float:right;
    margin-top: 4px;
}
.login_content{
    width: 1181px;
    margin: 140px auto;
    clear: both;
    height: 528px;
    border-radius: 3px;
    .login_width_next{
        width: 400px;
        padding: 30px;
        margin: 50px auto;
    }
    .login_left{
        width:673px;
        height:528px;
        float: left;
    }
    .login_right{
        width:508px;
        height:528px;
        background:rgba(255,255,255,1);
        float: right;
        .right_title{
            text-align: center;
            font-size:18px;
            font-weight:400;
            color:rgba(80,80,80,1);
            margin-bottom: 30px;
        }
        .login_service{
            font-size: 12px;
            em{
              color: #2F79E8;
            }
        }
    .login_why_reg_pwd span:nth-child(1),.login_why_reg_pwd span:nth-child(2){
        font-size: 12px;
        em{
            color: #2F79E8;
            cursor: pointer;
        }
    }

    }
}
</style>
<script>
export default {
    inject: ["reload"],
     data(){
      return {
        //记住密码
        che_pwd:false,
        //控制登录效果
        loading:false,
        ruleForm: {
            //用户名手机号邮箱
            username: "",
            //密码
            pwd:"",
            type:[],
        },
        rules: {
          username: [
            { required: true, message: '邮箱/用户名/手机号', trigger: 'blur' },
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
        },
        //此处用于对应切换语言包
        // language: 0,
        // lang: [{
        //   label: this.$t('message.zh'), 
        //   value: 0
        // },{
        //   label: this.$t('message.en'),
        //   value: 1
        // },
        // {
        //   label: this.$t('message.ft'),
        //   value: 2
        // }],
      };
    },
    mounted(){
        console.log(window.location.href);
        let that = this;
        //阻止浏览器后退
        history.pushState(null, null, window.location.href);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, window.location.href);
        });
        sessionStorage.getItem("cokie") == 1? that.che_pwd = true :  that.che_pwd = false;
        sessionStorage.getItem("cokie") == 1 ? that.ruleForm.username = sessionStorage.getItem("name") : that.ruleForm.username=""
        sessionStorage.getItem("cokie") == 1 ? that.ruleForm.pwd = sessionStorage.getItem("pwd") : that.ruleForm.pwd=""
    },
    methods:{
        // 点击登录，支持回车键
        login_submit(formName){
            let that = this;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    //加密
                    let encryptionName = that.Encrypt(that.ruleForm.pwd); 
                    that.post(that.$store.state.w_aip+'oauth/login',{
                        username:that.ruleForm.username,
                        password:encryptionName,
                    }).then((res)=>{
                        that.loading = true;   
                        if(res.code == 20000){
                            this.$cookies.set('DOCUMENT_DOMAIN', res.data.token , null, null, DOCUMENT_DOMAIN)
                            //存储登录token值
                            sessionStorage.setItem("token",res.data.token);
                            //存储三种输入方式来进行查询
                            sessionStorage.setItem("username",that.ruleForm.username);
                            sessionStorage.setItem("email",that.ruleForm.username);
                            sessionStorage.setItem("tel",that.ruleForm.username);
                            sessionStorage.setItem("name",that.ruleForm.username);
                            sessionStorage.setItem("pwd",that.ruleForm.pwd);
                            sessionStorage.setItem('url',"1");
                            that.$message({
                                message: '登录成功！',
                                type: 'success'
                            });
                            //登录成功跳转到首页
                            setTimeout(() => {
                               that.$router.push({ path: "/user_information"});
                            }, 500);
                        }else{
                            that.loading = false; 
                            that.$message.error(res.message);
                        }
                    });
             }
             });
     },
     //忘记密码@免费注册
     free_registration(name){
        this.$router.push({ path: name});
     },
     //存储
     pwd_cookie(){
        this.che_pwd == true ? sessionStorage.setItem("cokie",1):sessionStorage.removeItem("cokie");
        this.che_pwd == true ? sessionStorage.setItem("name",this.ruleForm.username) : sessionStorage.removeItem("name");
        this.che_pwd == true ? sessionStorage.setItem("pwd",this.ruleForm.pwd) : sessionStorage.removeItem("pwd");
     }, 
    }
}
</script>