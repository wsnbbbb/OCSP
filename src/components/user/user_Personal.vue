<template>
    <div>
        <!-- 头部模块 -->
        <Navindex></Navindex>
        <!-- 左边模块 -->
        <Navleft></Navleft>
        <!-- 中间内容模块 -->
        <section class="user_person_content">
            <!-- 个人认证 -->
            <p class="user_grtz" @click="user_prev_link('/user_Authen',1)"><i class="el-icon-back"></i> 个人认证</p>
            <div class="user_person_rz">
               <!-- 步骤显示模块 -->
               <div class="user_list_next">
                    <ul>
                        <li>
                            <span>1</span><span>基本信息</span>
                            <i class="el-icon-arrow-right"></i>
                        </li>
                        <li ref="next_active_one2">
                            <span ref="next_active2">2</span><span>选择校验方式</span>
                            <i ref="next_active_one2" class="el-icon-arrow-right"></i>
                        </li>
                        <li ref="next_active_one3">
                            <span ref="next_active3">3</span><span>校验结果</span>
                        </li>
                    </ul>
                </div> 
              <!-- 第一步模块控制 -->
              <div v-show="person_one">
                <!-- 个人实名认证 -->
                <p class="user_title">个人实名认证 <i class="el-icon-warning"></i></p>
                <!-- 填写信息模块 -->
                <div class="user_person_form">
                    <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="130px"  class="demo-ruleForm">
                        <el-form-item label="认证地区">      
                         <el-col :span="7">
                            <el-select disabled  v-model="regions">
                                <el-option :value="regions"></el-option>
                            </el-select>
                         </el-col>               
                        </el-form-item>
                        <!-- 真实姓名 -->
                        <el-form-item label="真实姓名" prop="name">
                            <el-input v-model="ruleForm.name"  clearable placeholder="请输入真实姓名" maxlength="64"></el-input>
                        </el-form-item>
                        <!-- 证件类型 -->
                        <el-form-item label="证件类型" prop="type_crad">
                            <el-col :span="7">
                                  <el-select v-model="ruleForm.type_crad" placeholder="请选择类型">
                                    <el-option
                                        v-for="(item,index) in options" :key="index" :label="item.type_crad" :value="item.value">
                                    </el-option>
                                </el-select>
                         </el-col>     
                        </el-form-item>
                         <!-- 证件号码 -->
                        <el-form-item label="证件号码" prop="sfz">
                            <el-input v-model="ruleForm.sfz" clearable maxlength="18"  placeholder="请输入证件号码"></el-input>
                        </el-form-item>
                         <!-- 手机号码 -->
                        <el-form-item label="手机号码" prop="iphone">
                           <el-input placeholder="请输入手机号码"  maxlength="25" v-model="ruleForm.iphone" style="width:60%"
                            clearable
                            class="input-with-select input-with-wid">
                                <!-- <el-select v-model="ruleForm.select" slot="prepend" placeholder="+86">
                                    <el-option label="+86" value="1"></el-option>
                                    <el-option label="0827" value="2"></el-option>
                                    <el-option label="010" value="3"></el-option>
                                </el-select> -->
                            </el-input>
                        </el-form-item>
                         <!-- 通讯地址 --> 
                        <el-form-item class="addre_left" label="通讯地址" prop="address">
                          <el-col :span="6">
                            <!-- 国家显示的模块 -->
                            <el-select v-model="values" @change="coll_area" placeholder="请选择国家" v-show="worldArea">
                                <el-option	v-for="(item,index) in coll" :key="index" :label="item.name" :value="item.name"> </el-option>
                            </el-select>
                            <el-select v-model="province_val"  @change="coll_citys" placeholder="请选择省" v-show="worlda">
                                <el-option	
                                    v-for="(item,index) in provinceValue" :key="index" :label="item.areaName" :value="item.areaCode">
                                </el-option>
                            </el-select>
                        </el-col>  
                        <el-col :span="5" v-show="citysj">
                            <el-select v-model="city_value" @change="coll_cit" @visible-change="coll_citysj($event)" placeholder="请选择市/城区">
                                <el-option	
                                    v-for="(item,index) in cityValue" :key="index" :label="item.areaName" :value="item.areaCode">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5"  v-show="cityqu">
                            <el-select v-model="area_value" @change="coll_cityque" @visible-change="coll_cityqu($event)"  placeholder="请选择区/县">
                                <el-option
                                     v-for="(item,index) in areaValue" :key="index" :label="item.areaName" :value="item.areaCode">
                                </el-option>
                            </el-select>
                        </el-col>
                         <el-col :span="7">
                            <el-input placeholder="请输入详细地址" maxlength="200" v-model="ruleForm.address" clearable></el-input>
                        </el-col>
                        </el-form-item>
                      <!-- 底部隔断线 -->
                      <p class="cs-form-bottom"></p>
                      <!-- 下一步按钮 -->
                      <el-form-item>
                        <el-button type="primary"  @click="submitForm('ruleForm')">下一步</el-button>
                     </el-form-item>
                    </el-form>
              </div>  
            </div>   
            <!-- 第二步内容模块 -->
             <transition name="el-fade-in">
                <div class="user_prtsonal_free" v-show="drawer">
                     <span class="drawer_text">选择校验方式</span>
                    <div class="drawer_content">
                        <div>
                            <div id="qrcode"></div>
                            <span><img src="../../assets/authr/zfb.png">使用支付宝扫码认证</span>
                        </div>
                        <!-- <div>
                            <img src="../../assets/authr/weixin.png" alt="微信认证二维码">
                            <span><img src="../../assets/authr/weixin.png">使用微信扫码认证</span>
                        </div> -->
                        <!-- 第二步按钮 -->
                        <el-button type="primary primary_next" :loading="loading" @click="zfb_success">支付宝认证结果</el-button>
                    </div>
                    <div class="primary_next">
                        <!-- 返回基本信息 -->
                        <el-button type="success"  @click="user_prev">返回填写信息</el-button>
                    </div>
                </div>
            </transition>

             <!-- 第三步内容模块 -->
             <transition name="el-fade-in">
                   <div class="user_prtsonal_free" v-show="audit">
                     <div class="user_with_free">
                        <div class="user-with-padd">
                                <div>
                                    <img src="../../assets/authr/rzyes.png">
                                </div>
                                <div>
                                    <span v-html="auth_html"></span><span v-html="auth_msg"></span>
                                </div>
                                <div>
                                    <span><em>*</em>真实姓名：<em v-html="ruleForm.name"></em></span>
                                    <span><em>*</em>认证类型：<em>个人认证</em></span>
                                    <span><em>*</em>认证方式：<em v-html="rule_type"></em></span>
                                    <span><em>*</em>证件号码：<em v-html="ruleForm.sfz"></em></span>
                                    <span><em>*</em>认证地区：<em v-html="regions"></em></span>
                                </div>
                        </div>
                        <div class="user-with-button">
                            <el-button type="primary" @click="user_prev_link('user_information',0)">返回用户中心</el-button>
                        </div>
                    </div>
                </div>
            </transition>

            </div>
        </section>
         <!-- 底部内容模块-->
        <Allfooter></Allfooter>
        <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <span v-html="msg_why"></span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="user_personal('user_Persoals')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style lang="less" scoped>
    //第三步样式模块
    .user_prtsonal_free{
        width:1198px;
        background:rgba(255,255,255,1);
         .user_with_free{
            width:1088px;
            line-height: 30px;
            margin: 20px auto;
            background:rgba(238,253,252,1);
            .user-with-padd{
                width: 350px;
                padding: 50px 0px;
                margin: 0 auto;
                div{
                     display: inline-block;
                     padding-right: 10px;
                }
            }
            .user-with-padd div:nth-child(3){
                font-size: 14px;
                padding-left: 76px;
                padding-top: 10px;
                span{
                    display: block;
                    em{
                      color: #333;
                    }
                }
                span em:nth-child(1){
                    color: red;
                    padding-right: 3px;
                }
            }
            .user-with-button{
                 height: 100px;
                 line-height: 100px;
                 text-align: center;   
                 .el-button{
                    width:168px;
                    height:40px;
                    border-radius:2px;
                 }
            }
         }
         .user_with_free div img:nth-child(1){
            width: 60px;
        }
        .user_with_free div:nth-child(2) span:nth-child(1){
            color:rgba(80,80,80,1);
            font-size: 24px;
        }
        .user_with_free div:nth-child(2) span:nth-child(2){
            color:rgba(180,180,180,1);
            font-size: 14px;
            display: block;
            letter-spacing: 2px;
        }
    }
    .user_person_content{
        padding: 0px 20px;
        width: 1662px;
        margin-left: 200px; 
        margin-bottom: 5px;
        cursor: pointer;
        .user_grtz{
            font-size:14px;
            font-weight:400;
            color:#505050; 
            height: 50px;
            width: 90px;
            line-height: 50px;
            i{
                width:20px;
                font-size: 18px;
                font-weight: bold;
                vertical-align: middle;
                margin-top: -3px;
                color:rgba(52,165,253,1);
            }
        }
        .user_grtz:hover{
             color:rgba(52,165,253,1);
        }
        .user_person_rz{
            height:930px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(222,229,235,1);
            padding: 0 20px;
           .user_list_next{
               font-size: 14px;
               height: 23px;
               padding: 30px 185px;
               ul{
                    height:23px;
                    margin: 0;
                    padding: 0;
                   li{
                       list-style-type: none;
                       float: left;
                       padding-left: 15px;
                       span,i{
                           padding-left: 20px;
                       }
                       i{
                           font-size: 20px;
                           vertical-align: middle;
                           margin-top: -3px;
                       }
                   }
                   li:nth-child(1){
                       color: #505050;
                       span:nth-child(1){
                            background:rgba(77,146,249,1);
                            border-radius:50%;
                            padding: 0px 6px;
                            color: #fff;
                       }
                   }
                   li:nth-child(2){
                       color:rgba(183,183,183,1);
                        span:nth-child(1){
                            background:rgba(215,222,237,1);
                            border-radius:50%;
                            padding: 0px 6px;
                            color: #fff;
                       }
                   }
                   li:nth-child(3){
                       color:rgba(183,183,183,1);
                        span:nth-child(1){
                            background:rgba(215,222,237,1);
                            border-radius:50%;
                            padding: 0px 6px;
                            color: #fff;
                       }
                   }
               }
           }
        }
        .user_title{
            color: #505050;
            font-size: 16px;
            margin-bottom: 20px;
            i{
                color: #9AB1D3;
            }
        }
        .user_person_form{
            padding: 0px 50px;
            .el-form-item{
                height: 60px;
                line-height: 60px;
            }
        }
       .drawer_text{
             padding-left: 20px;
             color:rgba(80,80,80,1);
             font-size: 16px;
             letter-spacing: 1px;
         }
        .drawer_content{
            padding: 60px;
            height: 580px;
            div{
                width:300px;
                text-align: center;
                display: inline-block;
                img,#qrcode{
                    width:190px;
                    height:190px;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(222,229,235,1);
                    padding: 10px;
                }
                span{
                    display: block;
                    font-size:14px;
                    color:rgba(153,153,153,1);
                    text-align: center;
                    img{
                        width:30px;
                        height:30px;
                        border: none;
                        vertical-align: middle;
                        padding-right: 10px;
                    }
                }
            }
        }
        .primary_next{
            border-radius:2px;
            margin: 50px;
            display: block;
        }
    }
</style>
<style>
.avatar_top .el-dialog{
    width: 35% !important;
    box-shadow: none !important;
}
.el-upload-list--picture-card .el-progress,.el-progress-circle{
    width: 70px !important;
}
.el-upload-list--picture-card .el-upload-list__item{
    outline: none;
}
.user_person_form .el-form{
    width: 870px;
}
.user_person_form .avatar_cont .el-form-item__content{
    height: 140px !important;
}
.user_person_form .el-form-item{
    margin-bottom: 15px;
}
.user_person_form .el-form-item:last-child{
    margin-bottom: 0px;
    height: 50px !important;
}
.cs-form-bottom{
     width:1448px;
     border-top: 1px solid #E0E0E0;
}
.el-input.is-disabled .el-input__inner{
    color:#333;
}
.input-with-wid .el-input--suffix .el-input__inner{
    width: 100px;
    color:#333;
}
.addre_left .el-col-5,.addre_left .el-col-7{
    margin-left: 10px;
}
.addre_left .el-col-5:first-child{
    margin-left: 0px;
}
.avatar_height .el-upload--picture-card{
    border-radius: 0px;
    padding: 20px 0px;
}
.avatar_height .el-upload--picture-card i{
    display: flex;
    align-items: center;
    justify-content: center;
}
.avatar_height .el-upload__text{
    line-height: 35px;
}
.avatar_height .el-upload-list--picture-card .el-upload-list__item-thumbnail,
.avatar_height .el-upload-list--picture-card .el-upload-list__item,
.avatar_height .el-upload--picture-card,.avatar_height .el-upload__text{
    width: 100px;
    height: 100px;
}
.user_person_form .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    float: right;
    padding-left: 5px;
}
.user_person_form .el-form-item__label{
    color: #999;
}
.user_person_form .el-form-item__content{
    margin-left: 150px !important;
    height: 45px;
}
.avatar_height .avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background:rgba(250,252,255,1);
    border:1px solid rgba(222,229,235,1);
  }
  .avatar-uploader .el-upload:hover {
     border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .avatar-uploader,.el-image{
      margin-top: 12px;
  }
  .avatar_height{
      height: 170px !important;
  }
  .avatar_height .rule_title{
      font-size: 10px;
      color:rgba(187,187,187,1);
  }
  .el-icon-plus:before,.el-upload__text em{
      color:rgba(77,146,249,1);
  }
  .avatar_top{
      margin-top: 10px;
  }

</style>
<script>
import QRCode from "qrcodejs2";
import $ from 'jquery';
export default {
    data (){
        return {
        //三级选择需要用到的监听
        province_val:"",
        centerDialogVisible: false,
        city_value:"",
        area_value:"",
        loading:false,
        //市级的控制
        citysj:true,
        //改变认证结果的内容
        auth_html:"恭喜您，实名认证成功！",
        auth_msg:"支付宝认证成功！",
        rule_type:"支付宝认证",
        msg_why:"支付宝校验认证失败，是否跳转到人工审核？",
        //区县的控制
        cityqu:true,
        //外国模块显示控制
        worldArea:false,
        //大陆台湾中国显示控制
        worlda:true,
        //外国选择数组
        coll:[],
        values:"",
        //控制第一模块内容的显示
        person_one:true,
        //控制第二模块内容的显示
        drawer: false,
        //控制第三模块内容的显示
        audit:false,
        //对应选择的type值
        type_val:"",
        //选择地区对应的code码
        province_code:"",
        city_code:"",
        area_code:"",
        //选择地区对应的名字
        province_name:"",
        city_name:"",
        area_name:"",
        //选择国外对应的名字
        argw_name:"",
        //省数组
        provinceValue:[],
        //市数组
        cityValue:[],  
        //区数组
        areaValue:[],   
        //存储返回链接的ID
        certifyId:"",
        //支付宝查询结果的状态码
        Status:3,
        way:4,
        //认证地区显示值
        regions:"",
        //存储当前用户ID，上传图片返回接口有一定几率获取不到
        imgid:"",
        ruleForm: {
          //名字
          name:'',
          //身份证
          sfz:'',
          //电话号码
          iphone:'',
          //详细输入框   
          address:'',
          //手机选择
          select:'',
          //证件类型
          type_crad:"",
        },
        rules: {
          name: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
          ],
          sfz: [
            { required: true, message: '请输入证件号码', trigger: 'blur' },
          ],
          type_crad: [
            { required: true, message: '请选择证件类型', trigger: 'change' },
          ],
        },
         //下拉选择证件类型
        options:[{ 
            value: '1',
            type_crad: '居民身份证',
            },
        //     {
        //     value: '4',
        //     type_crad: '港澳居民来往内地通行证',     
        //     },{
        //     value: '5',
        //     type_crad: '台湾居民来往大陆通行证',
        //   },{
        //     value: '3',
        //     type_crad: '护照',
        //   }
          ],
        }
    },
    mounted(){
       //登录进来判断IP自动填充认证地区
       let that = this;
       that.post(that.$store.state.aip+'customerInfo/getAuthStausByloginName',{
            loginName:sessionStorage.getItem('email'),
            email:sessionStorage.getItem('email'),
            tel:sessionStorage.getItem('email'),
         }).then((res)=>{
             if(res.code == 20000){
                 // 调用对应选择的val值做显示隐藏
                 that.selectModel(res.data.attribution);
                 that.imgid = res.data.id; 
                 switch(res.data.attribution){
                    case 1:
                      that.regions = "中国大陆";
                      break;  
                    case 2:
                      that.regions = "中国港澳";  
                      break; 
                    case 3:
                      that.regions = "中国台湾";  
                      break; 
                    case 4:
                      that.regions = "海外";  
                      break;      
                      default:
                      that.regions = "定位失败";  
                 }
            }else{
                 that.$message.error(res.message);
           }
        });  
    },
    methods:{
        //校验方式失败跳转到人工审核
        user_personal(name){
            this.$router.push({path:name});
        },
        //返回到上一步认证页面
        user_prev_link(name,index){
            this.$router.push({path:name}); 
            sessionStorage.setItem("index",index);
        },
        //返回到上一步基本信息页面
        user_prev(){
            this.drawer = false;
            this.person_one = true;
        },
      //省区选择
      coll_citys(val){
           let that = this;
           let obj = [];
            obj = that.provinceValue.find((item)=>{
                return item.areaCode === val;
            });
            that.province_code = obj.areaCode;
            that.province_name = obj.areaName;
            that.city_value = "";
            that.area_value = "";
            that.city_code = "";
            that.area_code = "";
      },
      //市级选择
      coll_cit(val2){
           let that = this;
           let obj2 = [];
            obj2 = that.cityValue.find((item)=>{
                return item.areaCode === val2;
            });
            that.city_code = obj2.areaCode;
            that.city_name = obj2.areaName;
            that.area_value = "";
            that.area_code = "";
      },
      //市级选择
      coll_cityque(val3){
           let that = this;
           let obj3 = [];
            obj3 = that.areaValue.find((item)=>{
                return item.areaCode === val3;
            });
            that.area_code = obj3.areaCode;
            that.area_name = obj3.areaName;
      },
      //国外选择
      coll_area(val4){
           let that = this;
           let obj4 = [];
            obj4 = that.coll.find((item)=>{
                return item.name === val4;
            });
            that.argw_name = obj4.name;
      },
      //市级选择
      coll_citysj(code){
            let that = this;
            that.get(that.$store.state.aip+'sysArea/get',{area:that.type_val,parentCode:that.province_code}).then((res)=>{
               that.cityValue = res;
            });
      },
      //区级选择
       coll_cityqu(){
           let that = this;
            that.get(that.$store.state.aip+'sysArea/get',{area:that.type_val,parentCode:that.city_code}).then((res)=>{
                 that.areaValue = res;
          });
      },
      //认证地区
      selectModel(val){
            let that = this;
            //对选择的type值
            that.type_val = val;
            // area对应选择的val值做显示隐藏
            if(val == 2){
               that.cityqu = false; 
               that.china();
            }else if(val == 3){
               that.citysj = false;
               that.cityqu = false; 
               that.china();
            }else if(val == 4){
               that.worlda = false; 
               that.worldArea = true; 
               that.citysj = false; 
               that.cityqu = false; 
               that.foreign(); 
            }else{
                that.worldArea = false; 
                that.worlda = true; 
                that.citysj = true; 
                that.cityqu = true; 
                that.china();
            }
        },
        //中国接口地址
        china(){
            let that = this;
            that.get(that.$store.state.aip+'sysArea/get',{area:that.type_val,parentCode:0}).then((res)=>{
                that.provinceValue = res;
            });  
        },
        //外国地址接口
         foreign(){
            let that = this;
            that.get(that.$store.state.aip+'worldArea/get',{}).then((res)=>{
                   that.coll = res.data;
            });  
        },
        //查询支付宝认证结果
        zfb_success(){
            let that = this;
            that.Status = 1;
            that.way = 2; 
            that.post(that.$store.state.aip+'customerAuth/alipaycertify/result',{
                certifyId:that.certifyId,
            }).then((res)=>{
                if(res.code == 20010){
                    if(res.message == 1){
                        that.auth_html = "认证成功！";
                        //控制三日审核显示的文字
                        that.auth_msg = "支付宝方式认证成功！";
                        //认证成功调用提交数据
                        that.personal_add();
                    }
                     if(res.message == 2){
                        that.centerDialogVisible = true;
                        that.$refs.next_active_one3.style = "color:#505050;";
                         that.$refs.next_active3.style = "background:#4d92f9;";
                        //that.$message.error("支付宝认证失败,或者您还未扫码认证！");
                        return;
                    }
                }
            });  
        },
        //第二步提交按钮审核    
        personal_add(){
                let that = this;
                //判断是国内还是国外传入参数
                let contact = that.worldArea == true ? that.argw_name+"-":that.province_name+"-"+ that.city_name+"-"+ that.area_name+"-";
                let date = {
                        cardName:that.ruleForm.name,
                        cardNumber:that.ruleForm.sfz,
                        // 固定期限的输入框值
                        businessPeriod:"",
                        //身份证选择的按钮状态
                        periodStatus:2,
                        tel:that.ruleForm.iphone,
                        contactAddress:contact+that.ruleForm.address,
                        //当前客户
                        customerId:that.imgid, 
                        //企业认证类型5,个人认证类型1
                        authType:1, 
                        //查询支付认证的状态码
                        authStatus:that.Status,
                        //证件类型
                        certificateType:that.ruleForm.type_crad,
                        //认证方式
                        authWay:that.way,
                    }     
                    that.post(that.$store.state.aip+'customerAuth/add',date).then((res)=>{
                        if(res.code == 20000){
                            that.person_one = false;
                            setTimeout(function(){
                                that.drawer = false;
                                that.audit = true;
                                that.$refs.next_active_one3.style = "color:#505050;";
                                that.$refs.next_active3.style = "background:#4d92f9;";
                            },1000)
                        }else{
                            that.$message.error(res.message);
                        }
                 });           
        },

        //提交数据请求，要做手机号填写和不填写
        submit_axios(){
            let that = this;
            that.drawer = true;
            that.person_one = false;
            that.$refs.next_active_one2.style = "color:#505050;";
            that.$refs.next_active2.style = "background:#4d92f9;";
            //查询第二步模块中的支付宝生成二维码
            that.post(that.$store.state.aip+'customerAuth/alipaycertify',{
                cert_name:that.ruleForm.name,
                cert_no:that.ruleForm.sfz
            }).then((res)=>{
                if(res.code == 20000){
                    document.getElementById("qrcode").innerHTML = "";
                    let qrcode = new QRCode("qrcode", {
                        width: 190,
                        height: 190, 
                        text: res.data.certifyUrl, 
                        correctLevel : QRCode.CorrectLevel.L
                    });
                    //存储返回链接的ID进行查询
                    that.certifyId = res.data.certifyId;
                }else{
                    that.$message.error(res.message);
                }
            });        
        },
        //点击下一步按钮  
        submitForm(formName) {
            let that = this;
            that.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.submit_axios();
              }
            });
       },   
}
}
</script>