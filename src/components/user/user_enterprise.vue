<template>
    <div>
        <!-- 头部模块 -->
        <Navindex></Navindex>
        <!-- 左边模块 -->
        <Navleft></Navleft>
        <!-- 中间内容模块 -->
        <section class="user_person_content">
            <!-- 企业认证 -->
            <p class="user_grtz" @click="user_prev_link('user_Authen',1)"><i class="el-icon-back"></i> 企业认证</p>
            <div class="user_person_rz">
               <!-- 步骤显示模块 -->
               <div class="user_list_next">
                    <ul>
                        <li>
                            <span>1</span><span>企业证明材料</span>
                            <i class="el-icon-arrow-right"></i>
                        </li>
                        <li ref="next_active_one2">
                            <span ref="next_active2">2</span><span>企业法人信息</span>
                            <i ref="next_active_one2" class="el-icon-arrow-right"></i>
                        </li>
                        <li ref="next_active_one3">
                            <span ref="next_active3">3</span><span>实名信息审核</span>
                        </li>
                    </ul>
                </div> 
              <!-- 第一步模块 -->
              <div v-show="person_one">
                <!-- 企业信息 -->
                <p class="user_title">企业信息 <i class="el-icon-warning"></i></p>
                <!-- 填写信息模块 -->
                <div class="user_person_form">
                    <el-form :model="ruleForm" :rules="rules"   ref="ruleForm" label-width="150px"  class="demo-ruleForm">
                        <!-- 企业名称 -->
                        <el-form-item label="企业名称" prop="qy_name">
                            <el-input v-model="ruleForm.qy_name" maxlength="150" placeholder="请输入企业名称" clearable></el-input>
                        </el-form-item>
                        <!-- 统一社会信用代码 -->
                        <el-form-item label="统一社会信用代码" prop="sh_xy">
                            <el-input v-model="ruleForm.sh_xy" maxlength="50" placeholder="请输入社会信用代码" clearable></el-input>
                        </el-form-item>
                        <!-- 营业执照所在地址 -->
                        <el-form-item class="addre_left" label="营业执照所在地址">
                          <el-col :span="6">
                            <!-- 国家显示的模块 -->
                            <el-select v-model="values" @change="coll_area" placeholder="请选择国家" v-show="worldArea">
                                <el-option	v-for="(item,index) in coll" :key="index" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                            <el-select v-model="province_val"  @change="coll_citys"  placeholder="请选择省" v-show="worlda">
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
                            <el-input clearable  placeholder="请输入详细地址" v-model="ruleForm.yxaddress" maxlength="200"></el-input>
                        </el-col>
                        </el-form-item>
                         <!-- 联系方式 -->
                        <el-form-item label="联系方式" prop="iphone">
                            <el-input v-model="ruleForm.iphone" type="number"  oninput="if(value.length>25)value=value.slice(0,25)"  placeholder="请输入联系方式" clearable></el-input>
                        </el-form-item>
                        <!-- 经营期限 -->
                        <el-form-item label="经营期限" prop="gd_qx">
                            <el-row>
                                 <el-col :span="16">
                                         <!-- 经营期限输入框 -->
                                        <el-input clearable v-model="ruleForm.gd_qx" maxlength="24" placeholder="请输入经营期限">
                                            <template slot="prepend">经营期限</template>
                                        </el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <!-- 营业执照上传 -->
                        <el-form-item class="avatar_height avatar_cont" ref="ye_upload" label="营业执照上传" prop="ye_upload">
                            <el-row class="avatar_top">
                                <el-col :span="20">
                                        <el-upload :action="UploadUrl()" 
                                        list-type="picture-card" 
                                        name="file"
                                        ref="ye_uploads"
                                        :on-success="onSuccess2"
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
                                           <img v-show="false" :src="ruleForm.ye_upload" class="avatar">
                                           <el-dialog :visible.sync="dialogVisible">
                                                 <img width="100%" :src="dialogImageUrl" alt="营业执照图片">
                                           </el-dialog>
                                        <span class="rule_title">* 请上传真实营业执照，格式为JPG、JPEG、PNG大小不超过1MB</span>
                                </el-col>
                                 
                            </el-row>
                        </el-form-item>
                      <!-- 底部隔断线条   -->
                      <p class="cs-form-bottom"></p>
                      <!-- 下一步按钮 -->
                      <el-form-item>
                       <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">下一步</el-button>
                     </el-form-item>
                    </el-form>
              </div>  
            </div>   
             <!-- 第二步内容模块企业法人信息 -->
            <transition name="el-fade-in">
                <div class="user_prtsonal_free" v-show="drawer">
                 <!-- 企业法人信息 -->
                <p class="user_title">企业法人信息 <i class="el-icon-warning"></i></p>
                <!-- 填写信息模块 -->
                <div class="user_person_form">
                    <el-form :model="ruleForms" :rules="rulese"  ref="ruleForms" label-width="150px"  class="demo-ruleForms">
                        <!-- 真实姓名 -->
                        <el-form-item label="真实姓名" prop="far_name">
                            <el-input v-model="ruleForms.far_name" maxlength="150" placeholder="请输入真实姓名" clearable></el-input>
                        </el-form-item>
                         <!-- 证件类型 -->
                        <el-form-item label="证件类型" prop="type_crad">
                            <el-col :span="8">
                                  <el-select v-model="ruleForms.type_crad" placeholder="请选择类型">
                                    <el-option
                                        v-for="(item,index) in options" :key="index" :label="item.type_crad" :value="item.value">
                                    </el-option>
                                </el-select>
                         </el-col>     
                        </el-form-item>
                         <!-- 证件号码 -->
                        <el-form-item label="证件号码" prop="fr_sfz">
                            <el-input v-model="ruleForms.fr_sfz" maxlength="50" clearable  placeholder="请输入证件号码"></el-input>
                        </el-form-item>
                         <!-- 联系方式 -->
                        <el-form-item label="联系方式">
                            <el-input v-model="ruleForms.fr_iphone" maxlength="25" clearable  placeholder="请输入联系方式"></el-input>
                        </el-form-item>
                        <!-- 通讯地址 -->
                        <el-form-item class="addre_left" label="通讯地址">
                          <el-col :span="6">
                            <!-- 国家显示的模块 -->
                            <el-select v-model="values" @change="coll_area_fr" placeholder="请选择国家" v-show="worldArea">
                                <el-option	v-for="(item,index) in coll" :key="index" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                            <el-select v-model="fr_province_val"  @change="coll_citys_fr" placeholder="请选择省" v-show="worlda">
                                <el-option	
                                    v-for="(item,index) in provinceValue" :key="index" :label="item.areaName" :value="item.areaCode">
                                </el-option>
                            </el-select>
                        </el-col>  
                        <el-col :span="5" v-show="citysj">
                            <el-select v-model="fr_city_value" @change="coll_cit_fr" @visible-change="fr_coll_citysj($event)" placeholder="请选择市/城区">
                                <el-option	
                                    v-for="(item,index) in cityValue" :key="index" :label="item.areaName" :value="item.areaCode">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5"  v-show="cityqu">
                            <el-select v-model="fr_area_value" @change="coll_cityque_fr" @visible-change="fr_coll_cityqu($event)"  placeholder="请选择区/县">
                                <el-option
                                     v-for="(item,index) in areaValue" :key="index" :label="item.areaName" :value="item.areaCode">
                                </el-option>
                            </el-select>
                        </el-col>
                         <el-col :span="7">
                            <el-input clearable  placeholder="请输入详细地址" v-model="ruleForms.fr_address" maxlength="200"></el-input>
                        </el-col>
                        </el-form-item>    
                         <!-- 法人身份证上传 -->
                        <el-form-item class="avatar_height avatar_cont" ref="frsfz" label="法人身份证上传" prop="frsfz">
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
                                            <img v-show="false" :src="ruleForms.frsfz" class="avatar">
                                            <el-dialog :visible.sync="dialogVisible">
                                             <img width="100%"  :src="dialogImageUrl" alt="身份证正面图">
                                          </el-dialog>
                                          <span class="rule_title">* 请上传真实法人身份证，格式为JPG、JPEG、PNG大小不超过1MB</span>
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
                                    <img v-show="false" :src="ruleForms.frsfz2" class="avatar">
                                    <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="身份证反面图">
                                    </el-dialog>
                                </el-col>
                            
                            </el-row>
                        </el-form-item>
                      <!-- 底部隔断线条   -->
                      <p class="cs-form-bottom"></p>
                      <!-- 下一步按钮 -->
                      <el-form-item>
                       <el-button type="success"  @click="user_prev">返回填写信息</el-button>  
                       <el-button type="primary" :loading="loading" @click="submitForms('ruleForms')">提交审核</el-button>
                     </el-form-item>
                    </el-form>
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
                                     <span>企业认证提交成功！</span><span>工作人员将在3-7个工作日完成审核！</span>
                                </div>
                                <div>
                                    <span><em>*</em>统一社会信用代码：<em v-html="ruleForm.sh_xy ? ruleForm.sh_xy  : sh_xy"></em></span>
                                    <span><em>*</em>企业名称：<em v-html="ruleForm.qy_name ? ruleForm.qy_name : qy_name "></em></span>
                                    <span><em>*</em>认证类型：<em>企业认证</em></span>
                                    <span><em>*</em>认证地区：<em>中国大陆</em></span>
                                    <span><em>*</em>法人名称：<em v-html="ruleForms.far_name ? ruleForms.far_name :far_name "></em></span>
                                    <span><em>*</em>证件号码：<em v-html="ruleForms.fr_sfz?  ruleForms.fr_sfz :fr_sfz"></em></span>
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
                width: 400px;
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
            width: 880px;
            padding: 0px 50px;
            .el-form-item{
                height: 60px;
                line-height: 60px;
            }
        }
    }
</style>
<style>
.avatar_top .el-dialog{
    width: 35% !important;
    box-shadow: none !important;
}
.avatar_top .el-upload-list{
    display:none;
}
.v-modal{
    z-index: 11  !important;
}
.el-input.is-disabled .el-input__inner{
    color:#333;
}
.el-upload-list--picture-card .el-progress,.el-progress-circle{
    width: 70px !important;
}
.el-progress-circle{
    height: 70px !important;
}
.el-upload-list--picture-card .el-upload-list__item{
    outline: none;
}
.user_prtsonal_next .el-drawer {
    box-shadow: none;
    width: 1660px !important;
    outline: none;
    right: 20px;
    top: 289px;
    left: 221px;
    background: #fff;
}
.user_prtsonal_next .el-drawer__wrapper{
    position:absolute;
    height: 1079px;
}
.user_person_form .avatar_cont .el-form-item__content{
    height: 140px !important;
}
.user_person_form .user_title_right{
    position: relative;
    right: 42px;
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
.input-with-wid .el-input--suffix .el-input__inner{
    width: 100px;
    color:rgba(80,80,80,1);
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
  .user_person_form .avatar_height{
      height: 170px !important;
  }
  .avatar_height .rule_title{
      font-size: 10px;
      color:rgba(187,187,187,1);
  }
  /* .avatar_sample{
      width: 66% !important;
  } */
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
        //三级选择需要用到的监听
        province_val:"",
        city_value:"",
        area_value:"",
        //统一社会信用代码
        sh_xy:"",
        //企业名称
        qy_name:"",
        //法人姓名
        far_name:"",
        //法人身份证
        fr_sfz:"",
        //法人监听
        fr_province_val:"",
        fr_city_value:"",
        fr_area_value:"",
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
        //对应选择的type值
        type_val:"",
        //选择地区对应的code码
        province_code:"",
        city_code:"",
        area_code:"",
        //法人对应的code码
        fr_province_code:"",
        fr_city_code:"",
        fr_area_code:"",
        //选择地区对应的名字
        province_name:"",
        city_name:"",
        area_name:"",
        //法人通讯地址
        fr_province_name:"",
        fr_city_name:"",
        fr_area_name:"",
        //选择国外对应的名字
        argw_name:"",
        argw_namefr:"",
        //省数组
        provinceValue:[],
        //市数组
        cityValue:[],  
        //区数组
        areaValue:[],   
        //控制按钮效果
        loading:false,
        //控制第三模块内容的显示
        audit: false,
        //控制第二模块内容的显示
        drawer: false,
        //控制第一模块内容的显示
        person_one:true,
        //存储当前用户ID，上传图片返回接口有一定几率获取不到
        imgid:"",
        //存储法人证件类型读取
        regions:"",
        //企业填写字段
        ruleForm: {
          //企业名称   
          qy_name:'',
          //社会信用代码
          sh_xy:'',
          //营业执照所在地
          yxaddress:'',
          //联系方式
          iphone:'',
          //经营期限输入框
          gd_qx:'',
          //营业执照上传
          ye_upload:'',
        },
        //法人填写字段
         ruleForms: {
          //法人名称
          far_name:'',
          //法人身份证上传
          frsfz:'',
          //法人身份证号码
          fr_sfz:'',
          frsfz2:'',
          //法人联系方式
          fr_iphone:'',
          //法人通讯地址
          fr_address:'',
          //证件类型
          type_crad:"",
        },
        //企业验证
        rules: {
          qy_name: [
            { required: true, message: '请输入企业名称',trigger: 'blur' },
          ],
          fr_name: [
            { required: true, message: '请输入法人姓名',trigger: 'blur' },
          ],
          sh_xy: [
            { required: true, message: '请输入社会信用代码', trigger: 'blur' },
          ],
          gd_qx: [
            { required: true, message: '请输入经营期限,格式如：2013年6月17日至长期', trigger: 'blur' },
          ],
          ye_upload: [
            { required: true, message: '请选择营业执照上传', trigger: 'change' },
          ],
        },
        //法人验证
        rulese: {
          far_name: [
            { required: true, message: '请输入法人名称', trigger: 'blur' },
          ],
          frsfz: [
            { required: true, message: '请选择法人身份证正反面上传', trigger: 'change' },
          ],
          fr_sfz: [
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
            },{
            value: '4',
            type_crad: '港澳居民来往内地通行证',     
            },{
            value: '5',
            type_crad: '台湾居民来往大陆通行证',
          },{
            value: '3',
            type_crad: '护照',
          }
          ],
        }
    },
    mounted (){
       //登录进来判断法人自动填充证件类型
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
                 that.sh_xy = res.data.uscc;
                 that.qy_name = res.data.enterpriseName;
                 that.far_name = res.data.cardName;
                 that.fr_sfz = res.data.cardNumber;
            }else{
                 that.$message.error(res.message);
           }
        });  
        //如果是审核中直接展示第三步
        if(sessionStorage.getItem('steps') == 1){
            that.audit = true;
            that.person_one = false;
            that.$refs.next_active_one2.style = "color:#505050;";
            that.$refs.next_active2.style = "background:#4d92f9;";
            that.$refs.next_active_one3.style = "color:#505050;";
            that.$refs.next_active3.style = "background:#4d92f9;";
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
            return (isJPG || isPNG)  && isLt1M;
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
      //文件上传成功时的钩子
      onSuccess2(res) {
           if(res.code == 20010){
              this.$message.error({message:res.message});
              this.$refs.ye_uploads.clearFiles(); 
              this.ruleForm.ye_upload = "";
           }else{
               //成功赋值给隐藏图片
                this.$refs.ye_upload.clearValidate(); 
                this.ruleForm.ye_upload = res.message;
                this.upload_success(res.message,2);
          }
      },
      //文件上传成功时的钩子
      onSuccess3(res) {
            if(res.code == 20010){
              this.$message.error({message:res.message});
              this.$refs.sfz.clearFiles();  
              this.ruleForms.frsfz = "";
           }else{
               //成功赋值给隐藏图片
               this.$refs.frsfz.clearValidate(); 
               this.ruleForms.frsfz = res.message;
               this.upload_success(res.message,3);
          }
      },
      //文件上传成功时的钩子
      onSuccess4(res) {
           if(res.code == 20010){
              this.$message.error({message:res.message});
              this.$refs.sfz2.clearFiles();  
              this.ruleForms.frsfz2 = "";
           }else{
                //成功赋值给隐藏图片
                this.$refs.frsfz.clearValidate(); 
                this.ruleForms.frsfz2 = res.message;
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
      //法人省区选择
      coll_citys_fr(val){
           let that = this;
           let obj = [];
            obj = that.provinceValue.find((item)=>{
                return item.areaCode === val;
            });
            that.fr_province_code = obj.areaCode;
            that.fr_province_name = obj.areaName;
            that.fr_city_value = "";
            that.fr_area_value = "";
            that.fr_city_code = "";
            that.fr_area_code = "";
      },
      //法人市级选择
      coll_cit_fr(val2){
           let that = this;
           let obj2 = [];
            obj2 = that.cityValue.find((item)=>{
                return item.areaCode === val2;
            });
            that.fr_city_code = obj2.areaCode;
            that.fr_city_name = obj2.areaName;
            that.fr_area_value = "";
            that.fr_area_code = "";
      },
      //法人区级选择
      coll_cityque_fr(val3){
           let that = this;
           let obj3 = [];
            obj3 = that.areaValue.find((item)=>{
                return item.areaCode === val3;
            });
            that.fr_area_code = obj3.areaCode;
            that.fr_area_name = obj3.areaName;
      },
      //法人国外选择
      coll_area_fr(val4){
           let that = this;
           let obj4 = [];
            obj4 = that.coll.find((item)=>{
                return item.name === val4;
            });
            that.argw_namefr = obj4.name;
      },
      //市级选择
      coll_citysj(code){
            let that = this;
            that.get(that.$store.state.aip+'sysArea/get',{area:that.type_val,parentCode:that.province_code}).then((res)=>{
               that.cityValue = res;
            });
      },
      //区级选择
       coll_cityqu(code){
           let that = this;
            that.get(that.$store.state.aip+'sysArea/get',{area:that.type_val,parentCode:that.city_code}).then((res)=>{
                 that.areaValue = res;
          });
      },
      //法人市级选择
      fr_coll_citysj(code){
            let that = this;
            that.get(that.$store.state.aip+'sysArea/get',{area:that.type_val,parentCode:that.fr_province_code}).then((res)=>{
               that.cityValue = res;
            });
      },
      //法人区级选择
       fr_coll_cityqu(code){
           let that = this;
           that.get(that.$store.state.aip+'sysArea/get',{area:that.type_val,parentCode:that.fr_city_code}).then((res)=>{
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

      //点击下一步到法人信息
      submitForm(formName) {
            let that = this;
            that.$refs[formName].validate((valid) => {
            if (valid) {
                $(".el-upload-list").css({'display':'inline' });
                // $(".el-upload-list").css({'display':'none',});
               that.drawer = true;
               that.person_one = false;
               that.$refs.next_active_one2.style = "color:#505050;";
               that.$refs.next_active2.style = "background:#4d92f9;";
               that.fr_province_val = "";
               that.fr_city_value = "";
               that.fr_area_value = "";
            }
        });
       },   
      //点击提交审核
      submitForms(formName) {
            let that = this;
            that.$refs[formName].validate((valid) => {
            if (valid) {
                if(that.ruleForms.frsfz2 == "" || that.ruleForms.frsfz == ""){
                     that.$message.error("您还没有上传完整的身份证照片！");
                }else{
                    //判断企业通讯地址
                    let contact = that.worldArea == true ? that.argw_name+"-":that.province_name+"-"+ that.city_name+"-"+ that.area_name+"-";
                    //判断法人通讯地址
                    let fr_contact = that.worldArea == true ? that.argw_namefr+"-":that.fr_province_name+"-"+ that.fr_city_name+"-"+ that.fr_area_name+"-";
                    let date = {
                    //企业名称
                    enterpriseName:that.ruleForm.qy_name,
                    //统一社会信用代码
                    uscc:that.ruleForm.sh_xy,
                    // 营业执照所在地址
                    licenseLocation:contact+that.ruleForm.yxaddress,
                    //联系方式
                    enterpriseTel:that.ruleForm.iphone,
                    //经营期限
                    businessPeriod:that.ruleForm.gd_qx,
                    periodStatus:2,
                    //法人姓名
                    cardName:that.ruleForms.far_name,
                    //法人身份证
                    cardNumber:that.ruleForms.fr_sfz,
                    //法人联系方式
                    tel:that.ruleForms.fr_iphone,
                    //法人通讯地址
                    contactAddress:fr_contact+that.ruleForms.fr_address,
                    //当前客户
                    customerId:that.imgid, 
                    //企业认证类型5,个人认证类型1
                    authType:5, 
                    //默认身份证类型
                    certificateType:that.ruleForms.type_crad,
                    //认证方式
                    authWay:4,
                }                
                that.post(that.$store.state.aip+'customerAuth/add',date).then((res)=>{
                    that.loading = true;  
                    if(res.code == 20000){
                      that.drawer = false;
                      that.audit = true;
                      that.$refs.next_active_one3.style = "color:#505050;";
                      that.$refs.next_active3.style = "background:#4d92f9;";
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
            this.ruleForm.ye_upload = "";
            this.ruleForms.frsfz = "";
            this.ruleForms.frsfz2 = "";
        },
        remove2(){
            this.ruleForms.frsfz2 = "";
        }
}
}
</script>