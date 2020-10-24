<template>
    <div>
        <!-- 头部内容模块 -->
        <Allnav></Allnav>
        <!-- 中间内容模块 -->
        <div class="register_content_update">
            <div class="register_con_wid">
            <p style="margin-left:98px">重置密码</p>
            <el-form :model="formLabelAlign"  hide-required-asterisk    label-width="100px" :rules="rules" ref="formLabelAlign" class="demo-ruleForm">
                <!-- 邮箱号码 -->
                <el-form-item label="邮箱号码" prop="emila">
                <el-input v-model="formLabelAlign.emila"  maxlength="64" clearable disabled autocomplete="off" placeholder="请输入邮箱号码">
                 <el-button class="append_color"  slot="append" :disabled="countFlag" @click="form_yzm"  >{{btnMsg == null ? countNum+'s重新发送' : btnMsg}}</el-button>
                </el-input>
                </el-form-item>
                <!-- 邮箱验证码 -->
                <el-form-item label="邮箱验证码" prop="codes">
                    <el-input v-model="formLabelAlign.codes"  
                    clearable 
                    placeholder="请输入邮箱验证码"></el-input>
                </el-form-item>
                <!-- 请输入密码 -->
                <el-form-item label="请输入密码" prop="pwd">
                <el-input v-model="formLabelAlign.pwd" 
                 clearable
                 autocomplete="off"
                 show-password
                 type="password"
                placeholder="请输入密码"></el-input>
                </el-form-item>
                <!-- 请再次输入密码 -->
                <el-form-item label="再次输入密码" prop="repwd">
                <el-input v-model="formLabelAlign.repwd" 
                 clearable
                 show-password
                 autocomplete="off"
                 type="password"
                 placeholder="请再次输入密码"></el-input>
                </el-form-item>
                <!-- 找回密码 -->
               <el-form-item>
                    <el-button type="primary" 
                    class="update_width"
                    :loading="loading"
                    @click="pwd_reast('formLabelAlign')">确 定</el-button>
                    <el-link type="primary" :underline="false" @click="return_url('login')">去登录</el-link>
                    <el-link type="primary mary" :underline="false" @click="return_url('user_information')">取消</el-link>
                </el-form-item>
            </el-form>
            </div>
        </div>
        <!-- 底部内容模块-->
        <Allfooter></Allfooter>
    </div>
</template>
<style>
.register_content_update .el-form-item__label{
    color: #505050;
}
.register_content_update .mary{
    left: 250px;
}
.register_con_wid .el-button.is-disabled:hover{
    height: 42px;
    border-radius: 2px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    background:#5092F5;
    color: #fff;
    border-right: 1px solid #5092F5;
    border-left: 1px solid #5092F5;
}
.register_content_update .el-form-item{
    margin-bottom: 30px;
}
.register_content_update .login_submit button{
    width:324px;
    height:44px;
    background:rgba(47,121,232,1);
    border-radius:2px;
    color: #fff;
    font-size:16px;
    margin-left: 20px;
    border: none; 
}
.register_content_update .el-input__inner{
    border-radius: 2px;
    height: 44px;
    line-height: 44px;
}
.register_content_update .el-input{
    height:44px;
    width: 324px;
}
.el-input.is-disabled .el-input__inner{
    color: #333 !important;
}
.register_content_update .el-input-group__append{
    background: #5092F5;
    color: #fff;
    cursor: pointer;
    padding: 0px 15px;
    border: none;
}
</style>
<style lang="less" scoped>
.register_content_update{
    width:1160px;
    height:610px;
    background: #fff;
    border-radius: 2px;
    margin: 100px auto;
  
    .register_con_wid{
        width: 430px;
        padding: 20px 0px;
        margin: 0 auto;
        p{
        text-align: center;
        font-size:18px;
        font-weight:400;
        letter-spacing: 1px;
        color:rgba(138,138,138,1);
        height: 50px;
        line-height: 50px;
        margin-left: 80px;
        em{
            color: #2F79E8;
        }
    }
    .update_width{
        width:324px;
        border-radius: 2px;
    }
   }
}
</style>
<script>
export default {
    data(){
        let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('密码大小写字母，数字至少包含2种'));
        } else {
          if (this.formLabelAlign.pwd !== '') {
            this.$refs.formLabelAlign.validateField('repwd');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formLabelAlign.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
       };
      return {
        // 控制按钮效果  
        loading:false, 
         // 倒计时周期
        countNum:60,
        // 用于倒计时标记，true-正在倒计时
        countFlag:false,
        // 定时器
        intervalBtn:{},
        //默认按钮的值
        btnMsg:"获取验证码",
        formLabelAlign: {
            emila: '',
            codes: '',
            pwd:'',
            repwd:'',
        },
         rules: {
          codes: [
            {  required: true, message: '请输入邮箱验证码', trigger: 'blur' }
          ],
          pwd: [
            { validator:validatePass, trigger: 'blur' }
          ],
          repwd: [
            { validator:validatePass2, trigger: 'blur' }
          ],
         }
      } 
    },
    mounted(){
        //自动显示邮箱号码
        this.formLabelAlign.emila = sessionStorage.getItem('dt_email');
    },
    methods:{
        //修改发送邮箱验证码
        form_yzm(){
            let that = this;
            let reg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;
            if(that.formLabelAlign.emila == "" || that.formLabelAlign.emila == undefined){
                 that.$message.error("请填写邮箱！"); 
            }else if(!reg.test(that.formLabelAlign.emila)){
                 that.$message.error("邮箱格式不正确!");    
            }else{
                that.post(that.$store.state.aip+'customerInfo/updatePwdCode',{
                    email:that.formLabelAlign.emila,
                }).then((res)=>{
                    if(res.code == 20000){
                        that.countDown();
                        that.$message({message: '邮箱发送成功，请注意查收！',type: 'success'});
                    }else{
                        that.$message.error(res.message);
                    }
                });  
            }
        },  
       //提交修改密码
       pwd_reast(formName){
            let that = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                that.loading = true;
                that.put(that.$store.state.aip+'customerInfo/updatePwd',{
                    email:that.formLabelAlign.emila,
                    code:that.formLabelAlign.codes,
                    newPassword :that.formLabelAlign.pwd
                }).then((res)=>{
                    if(res.code == 20000){
                         that.$message({
                            message: '重置密码成功，即将返回到登录页面',
                            type: 'success'
                        });
                        //跳转到登录页面
                        setTimeout(() => {
                             that.$router.push({ path: "/login"});
                        }, 2000);
                    }else{
                        that.loading = false;
                        that.$message.error(res.message);
                    }
                });   
            } 
            });
       },
       //返回登录页面
       return_url(name){
           this.$router.push({path:name}); 
       }
    },
}
</script>