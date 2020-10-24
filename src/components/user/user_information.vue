<template>
    <div>
        <!-- 头部模块 -->
        <Navindex></Navindex>
        <!-- 左边模块 -->
        <Navleft></Navleft>
        <!-- 中间内容模块 -->
        <section class="user_infoma_content">
            <p>基本信息</p>
            <div class="user_informti_name">
                <span>当前登录账号：</span>
                <span>{{user_info.email}}</span>
                <span class="user_emil" @click="dialogFormVisible_el = true">&nbsp;更换邮箱</span>
                <div class="user_in_right">
                    <span v-if="type.authStatus == 3">认证：<em @click="immediately('user_Authen',1)">审核中</em></span>
                    <span v-else-if="type.authStatus == 1">认证：<em>已认证</em></span>
                    <span v-else>认证：未认证 <em @click="immediately('user_Authen',1)">立即认证</em></span>
                    <span v-show="user_info.isSecondaryValidation == 0"><em @click="immediately('register_yes',2)">谷歌二次认证</em></span>
                    <span>联系方式：
                        <em  @click="dialogVisible = true" v-if="user_info.tel == '' || user_info.tel == null ">立即绑定</em>
                        <em  @click="dialogVisible = true" v-else>更换绑定</em>
                    </span>
                    <span @click="user_update_pwd('user_update_pwd')"><em>修改密码</em></span>
                </div>
            </div>
             <!-- 用户资料模块 -->
            <div class="user_informti_line">
                <!-- 用户企业信息 -->
                <div class="user_Enter" v-if="user_info.authType == 5">
                     <p>用户企业信息</p>
                     <div class="user_enter_padd">
                         <!-- 企业名称 -->
                         <div>
                             <span> 
                                企业名称：<em>{{user_info.enterpriseName==null?
                                  '暂无信息':user_info.enterpriseName}}</em>
                             </span>
                             <span>统一社会信用代码/注册号/组织机构代码：<em>{{user_info.uscc==null?
                                  '暂无信息':user_info.uscc}}</em></span>
                          </div>
                            <!-- 营业执照所在地 -->
                           <div>
                             <span> 
                                营业执照所在地：<em>{{user_info.licenseLocation==null?
                                  '暂无信息':user_info.licenseLocation
                                    }}</em>
                             </span>
                             <span>联系方式：<em>{{user_info.enterpriseTel==null?
                                  '暂无信息':user_info.enterpriseTel
                                 }}</em></span>
                          </div>
                            <!-- 经营期限至 -->
                           <div>
                             <span> 
                                经营期限至：<em>{{user_info.businessPeriod==null?
                                  '暂无信息':user_info.businessPeriod
                                    }}</em>
                             </span>
                            <!-- 修改 -->
                            <div class="user_updeta">
                                <el-button type="primary" v-if="user_info.enterpriseName != null" @click="dialogFormVisible_qy = true">修改</el-button>
                            </div>  
                          </div>
                            <!-- 营业执照照片或者扫描件 -->
                           <div class="user_img_height">
                             <div> 
                                营业执照照片或者扫描件：
                             </div>
                                <!-- 营业执照图片 -->
                                <el-image 
                                style="width: 150px; height: 100px;"
                                :src="user_info.businessLicensePicture" 
                                :preview-src-list="srcList">
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
                           </div>
                          </div>
                </div>
                <!-- 用户个人信息 -->
                <div class="user_Enter" v-if="user_info.authType == 5">
                     <p>法人个人信息</p>
                     <div class="user_enter_padd">
                         <!-- 企业名称 -->
                         <div>
                             <span> 
                                姓名：<em>{{user_info.cardName==null?
                                 '暂无信息':user_info.cardName
                                    }}</em>
                             </span>
                             <span>证件号码：<em>{{user_info.cardNumber==null?
                                 '暂无信息':user_info.cardNumber
                                 }}</em></span>
                          </div>
                            <!-- 营业执照所在地 -->
                           <div>
                             <span> 
                                证件类型：
                                <em v-if="user_info.certificateType == 1">居民身份证</em>
                                <em v-else-if="user_info.certificateType == 3">护照</em>
                                <em v-else-if="user_info.certificateType == 4">港澳居民来往内地通行证</em>
                                <em v-else-if="user_info.certificateType == 5">台湾居民来往大陆通行证</em>
                                <em v-else>暂无信息</em>
                             </span>
                             <span>通讯地址：<em>{{user_info.address==null?
                                 '暂无信息':user_info.address}}</em></span>
                          </div>
                            <!-- 经营期限至 -->
                           <div>
                             <span> 
                                联系方式：<em>{{user_info.tel==null?'暂无信息':user_info.tel}}</em>
                             </span>
                            <!-- 修改 -->
                            <div class="user_updeta">
                                <el-button type="primary" v-if="user_info.cardNumber != null" @click="dialogFormVisible_gr = true">修改</el-button>
                            </div>  
                          </div>
                            <!-- 证件照片： -->
                           <div class="user_img_height">
                             <div> 
                                证件照片：
                             </div>
                             <!-- 证件照片 -->
                             <div class="user_img_list">
                               <el-image 
                                style="width: 150px; height: 100px;"
                                :src="user_info.idCardFront" 
                                :preview-src-list="srcListfr">
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                                 </el-image>
                                <span>个人手持身份证正面彩色照</span>
                             </div>
                             <div class="user_img_list">
                               <el-image 
                                style="width: 150px; height: 100px;"
                                :src="user_info.idCardBack" 
                                :preview-src-list="srcListlt">
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                                </el-image>
                                <span>个人手持身份证背面彩色照</span>      
                             </div>
                           </div>
                          </div>
                 </div>
                 <!-- 用户个人信息 -->
                 <div class="user_Enter" v-if="user_info.authType == 1 || user_info.authType == null">
                     <p>用户个人信息</p>
                     <div class="user_enter_padd">
                         <!-- 企业名称 -->
                         <div>
                             <span> 
                                姓名：<em>{{user_info.cardName==null?
                                 '暂无信息':user_info.cardName
                                    }}</em>
                             </span>
                             <span>证件号码：<em>{{user_info.cardNumber==null?
                                 '暂无信息':user_info.cardNumber
                                 }}</em></span>
                          </div>
                            <!-- 营业执照所在地 -->
                           <div>
                             <span> 
                                证件类型：
                                <em v-if="user_info.certificateType == 1">居民身份证</em>
                                <em v-else-if="user_info.certificateType == 3">护照</em>
                                <em v-else-if="user_info.certificateType == 4">港澳居民来往内地通行证</em>
                                <em v-else-if="user_info.certificateType == 5">台湾居民来往大陆通行证</em>
                                <em v-else>暂无信息</em>
                             </span>
                             <span>通讯地址：<em>{{user_info.address==null?
                                 '暂无信息':user_info.address}}</em></span>
                          </div>
                            <!-- 经营期限至 -->
                           <div>
                             <span> 
                                联系方式：<em>{{user_info.tel==null?'暂无信息':user_info.tel}}</em>
                             </span>
                            <!-- 修改 -->
                            <div class="user_updeta">
                                <el-button type="primary" v-if="user_info.cardNumber != null" @click="dialogFormVisible_gr = true">修改</el-button>
                            </div>  
                          </div>
                            <!-- 证件照片： -->
                           <div class="user_img_height">
                             <div> 
                                证件照片：
                             </div>
                             <!-- 证件照片 -->
                             <div class="user_img_list">
                               <el-image 
                                style="width: 150px; height: 100px;"
                                :src="user_info.idCardFront" 
                                :preview-src-list="srcListfr">
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                                 </el-image>
                                <span>个人手持身份证正面彩色照</span>
                             </div>
                             <div class="user_img_list">
                               <el-image 
                                style="width: 150px; height: 100px;"
                                :src="user_info.idCardBack" 
                                :preview-src-list="srcListlt">
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                                </el-image>
                                <span>个人手持身份证背面彩色照</span>      
                             </div>
                           </div>
                          </div>
                 </div>

                </div>
        </section>
        <!-- 底部模块 -->
        <Allfooter></Allfooter>
        <!-- 绑定手机弹框 -->
        <el-dialog
            title="绑定联系方式"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
             @closed="resetFielip()"
            width="30%">
           <el-form :model="formLabelAlign" :rules="rules" ref="formLabelAlign"  hide-required-asterisk class="demo-ruleForm"
            label-width="100px" >
                <el-form-item label="手机号码：" prop="iphone">
                    <el-input  class="input-with-select input-with-wid"  clearable v-model="formLabelAlign.iphone" 
                     maxlength="25" placeholder="请输入手机号码">
                       <!-- <el-select v-model="modelId" @change="selectModel($event)" slot="prepend" placeholder="+86">
                            <el-option
                                v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select> -->
                        <el-button  slot="append" :disabled="countFlag" @click="user_code" >{{btnMsg == null ? countNum+'s重新发送' : btnMsg}}</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="验证码：" prop="yzm">
                    <el-input  clearable v-model="formLabelAlign.yzm" maxlength="6" style="width:154px;" placeholder="请输入验证码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm_iphone('formLabelAlign')">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 修改企业信息弹框-->
            <el-dialog title="企业信息编辑"  
             width="30%"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             @closed="resetFielqy()"
             :visible.sync="dialogFormVisible_qy">
                <el-form :model="qy_form" :rules="rules" hide-required-asterisk ref="qy_form" label-width="150px"  class="demo-ruleForm">
                    <el-form-item label="营业执照所在地：" prop="Picture">
                        <el-input  clearable  v-model="qy_form.Picture" autocomplete="off" maxlength="64"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式：" prop="tel">
                        <el-input  clearable  v-model="qy_form.tel" type="number"  oninput="if(value.length>25)value=value.slice(0,25)" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('qy_form')">确 定</el-button>
                </div>
            </el-dialog>

             <!-- 修改用户个人信息弹框-->
            <el-dialog title="个人信息编辑"  width="30%" 
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            @closed="resetFielgr()" :visible.sync="dialogFormVisible_gr">
                <el-form :model="gr_form" :rules="rules" ref="gr_form" hide-required-asterisk label-width="100px"  class="demo-ruleForm">
                    <el-form-item label="通讯地址：" prop="address_dialog">
                        <el-input v-model="gr_form.address_dialog" clearable autocomplete="off" maxlength="200"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('gr_form')">确 定</el-button>
                </div>
            </el-dialog>
            
             <!-- 更换邮箱模块弹框-->
            <el-dialog title="更换邮箱编辑"  width="30%" 
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            @closed="resetFielel()"
            :visible.sync="dialogFormVisible_el">
                <el-form :model="email_form" :rules="rules"  hide-required-asterisk ref="email_form" label-width="130px"  class="demo-ruleForm">
                    <el-form-item label="邮箱：" prop="update_email">
                        <el-input v-model="email_form.update_email" clearable autocomplete="off">
                              <el-button slot="append" :disabled="countFlag"  @click="email_code">
                               {{btnMsg == null ? countNum+'s重新发送' : btnMsg}}</el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="邮箱验证码：" prop="email_yzm">
                        <el-input v-model="email_form.email_yzm" clearable autocomplete="off" maxlength="6"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForms('email_form')">确 定</el-button>
                </div>
            </el-dialog>
         <!-- 底部内容模块-->
        <Allfooter></Allfooter>
    </div>
</template>
<style>
.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
    float: right;
    padding-left: 5px;
}
.el-input__inner{
    line-height: 0px !important;
}
.input-with-wid .el-input--suffix .el-input__inner{
    width: 100px;
    color:rgba(80,80,80,1);
}
.user_enter_padd .el-button{
    width:108px;
    height:40px;
    border-radius:2px;
}
.el-input-group__prepend{
    width: 52px;
}
.user_enter_padd .el-icon-picture-outline{
    font-size: 25px;
}
.user_enter_padd .el-input-group__append:hover{
    cursor: pointer;
}
.user_enter_padd .el-input-group__append{
    background-color:#fff !important;
}
.user_enter_padd .user_img_height .el-icon-circle-close{
    color: #409EFF;
}
.user_enter_padd .image-slot{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
}
.user_img_height .el-image-viewer__img{
    border: 1px solid #eee;
}
</style>
<style lang="less" scoped>
    .user_infoma_content{
        padding: 0px 0px 0px 20px;
        width: 1670px;
        margin-left: 200px;
        margin-bottom: 5px;
        p{
            font-size: 14px;
            color:rgba(164,173,195,1); 
            height: 50px;
            line-height: 50px;
        }
        .user_informti_name{
                font-size:14px;
                height:30px;
                background:rgba(235,240,247,1);
                padding: 10px;
                line-height: 30px;
                cursor: pointer;
                span{
                    color: #505050;
                    vertical-align: middle;
                }
                .user_in_right{
                     float: right;
                     font-size:14px;
                     span{
                         margin-left: 30px;
                         em{
                             color:#4988DA;
                             padding-left: 10px;
                         }
                     }
                }
            }
            .user_emil{
                color:#4988DA !important;
                vertical-align: middle;
            }
    }
    .user_informti_line{
        height:840px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(222,229,235,1);
        margin-top: 30px;
        cursor: pointer;
        .user_Enter:last-child{
            border-bottom: none;
        }
        .user_Enter{
            font-size: 16px;
            font-weight:400;
            color:rgba(80,80,80,1);
            padding: 0px 20px;
            font-size: 14px;
            width: 1560px;
            margin: 0 auto;
             border-bottom: 1px solid rgba(224,224,224,1);
            .user_enter_padd{
             width: 1500px;
             margin: 0 auto;   
             div {
                 height: 50px;
                 line-height: 50px;
                 span{
                    color: #999;
                    width: 500px;
                    display: inline-block;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    letter-spacing: 1px;
                    em{
                        color:#505050;
                        vertical-align: middle;
                    }
                 }
             }       
             .user_updeta{
                float:right;
             }
             .user_img_height{
                 height: 160px;
                 div{
                     float: left;
                     color: #999;
                 }
                 .user_img_list{
                     width: 415px;
                     height: 200px;
                     span{
                         width: 280px;
                         padding: 0px 20px;
                     }
                 }
                 .el-image{
                    margin-left: 20px;
                    margin-top: 20px;
                    background:rgba(250,252,255,1);
                    border:1px solid rgba(222,229,235,1);
                 }
             }
            }
       
        }
    }
</style>
<script>
export default {
    inject: ["reload"],
    data () {
        return {
        //拼接图片展示前缀
        http:"http://bss2.oss-cn-hongkong.aliyuncs.com/",
        // 倒计时周期
        countNum:60,
        // 用于倒计时标记,true-正在倒计时
        countFlag:false,
        // 定时器
        intervalBtn:{},
        //默认按钮的值
        btnMsg:"获取验证码",
        //绑定手机号码弹框   
        dialogVisible: false,
        //企业信息弹框
        dialogFormVisible_qy:false,
        //个人信息弹框
        dialogFormVisible_gr:false,
        //更换邮箱弹框
        dialogFormVisible_el:false,
        //用户登录名
        username:sessionStorage.getItem("username"),
        //用户邮箱
        email:sessionStorage.getItem("email"),
        //手机号码
        tel:sessionStorage.getItem("tel"),
        //点击查看营业执照
        srcListfr:[],
        //点击查看身份证正面
        srcListlt:[],
        //点击查看身份证反面
        srcList:[],
        //认证类型
        type:[],
        codeSe:0,  
        //控制绑定手机第一次不跳转
        forms:0, 
        qy_form:{
            //修改营业所在地
            Picture:"",
            //修改企业信息电话
            tel:"",
        },
        //修改个人信息地址
        gr_form:{
            address_dialog:"",
        },
        //更换邮箱地址
        email_form:{
            update_email: '',
            email_yzm: '',
        },
        //绑定认证发送手机号
        formLabelAlign: {
          iphone: '',
          yzm: '',
        },
        //下拉选择的地区值
        options:[{
            value: '1',
            label: '+86',
            },{
            value: '2',
            label: '+0827',     
            },{
            value: '3',
            label: '+010',
          }],
          modelId:"",
        //用户个人信息
        user_info:{
            //个人姓名
            loginName:"",
            //登录的账号
            email:"",
            // 证件号码/法人
            cardNumber:"",
            // 客户类型
            certificateType:"",
            // 地址
            address:"",
            // 联系电话
            tel:"",
            //身份证正面
            idCardFront:"",
            //身份证反面
            idCardBack:"",
            // 营业执照图片
            businessLicensePicture:"",
            // 企业名称
            enterpriseName:"",
            // 统一社会信用代码/注册号/组织机构代码
            uscc:"",
            //  执照所在地
            licenseLocation:"",
            // 企业联系电话
            enterpriseTel:"",
            //经营期限
            businessPeriod:"",
            //判断是否谷歌二次认证
            isSecondaryValidation:"",
          },
           //修改取出的登录的ID
           user_id:"",
           rules: {
            Picture: [
            { required: true, message: '请输入营业所在地', trigger: 'blur' },
          ],
           tel: [
            { required: true, message: '请输入联系方式', trigger: 'blur' }
          ],
          address_dialog: [
            { required: true, message: '请输入通讯地址', trigger: 'blur' }
         ],
          iphone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' }
         ],
          yzm: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
         ],
         update_email: [
            { required: true, message: '请输入邮箱号码', trigger: 'blur' }
         ],
         email_yzm: [
            { required: true, message: '请输入邮箱验证码', trigger: 'blur' }
         ],
        }
       }
    },
    mounted (){
        //请求拿到用户信息
         let that = this;
         that.post(that.$store.state.aip+'customerInfo/getByloginNameCustomerInfo',{
            loginName:that.email,
            email:that.email,
            tel:that.email,
         }).then((res)=>{
                if(res.code == 20000){
                    that.user_info = res.data;
                    sessionStorage.setItem("dt_email",that.user_info.email);
                    that.user_info.businessLicensePicture = res.data.businessLicensePicture == null ? "" : that.http+res.data.businessLicensePicture;
                    that.user_info.idCardFront =  res.data.idCardFront == null ? "" : that.http+res.data.idCardFront;
                    that.user_info.idCardBack =  res.data.idCardBack == null ? "" : that.http+res.data.idCardBack;
                    that.srcListfr.push(that.user_info.idCardFront);
                    that.srcListlt.push(that.user_info.idCardBack);
                    that.srcList.push(that.user_info.businessLicensePicture);
                    that.user_id = res.data.id;
                }else{
                    that.$message.error(res.message);
                }
            });  
       //判断头部显示认证的类型     
       that.post(that.$store.state.aip+'customerInfo/getAuthStausByloginName',{
            loginName:sessionStorage.getItem('email'),
            email:sessionStorage.getItem('email'),
            tel:sessionStorage.getItem('email'),
         }).then((res)=>{
                if(res.code == 20000){
                    that.type = res.data;
                }else{
                    that.$message.error(res.message);
                }
        });  
    },
    methods:{
        //选择手机号地区
        selectModel(val){
            let obj = [];
            obj = this.options.find((item)=>{
                return item.value === val;
            });
            this.modelId = obj.label;
        },
        //清除验证信息 
        resetFielqy(name){
            this.$refs.qy_form.resetFields();
        },
        resetFielgr(name){
            this.$refs.gr_form.resetFields();
        },
        resetFielel(name){
            this.$refs.email_form.resetFields();
        },
        //清除手机号码
        resetFielip(name){
            this.$refs.formLabelAlign.resetFields();
        },
        //发送邮箱验证码
        email_code(){
            let that = this;
            let reg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;
            if(that.email_form.update_email == "" || that.email_form.update_email == undefined){
                 that.$message.error("请填写邮箱！"); 
            }else if(!reg.test(that.email_form.update_email)){
                 that.$message.error("邮箱格式不正确!");    
            }else{
                that.post(that.$store.state.aip + "customerInfo/updateEmailCode",{
                    newEmail:that.email_form.update_email
                }).then((res)=>{
                        if(res.code == 20000){
                            that.countDown();
                            that.$message({message: "邮箱验证码发送成功！",type: 'success'});
                        }else{
                            that.$message.error(res.message);
                        }
                    }); 
            }
        },
        //发送绑定手机验证码
        user_code(){
           let that = this;
           let pho = /^1(3|4|5|6|7|8|9)\d{9}$/;
           if(that.formLabelAlign.iphone == "" || that.formLabelAlign.iphone == undefined){
                 that.$message.error("请填写手机号码！");    
             }else if(!pho.test(that.formLabelAlign.iphone)){
                 that.$message.error("手机号码格式错误，请重新填写！");    
             }else{
                that.codeSe = 1;
                that.post(that.$store.state.aip + "customerInfo/sendmobileMessage",{
                    id:that.user_id,
                    tel:that.formLabelAlign.iphone,
                    select:that.modelId.substring(1),
                    codeSending:that.codeSe,
                }).then((res)=>{
                        if(res.code == 20000){
                            that.countDown();
                            that.$message({
                                message: "验证码发送成功！",
                                type: 'success'});
                        }else{
                            that.$message.error(res.message);
                        }
                 });  
             }
        },
        //企业信息修改
        //个人信息修改
        //绑定手机号码
        submitForm(formName){
            let that = this;
            that.$refs[formName].validate((valid) => {
            if (valid) {
                //定义传入的值
                let i;
                //定义区分接口传参
                let api;
                //定义修改提示
                let msg;
                //企业信息
                if(that.dialogFormVisible_qy == true){
                    let qy_data = {
                        licenseLocation:that.qy_form.Picture,
                        enterpriseTel:that.qy_form.tel,
                        id:that.user_id,
                        type:2
                     }
                     i = qy_data;
                     api = "customerInfo/update";
                     msg = "信息修改成功！";
                }
                //个人信息
                if(that.dialogFormVisible_gr == true){
                    let gr_data = {
                        id:that.user_id,
                        type:1,
                        contactAddress:that.gr_form.address_dialog,
                    }
                     i = gr_data;
                     api = "customerInfo/update";
                     msg = "信息修改成功！";
                }
               that.put(that.$store.state.aip + api,i).then((res)=>{
                    if(res.code == 20000){
                       that.dialogFormVisible_qy = false;
                       that.dialogFormVisible_gr = false;
                       that.$message({message: msg, type: 'success' });
                        //局部刷新 
                        that.reload();
                    }else{
                        that.$message.error(res.message);
                    }
                });  
            } 
         });
        },
        //更换邮箱号
         submitForms(formName){
            let that = this;
            that.$refs[formName].validate((valid) => {
            if (valid) {
                that.put(that.$store.state.aip+'customerInfo/updateEmail',{
                        code:that.email_form.email_yzm,
                        id:that.user_id,
                        newEmail:that.email_form.update_email,
                }).then((res)=>{
                    if(res.code == 20000){
                        that.dialogFormVisible_el = false;
                        that.$message({message:'更换邮箱成功,即将跳转到登录页面！',type: 'success'});
                        setTimeout(() => {that.$router.push('/login'); }, 1300);
                    } else{
                        that.$message.error(res.message);
                    }
                });  
                }
             });  
        },  
         //绑定手机号
         submitForm_iphone(formName){
            let that = this;
            that.$refs[formName].validate((valid) => {
            if (valid) {
                that.put(that.$store.state.aip+'customerInfo/bindingMobile',{
                    id:that.user_id,
                    tel:that.formLabelAlign.iphone,
                    mobileVerificationCode:that.formLabelAlign.yzm,
                    codeSending:that.codeSe,
                }).then((res)=>{
                    if(res.code == 20000){
                         that.forms++;
                        //第一次绑定不跳转登录页面
                        that.dialogVisible = false;
                        that.$message({message:'手机号码绑定成功！',type: 'success'});
                        that.reload();
                        if(that.forms != 1){
                            setTimeout(() => {that.$router.push('/login'); }, 700);
                        }
                    } else{
                        that.$message.error(res.message);
                    }
                });  
              }
             });  
        },  
        //跳转到重置密码
        user_update_pwd(name){
           this.$router.push({name});
        },
        //跳转到谷歌二次验证和立即认证
        immediately(name,index){
            this.$router.push({name});
            index == 1 ? sessionStorage.setItem("index",index) : sessionStorage.removeItem("index");
            index == 2 ? sessionStorage.setItem("link",index) : sessionStorage.removeItem("link");
        },
    },
}
</script>