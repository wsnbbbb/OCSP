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
                            <span>1</span><span>填写证明材料</span>
                            <i class="el-icon-arrow-right"></i>
                        </li>
                        <li ref="next_active_one2">
                            <span ref="next_active2">2</span><span>实名信息审核</span>
                        </li>
                    </ul>
                </div> 
              <!-- 第一步模块控制 -->
              <div v-show="person_one">
                <!-- 人工实名认证 -->
                <p class="user_title">人工实名认证 <i class="el-icon-warning"></i></p>
                <!-- 填写证明材料 -->
                <div class="user_person_form">
                    <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="130px"  class="demo-ruleForm">
                        <!-- 真实姓名 -->
                        <el-form-item label="真实姓名" prop="name">
                            <el-input v-model="ruleForm.name" clearable maxlength="64" placeholder="请输入真实姓名"></el-input>
                        </el-form-item>
                        <!-- 证件类型 -->
                        <el-form-item label="证件类型" prop="type_crad">
                            <el-col :span="7">
                                  <el-select  v-model="ruleForm.type_crad" placeholder="请选择类型">
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
                        <!-- 联系方式 -->
                        <el-form-item label="联系方式" prop="iphone">
                            <el-input v-model="ruleForm.iphone"  type="number"  oninput="if(value.length>25)value=value.slice(0,25)"  clearable  placeholder="请输入联系方式"></el-input>
                        </el-form-item>
                         <!-- 通讯地址 --> 
                        <el-form-item class="addre_left" label="通讯地址" prop="address">
                          <el-col :span="6">
                            <!-- 国家显示的模块 -->
                            <el-select v-model="values" @change="coll_area" placeholder="请选择国家" v-show="worldArea">
                                <el-option	v-for="(item,index) in coll" :key="index" :label="item.name" :value="item.name">
                                </el-option>
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
                            <el-input clearable  placeholder="请输入详细地址" maxlength="200"  v-model="ruleForm.address"></el-input>
                        </el-col>
                        </el-form-item>

                       <!-- 身份证上传 -->
                        <el-form-item class="avatar_height avatar_cont" ref="imageUrl" label="身份证上传" prop="imageUrl">
                            <el-row class="avatar_top">
                                <el-col :span="15">
                                         <el-upload :action="UploadUrl()" 
                                            list-type="picture-card" 
                                            name="file"
                                            ref="sfz"
                                            :on-success="onSuccess3"
                                            :on-preview="handlePictureCardPreview"
                                            :on-exceed="exceed"
                                            :on-remove="remove"
                                            :headers="myHeaders"
                                            :before-upload="beforeAvatarUpload"
                                            :limit="1">
                                            <div class="el-upload__text">
                                                <i class="el-icon-plus"></i>
                                                <em>正面</em>
                                            </div>
                                            </el-upload>
                                            <img v-show="false" :src="ruleForm.imageUrl" class="avatar">
                                            <el-dialog :visible.sync="dialogVisible">
                                             <img width="100%" :src="dialogImageUrl" alt="身份证正面图">
                                          </el-dialog>
                                        <span class="rule_title">* 请上传本人真实身份证照片，格式为JPG、JPEG、PNG大小不超过1MB</span>
                                </el-col>
                                 <el-col :span="8">
                                         <el-upload :action="UploadUrl()" 
                                            list-type="picture-card" 
                                            name="file"
                                            ref="sfz2"
                                            :on-success="onSuccess4"
                                            :on-preview="handlePictureCardPreview"
                                            :on-exceed="exceed"
                                            :on-remove="remove2"
                                            :headers="myHeaders"
                                            :before-upload="beforeAvatarUpload"
                                            :limit="1">
                                            <div class="el-upload__text">
                                                <i class="el-icon-plus"></i>
                                                <em>反面</em>
                                            </div>
                                            </el-upload>
                                             <img v-show="false" :src="ruleForm.imageUrl2" class="avatar">
                                            <el-dialog :visible.sync="dialogVisible">
                                             <img width="100%" :src="dialogImageUrl" alt="身份证反面图">
                                          </el-dialog>
                                </el-col>
                            </el-row>
                        </el-form-item>
                      <!-- 底部隔断线 -->
                      <p class="cs-form-bottom"></p>
                      <!-- 下一步按钮 -->
                      <el-form-item>
                        <el-button type="primary" :loading="loading"  @click="submitForm('ruleForm')">提交审核</el-button>
                     </el-form-item>
                    </el-form>
              </div>  
            </div>   
             <!-- 第二步内容模块 -->
             <transition name="el-fade-in">
                   <div class="user_prtsonal_free" v-show="drawer">
                    <div class="user_with_free">
                        <div class="user-with-padd">
                                <div>
                                    <img src="../../assets/authr/rzyes.png">
                                </div>
                                <div>
                                    <span>人工审核提交成功！</span><span>工作人员将在3-7天内完成审核！</span>
                                </div>
                                <div>       
                                    <span><em>*</em>真实姓名：<em v-html="ruleForm.name ? ruleForm.name : name_pers"></em></span>
                                    <span><em>*</em>认证类型：<em>人工认证</em></span>
                                    <span><em>*</em>证件号码：<em v-html="ruleForm.sfz ? ruleForm.sfz : sfz"></em></span>
                                    <span><em>*</em>证件类型：
                                    <em v-if="ruleForm.type_crad ? ruleForm.type_crad == 1 : type_crad == 1">居民身份证</em>
                                    <em v-else-if="ruleForm.type_crad ? ruleForm.type_crad == 3 : type_crad == 3">护照</em>
                                    <em v-else-if="ruleForm.type_crad ? ruleForm.type_crad == 4 : type_crad == 4">港澳居民来往内地通行证</em>
                                    <em v-else-if="ruleForm.type_crad ? ruleForm.type_crad == 5 : type_crad == 5">台湾居民来往大陆通行证</em>
                                    <em v-else>暂无信息</em>
                                    </span>
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
.avatar_top .el-upload-list{
    display:none;
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
.avatar_height .el-col-15 div{
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
import $ from 'jquery';
export default {
    data (){
        return {
        //图片上传要加上token    
        myHeaders: {Authorization:'token '+ sessionStorage.token},
        dialogImageUrl: "",
        dialogVisible: false,
        //真实姓名
        name_pers:"",
        //证件号码
        sfz:"",
        //证件类型
        type_crad:"",
        //三级选择需要用到的监听
        province_val:"",
        city_value:"",
        area_value:"",
        loading:false,
        //市级的控制
        citysj:true,
        //区县的控制
        cityqu:true,
        //外国模块显示控制
        worldArea:false,
        //大陆台湾中国显示控制
        worlda:true,
        //外国选择数组
        coll:[],
        values:"",
        //控制第二模块内容的显示
        drawer: false,
        //控制第一模块内容的显示
        person_one:true,
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
        way:4,
        //证件类型显示值
        regions:"",
        //存储当前用户ID，上传图片返回接口有一定几率获取不到
        imgid:"",
        ruleForm: {
          //名字
          name:'',
          //身份证
          sfz:'',
          //身份证上传
          imageUrl:'',
          imageUrl2:'',
          //电话号码
          iphone:'',
          //详细输入框   
          address:'',
          //证件类型
          type_crad:"",
        },
        rules: {
          name: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
          ],
          sfz: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' },
          ],
          imageUrl: [
            { required: true, message: '请选择身份证正反面上传', trigger: 'change'},
          ],
          type_crad: [
            { required: true, message: '请选择证件类型', trigger: 'change' },
          ],
        },
        //下拉选择证件类型
       options:[{ 
            value: '1',
            type_crad: '居民身份证',
            }, {
            value: '3',
            type_crad: '护照',
           },{
            value: '4',
            type_crad: '港澳居民来往内地通行证',     
            },{
            value: '5',
            type_crad: '台湾居民来往大陆通行证',
          },
         
          ],
        }
    },
    mounted(){
       //登录进来判断IP自动填充证件类型
       let that = this;
       that.post(that.$store.state.aip+'customerInfo/getAuthStausByloginName',{
            loginName:sessionStorage.getItem('email'),
            email:sessionStorage.getItem('email'),
            tel:sessionStorage.getItem('email'),
         }).then((res)=>{
             if(res.code == 20000){
                 switch(res.data.attribution){
                    case 1:
                      that.regions = "居民身份证";
                      break;  
                    case 2:
                      that.regions = "港澳居民来往内地通行证";  
                      break; 
                    case 3:
                      that.regions = "台湾居民来往大陆通行证";  
                      break; 
                    case 4:
                      that.regions = "护照";  
                      break;      
                      default:
                      that.regions = "定位失败";  
                 }
                 // 调用对应选择的val值做显示隐藏
                 that.selectModel(res.data.attribution);
                 that.imgid = res.data.id;    
                 that.name_pers = res.data.cardName;  
                 that.sfz = res.data.cardNumber;  
                 that.type_crad = res.data.certificateType;  
            }else{
                 that.$message.error(res.message);
           }
        });  

       //如果是审核中直接展示第三步
        if(sessionStorage.getItem('steps') == 2){
            that.drawer = true;
            that.person_one = false;
            that.$refs.next_active_one2.style = "color:#505050;";
            that.$refs.next_active2.style = "background:#4d92f9;";
        }
    },
    methods:{
        // 图片显示前做一下判断
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt1M = file.size / 1024 / 1024 < 1;
            if (!isJPG && !isPNG) {
                this.$message.error('上传图片必须是JPG/PNG/JPEG 格式！');
            }else if (!isLt1M) {
                this.$message.error('上传图片大小不能超过 1MB！');
            }
            return (isJPG || isPNG) && isLt1M;
       },
        //调用统一上传
       upload_success(res,index){
            $(".el-upload-list").css({'display':'inline' });
            this.$message({message: '图片上传成功！', type: 'success' });
            //上传成功返回的ID再次传给后台区分存值
            let date = {
                uploadId:res,
                customerId:this.imgid,
                type:index,
            }
            this.post(this.$store.state.aip+'uploadImage/save',date).then((res)=>{
                if(res.code == 20000){}
            });     
        },
      //正面文件上传成功时的钩子
      onSuccess3(res) {
            if(res.code == 20010){
              this.$message.error({message:res.message});
              //清除显示的结构
              this.$refs.sfz.clearFiles(); 
               //清除隐藏域的值
              this.ruleForm.imageUrl = "";
           }else{
               //成功赋值给隐藏图片
               this.$refs.imageUrl.clearValidate(); 
               this.ruleForm.imageUrl = res.message;
               this.upload_success(res.message,3);
          }
      },
      //反面文件上传成功时的钩子
      onSuccess4(res) {
           if(res.code == 20010){
              this.$message.error({message:res.message});
              //清除显示的结构
              this.$refs.sfz2.clearFiles(); 
              //清除隐藏域的值
              this.ruleForm.imageUrl2 = "";
           }else{
               //成功赋值给隐藏图片
               this.$refs.imageUrl.clearValidate(); 
               this.ruleForm.imageUrl2 = res.message;
               this.upload_success(res.message,4);
          }
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
      //区级选择
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
        //点击下一步按钮  
        submitForm(formName) {
            let that = this;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                if(that.ruleForm.imageUrl2 == "" || that.ruleForm.imageUrl == ""){
                      that.$message.error("您还没有上传完整的身份证照片！");
                }else{
                    //判断是国内还是国外传入参数
                    let contact = that.worldArea == true ? that.argw_name+"-":that.province_name+"-"+ that.city_name+"-"+ that.area_name+"-";
                    let date = {
                            //名称
                            cardName:that.ruleForm.name,
                            //身份证
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
                                that.loading = true;
                                setTimeout(function(){
                                    that.drawer = true;
                                    that.$refs.next_active_one2.style = "color:#505050;";
                                    that.$refs.next_active2.style = "background:#4d92f9;";
                                },300)
                            }else{
                                that.loading = false;
                                that.$message.error(res.message);
                            }
                    });   
                }
              }
          
            });
       },   
        //点击打开查看大图
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //返回到上一步认证页面
        user_prev_link(name,index){
            this.$router.push({path:name}); 
            sessionStorage.setItem("index",index);
        },
        //返回到上一步基本信息页面
        user_prev(){
            $(".el-upload-list").css({'display':'inline' });
            this.drawer = false;
            this.person_one = true;
        },
        //上传图片的地址
        UploadUrl(){
            return this.$store.state.aip+'uploadImage/upload';
        },
        // 超出上传个数时调用
        exceed(){
           this.$message.error("只能上传一张图片！");
        },
        //清除图片清空图片
        remove(){
            this.ruleForm.imageUrl = "";
        },
        remove2(){
            this.ruleForm.imageUrl2 = "";
        }
}
}
</script>