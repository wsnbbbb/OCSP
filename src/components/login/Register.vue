<template>
    <div class="register_content_fixnd"> 
        <!-- 头部内容模块 -->
        <Allnav></Allnav>
        <!-- 中间内容模块 -->
        <div class="register_content_type">
            <div class="register_con_wid">
             <p>注册</p>
            <!-- status-icon  -->
            <el-form 
            :model="formLabelAlign" 
            hide-required-asterisk
            label-width="120px"
            :rules="rules" ref="formLabelAlign" class="demo-ruleForm">
               <!-- 邮箱号码 -->
              <el-form-item label="邮箱号码" prop="email">
                <el-input v-model="formLabelAlign.email"  maxlength="64"
                clearable
                autocomplete="off"
                placeholder="请输入邮箱号码">
                 <el-button class="append_color"  slot="append" :disabled="countFlag" @click="form_yzm"  >{{btnMsg == null ? countNum+'s重新发送' : btnMsg}}</el-button>
                </el-input>
                </el-form-item>
                <!-- 邮箱验证码 -->
                <el-form-item label="邮箱验证码" prop="code">
                <el-input v-model="formLabelAlign.code"
                 clearable
                 autocomplete="off"
                 placeholder="请输入邮箱验证码"></el-input>
                </el-form-item>
                <!-- 请输入密码 -->
                <el-form-item label="请输入密码" prop="pwd">
                <el-input v-model="formLabelAlign.pwd"
                 clearable
                 show-password
                 type="password"
                 placeholder="请输入密码">
                 </el-input>
                </el-form-item>
                <!-- 请再次输入密码 -->
                <el-form-item label="再次输入密码" prop="pwdres">
                <el-input v-model="formLabelAlign.pwdres" 
                clearable
                 show-password
                  type="password"
                 autocomplete="off"
                placeholder="请再次输入密码"></el-input>
                </el-form-item>
               <!-- 服务条款  -->
               <el-form-item prop="type" class="reg_item_sm">
                    <el-checkbox name="checked" v-model="formLabelAlign.checked">
                        同意并遵守
                    </el-checkbox>
                    <em @click="type_fw">《服务条款》</em> 和<em @click="type_ys">《隐私条款》</em>和<em @click="type_aq">《入网安全责任书》</em>
                </el-form-item>
                 <!-- 注册账号 -->
                <el-form-item  class="reg_item_sub">
                    <el-button type="primary" :loading="loading"
                        @click="submitForm('formLabelAlign')">注 册</el-button>
                        <span>已有账号，<em @click="login('Login')">去登录</em></span>
               </el-form-item>
            </el-form>
            </div>
        </div>
        <!-- 底部内容模块-->
        <Allfooter></Allfooter>
        <!-- 服务条款内容 -->
        <el-dialog
            title="服务条款"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :visible.sync="centerDialogVisible"
            width="60%"
            center>
            <span v-html="Visible_fw"></span>
            <span slot="footer" class="dialog-footer" id="count_scroll_yd">
                <el-button type="primary" 
                :disabled="countFlag_yd"
                @click="centerDialogVisible = false"
                >{{btnMsg_yd == null ? countNum_yd+'s可点击' : btnMsg_yd}}</el-button>
            </span>
             <span slot="footer" id="count_text_yd">
                <el-button type="primary"  @click="centerDialogVisible = false">同 意</el-button>
            </span>
        </el-dialog>
        <!-- 隐私条款内容 -->
        <el-dialog
            title="隐私条款"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :visible.sync="centerDialogVisibys"
            width="60%" center>
            <span v-html="Visible_ys"></span>
            <span slot="footer" class="dialog-footer" id="count_scroll_ys">
                <el-button type="primary"
                :disabled="countFlag_ys"
                @click="centerDialogVisibys = false"
                >{{btnMsg_ys == null ? countNum_ys+'s可点击' : btnMsg_ys}}</el-button>
            </span>
            <span slot="footer" id="count_text_ys">
                <el-button type="primary"  @click="centerDialogVisibys = false">同 意</el-button>
            </span>
        </el-dialog>
        <!-- 入网安全责任书 -->
        <el-dialog
            title="入网安全责任书"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :visible.sync="centerDialogVisibas"
            width="60%"
            center>
            <span v-html="Visible_as"></span>
            <span slot="footer" class="dialog-footer" id="count_scroll_as">
                <el-button type="primary"
                :disabled="countFlag_as"
                @click="centerDialogVisibas = false"
                >{{btnMsg_as == null ? countNum_as+'s可点击' : btnMsg_as}}</el-button>
            </span>
            <span slot="footer" id="count_text_as">
                <el-button type="primary"  @click="centerDialogVisibas = false">同 意</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<style>
.register_con_wid .el-form-item__label{
    color: #505050;
}
#count_text_yd,#count_text_ys,#count_text_as{
    display: none;
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
.register_con_wid .login_submit button{
    width:570px;
    height:44px;
    background:rgba(47,121,232,1);
    border-radius:2px;
    color: #fff;
    font-size:16px;
    margin-left: 20px;
    border: none;
}
.register_con_wid .el-input__inner{
    border-radius: 2px;
    height: 44px;
    line-height: 44px;
}
.register_con_wid .el-checkbox__inner{
    z-index: 0;
}
.register_con_wid .el-input-group__append{
    background: #5092F5;
    color: #fff;
    cursor: pointer;
}
.register_con_wid .el-checkbox__input{
    line-height: 2;
}
.register_con_wid .el-input__inner::-webkit-input-placeholder{ /* WebKit browsers */
    color: #BCBCBC;
    letter-spacing: 2px;
}
.register_con_wid .el-input__inner:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #BCBCBC;
    letter-spacing: 2px;
}
.register_con_wid .el-input__inner::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #BCBCBC;
    letter-spacing: 2px;
}
.register_con_wid .el-input__inner:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #BCBCBC;
    letter-spacing: 2px;
}
.register_content_fixnd .el-dialog--center .el-dialog__body{
    overflow-y: scroll;
    height: 500px;
}

</style>
<style lang="less" scoped>
.register_content_type{
    width:1200px;
    height:610px;
    background: #fff;
    border-radius: 2px;
    margin: 100px auto;
    .register_con_wid{
        width: 560px;
        padding: 20px 0px;
        margin: 0 auto;
        color: #333;
        p{
            text-align: center;
            font-size: 18px;
            color:rgba(138,138,138,1);
            padding-left: 70px;
        }
        .reg_item_sm {
            margin-bottom: 30px;
            em{
                color: #2F79E8;
                cursor: pointer;
            }
        }
        .reg_item_sm .el-checkbox{
            font-size:18px;
            font-weight:400;
            letter-spacing: 1px;
            color:#505050;
    }
    .reg_item_sub{
        cursor: pointer;
        .el-button{
            width: 440px;
            border-radius: 2px;
        }
        span{
          display: block;
          font-size:14px;
          text-align: right;
          color: #505050;
          width: 440px;
           em{
            color: #2F79E8;
            }
        }
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
            this.$refs.formLabelAlign.validateField('pwdres');
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
        //控制服务条款的内容
         centerDialogVisible:false,
         mun1:"",
         mun2:"",
         mun3:"",
         //控制隐私条款的内容
         centerDialogVisibys:false,
         //控制入网安全责任书
         centerDialogVisibas:false,
         //条款内容
         Visible_fw:"",
         //隐私内容
         Visible_ys:"",
         //条款内容
         Visible_fw:"",
         //入网安全责任书
         Visible_as:"",
        // 倒计时周期
        countNum:60,
        countNum_yd:10,
        countNum_ys:10,
        countNum_as:10,
        loading:false,
        // 用于倒计时标记，true-正在倒计时
        countFlag:false,
        countFlag_yd:false,
        countFlag_ys:false,
        countFlag_as:false,
        // 定时器
        intervalBtn:{},
        intervalBtn_yd:{},
        intervalBtn_ys:{},
        intervalBtn_as:{},
        //默认按钮的值
        btnMsg:"获取验证码",
        btnMsg_yd:"同 意",
        btnMsg_ys:"同 意",
        btnMsg_as:"同 意",
        //判断协议只阅读一次
        flag1:true,
        flag2:true,
        flag3:true,
        dalsVisble:true,
        formLabelAlign: {
            email: '',
            code: '',
            pwd:'',
            pwdres:'',
            checked:false,
          },
         rules: {
          email: [
            {  required: true, message: '请输入邮箱,最长不能超过64位', trigger: 'blur' }
          ],
          code: [
            {  required: true, message: '请输入邮箱验证码', trigger: 'blur' }
          ],
          pwd: [
            { validator:validatePass, trigger: 'blur' }
          ],
          pwdres: [
            {  validator:validatePass2, trigger: 'blur' }
          ],
          checked: [
            {required: true, message: '请勾选注册条款，条款须阅读10秒', trigger: 'change' }
          ],
         }
      } 
    },
    mounted(){
        //获取隐私条款，服务条款
        let that = this;
        that.get(that.$store.state.aip+'protocolTemplate',{
        }).then((res)=>{
            if(res.code == 20000){
                that.Visible_fw = res.data.serviceAgreement;
                that.Visible_ys = res.data.PrivacyPolicy;
                that.Visible_as = res.data.NetworkSecurity;
            }else{
                that.$message.error(res.message);
            }
        });
    },
    methods:{
        //查看服务条款
        type_fw(){
            this.centerDialogVisible = true;
            let cot = document.getElementById("count_scroll_yd");
            let tet = document.getElementById("count_text_yd");
            if (this.flag1) {  
               this.countyd();
               window.addEventListener('scroll',function(e){
                    let scrollTop = e.target.scrollTop;
                    let windowHeight = e.target.clientHeight;
                    let scrollHeight = e.target.scrollHeight;         
                    if(scrollTop+windowHeight==scrollHeight){
                        cot.style.display = "none";
                        tet.style.display = "block";
                    }
              },true);
              this.mun1 = 1;
              this.flag1 = false;
    　　　　}
        },
        //查看隐私条款
        type_ys(){
            this.centerDialogVisibys = true;
            let cot = document.getElementById("count_scroll_ys");
            let tet = document.getElementById("count_text_ys");
            if (this.flag2) {  
               this.countys();
                window.addEventListener('scroll',function(e){
                    let scrollTop = e.target.scrollTop;
                    let windowHeight = e.target.clientHeight;
                    let scrollHeight = e.target.scrollHeight;         
                    if(scrollTop+windowHeight==scrollHeight){
                        cot.style.display = "none";
                        tet.style.display = "block";
                    }
              },true);
               this.mun2 = 2;
　　　　　　　  this.flag2 = false;   
    　　　　} 
        },
        //查看入网安全责任书
        type_aq(){
            this.centerDialogVisibas = true;
            let cot = document.getElementById("count_scroll_as");
            let tet = document.getElementById("count_text_as");
            if (this.flag3) {                    
              this.countas();
              window.addEventListener('scroll',function(e){
                    let scrollTop = e.target.scrollTop;
                    let windowHeight = e.target.clientHeight;
                    let scrollHeight = e.target.scrollHeight;         
                    if(scrollTop+windowHeight==scrollHeight){
                        cot.style.display = "none";
                        tet.style.display = "block";
                    }
              },true);
              this.mun3 = 3;
　　　　　　　 this.flag3 = false;   
    　　　　}
        },
        //注册请求
        submitForm(formName) {
            let that = this;
            that.$refs[formName].validate((valid) => {
            if (valid) {
                if(that.mun1 !== 1){
                    that.$message.error("您还没有阅读服务条款！");
                }else if(that.mun2 !== 2){
                     that.$message.error("您还没有阅读隐私条款！");
                }else if(that.mun3 !== 3){
                     that.$message.error("您还没有阅读入网安全责任条款！");
                }else if(that.formLabelAlign.checked !== true){
                      that.$message.error("您还没有勾选注册条款！");   
                }else{
                      that.loading = true;
                      that.post(that.$store.state.aip+'customerInfo/customerRegister',{
                            email:that.formLabelAlign.email,
                            code:that.formLabelAlign.code,
                            loginPassword:that.formLabelAlign.pwd
                        }).then((res)=>{
                            if(res.code == 20000){
                                 that.$message({
                                    message: '注册成功，即将跳转到谷歌二次验证！',
                                    type: 'success'
                                });
                                //存储用户的注册成功的邮箱
                                sessionStorage.setItem('emilaz',that.formLabelAlign.email);
                                sessionStorage.setItem('url',"1");
                                //跳转到登录页面
                                setTimeout(() => {
                                   //跳转注册成功页面，参数带邮箱内容
                                    that.$router.push({ path: "/register_yes",name: 'register_yes'});
                                }, 600);
                            }else{
                                that.loading = false;
                                that.$message.error(res.message);
                            }
                     });   
                }
            } 
            });
         },
        //发送邮箱验证码
        form_yzm(){
                let that = this;
                let reg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;
                if(that.formLabelAlign.email == "" || that.formLabelAlign.email == undefined){
                    that.$message.error("请填写邮箱号码!");    
                }else if(!reg.test(that.formLabelAlign.email)){
                    that.$message.error("邮箱格式不正确!");    
                }else{
                    that.post(that.$store.state.aip+'customerInfo/aLiCodeSend',{
                        email:that.formLabelAlign.email,
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
        //去登录
        login(name){
            this.$router.push({ path: name });
        },
    },
}
</script>