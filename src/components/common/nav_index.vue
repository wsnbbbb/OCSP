<template>
       <!-- 头部内容模块  -->
        <section @mouseout="nav_user = false;nav_list = false;nav_admin = false;">
            <!-- 左边内容模块 -->
            <div class="nav_left">
                <!-- 管理控制台@产品与服务-->
                 <div class="nav_left_fw">
                    <img src="../../assets/logo.png">
                    <ul>
                        <li>管理控制台</li>
                        <li @click="nav_user_li()">产品与服务 <i class="el-icon-arrow-down"></i>
                        <!-- <li @mouseover="nav_list = true">产品与服务 <i class="el-icon-arrow-down"></i> -->
                        <!-- 产品与服务内容 -->
                       <el-collapse-transition>
                        <div class="nav_index_co1" v-show="nav_list" @mouseout="nav_user = false;nav_list = false;nav_admin= false;">
                        <div class="nav_index_left">
                            <ul>
                                <li>产品与服务</li>
                                <li>产品与服务</li>
                                <li>产品与服务</li>
                            </ul>
                        </div>
                        <div class="nav_index_right">
                            <div class="nav_fw_list_pd">
                                    <!-- 搜索内容 -->
                                    <el-input  v-model="nav_ls_search" suffix-icon="el-icon-search" placeholder="搜索产品名称、缩写（如：服务器等）"></el-input>
                                    <!-- 列表内容展示 -->
                                    <p>产品与服务</p>
                                    <div class="nav_list_scpcu">
                                        <span>产品与服务</span>
                                        <ul>
                                            <li>容器服务</li>
                                            <li>容器服务</li>
                                            <li>容器服务</li>
                                            <li>容器服务</li>
                                            <li>容器服务</li>
                                        </ul>
                                    </div>
                                    <div class="nav_list_scpcu">
                                        <span>产品与服务</span>
                                        <ul>
                                            <li>容器服务</li>
                                            <li>容器服务</li>
                                            <li>容器服务</li>
                                            <li>容器服务</li>
                                            <li>容器服务</li>
                                        </ul>
                                    </div>
                                    <div class="nav_list_scpcu">
                                        <span>产品与服务</span>
                                        <ul>
                                            <li>容器服务</li>
                                            <li>容器服务</li>
                                            <li>容器服务</li>
                                            <li>容器服务</li>
                                            <li>容器服务</li>
                                        </ul>
                                    </div>
                                    <div class="nav_list_scpcu">
                                        <span>产品与服务</span>
                                        <ul>
                                            <li>容器服务</li>
                                            <li>容器服务</li>
                                            <li>容器服务</li>
                                            <li>容器服务</li>
                                            <li>容器服务</li>
                                        </ul>
                                    </div>
                                </div>
                        </div>  
                        </div>
                       </el-collapse-transition>
                        
                        </li>
                    </ul>
                 </div>
                
            </div>
            <!-- 右边内容模块 -->
            <div class="nav_right">
                <ul>
                    <li><el-input placeholder="搜索" suffix-icon="el-icon-search"  v-model="nav_rs_search"></el-input></li>
                    <li>购物车</li>
                    <li>工单</li>
                    <!-- 费用 -->
                    <li class="nav_user_info padding" @mouseover="nav_user = true;">费用 <i class="el-icon-arrow-down"></i>
                       <!-- 费用信息 -->
                        <el-collapse-transition>
                            <div class="nav_user_content" v-show="nav_user"  @mouseout="nav_user = false">
                                <div class="nav_user_pd">
                                <span class="nav_user_ye">账户余额：</span>  
                                <!-- 账户余额@充值 -->
                                <div class="nav_user_money">
                                    <div class="nav_user_modj">
                                        <span>¥ <em>0</em>.00</span>
                                        <span>代金券：0张</span>
                                    </div>
                                    <el-button type="warning" @click="nav_user_li">充值</el-button>
                                </div>
                                <!-- 账号信息 -->
                                <div class="nav_user_Account">
                                    <ul>
                                        <li @click="nav_user_li">账号信息</li>
                                        <li @click="nav_user_li">费用中心</li>
                                        <li @click="nav_user_li">联系客服</li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                    </el-collapse-transition>
                    </li>
                    <!-- 消息 -->
                    <li @click="nav_user_li">消息 <i class="el-icon-arrow-down"></i></li>
                    <!-- 账号信息 -->
                    <li class="nav_user_info" @mouseover="nav_admin = true;">
                        <img src="../../assets/logo.png">
                        <span>{{username}}</span>
                        <i class="el-icon-arrow-down"></i>
                        <!-- 账号信息 -->
                        <el-collapse-transition>
                            <div class="nav_right_content" v-show="nav_admin"  @mouseout="nav_admin = false">
                                <div class="nav_user_pd">
                                    <span><i class="el-icon-warning"></i> 实名认证，
                                        <em v-if="authzt.authStatus == 3" @click="nav_next_link('user_Authen')">审核中</em>
                                        <em v-else-if="authzt.authStatus == 1">已认证</em>
                                        <em v-else @click="nav_next_link('user_Authen')">立即认证</em>
                                    </span>
                                    <!-- <div class="nav_user_Account">
                                        <ul>
                                            <li>账号信息</li>
                                        </ul>
                                    </div> -->
                                </div>
                                <!-- 退出登录 -->
                                <div class="nav_admin_prev" @click="nav_next_login('Login')">退出</div>
                            </div>
                    </el-collapse-transition>
                    </li>
                </ul>
            
            </div>
        </section>
</template>
<style lang="less" scoped>
    section{
        width: 1903px;
        height:70px;
        background:rgba(46,52,65,1);
        clear: both;
        letter-spacing: 1px;
        cursor: pointer;
        .padding{
            padding: 0 10px;
        }
        // 左边模块样式
        .nav_left{
            float: left;
            padding: 0px 20px;
            //  width: 410px;
             height: 70px;
            .nav_left_fw{
                color:rgba(249,250,251,1);
                font-size:14px;
                font-family:Source Han Sans CN;
                height: 70px;
                ul{
                    margin: 0;
                    padding: 0;
                    display: inline-block;
                    margin-left: 30px;
                    li{
                        list-style-type: none;
                        float: left;
                        height: 70px;
                        line-height: 70px;
                        padding: 0 21px;
                        position: relative;
                    }
                }
                ul li:nth-child(2):hover{
                    background:rgba(57,64,81,1);
                }
            }
            img{
                width:134px;
                height:34px;
                vertical-align: top;
                padding: 18px 0px;
            }
            span{
                vertical-align: middle;
                margin-left: 30px;
                font-size:14px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(249,250,251,1);
                i{
                    vertical-align: middle;
                }
            }
            // 产品服务内容
            .nav_index_co1{
                width:958px;
                // height:458px;
                background:rgba(57,64,81,1);
                color: #fff;
                clear: both;
                position: absolute;
                left: 0;
                z-index: 111;
                .nav_index_left{
                    width: 137px;
                    float: left;
                    height: 492px;
                    margin-top: 45px;
                    border-right: 1px solid #455163;
                    ul{
                        padding: 0;
                        margin: 0;
                        // width: 120px;
                        // padding-top: 30px;
                        position: relative;
                        bottom: 18px;
                        li{
                            width: 96px;
                            font-size:14px;
                            font-weight:400;
                            text-align: center;
                            list-style-type: none;
                            height: 45px;
                            line-height: 45px;
                            margin-left: 0px;
                        }
                        li:hover{
                            background:rgba(56,126,232,1);
                        }
                    }
                }  
                .nav_index_right{
                    float:right;
                    width: 820px;
                    .nav_fw_list_pd{
                        padding: 30px 105px 30px 30px;
                         p{
                                width:100px;
                                font-size:16px;
                                font-weight:400;
                                color:rgba(249,250,251,1);
                                height: 30px;
                                line-height: 30px;
                            }
                        .nav_list_scpcu{
                            display: inline-block;
                            font-size: 14px;     
                            width: 166px;
                            span{
                               color:rgba(138,144,155,1);
                               margin-left: 0px !important;
                            }
                            ul{
                                margin: 0;
                                padding: 0;
                                margin-top: -20px;
                                li{
                                    list-style-type: none;
                                    background:rgba(69,78,99,1);
                                    color:rgba(255,255,255,1); 
                                    width:130px;
                                    height:36px; 
                                    line-height: 36px;
                                    padding: 0px 10px;
                                    margin-bottom: 15px;
                                }
                            }
                            ul li:hover{
                                background:rgba(56,126,232,1);
                            }
                            ul li:first-child{
                                margin-top: 10px;
                            }
                        }
                    }

                } 
            }
        }
        // 右边模块样式
        .nav_right{
            float: right;
            line-height: 70px;
            height: 70px;
            color: #fff;
            font-size: 14px;
            position: relative;
            z-index: 5;
            ul{
                margin: 0;
                padding: 0;
                height: 70px;
                li{
                    float: left;
                    list-style-type: none;
                    margin-left: 23px;
                    text-align: center;
                }
            }
            ul li:last-child{
                width: 170px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
            }
            .nav_user_info{
                position: relative;
                img{
                    width:30px;
                    height:30px;
                    background:rgba(193,207,229,1);
                    border-radius:50%;
                    vertical-align: middle;
                }
            }
            .nav_user_info:hover{
                background:rgba(57,64,81,1);
            }
            //用户名隐藏模块的样式
            .nav_right_content{
                background:rgba(57,64,81,1);
               .nav_user_pd span{
                    display: block;
                    text-align: center;
                    font-size: 12px;
                    color: rgba(249,250,251,1);
                    height: 15px;
                    line-height: 15px;
                    margin-bottom: 20px;
                    i{
                        color:#EB7705;
                    }
                    em{
                        color:#EB7705;
                    }
                }
                .nav_user_Account{
                    font-size:14px;
                    clear: both;
                    height: 20px;
                    line-height: 50px;
                    ul{
                        margin: 0;
                        padding: 0;
                        height: 0px;
                        li{
                            list-style-type: none;   
                            text-align: center;
                            width: 96px;
                        }
                    }
                }
                .nav_admin_prev{
                    height:40px;
                    line-height: 40px;
                    font-size:14px;
                    background:rgba(49,55,69,1);
                    text-align: center;
                }
                .nav_admin_prev:hover{
                    opacity: .5;
                    z-index: 0;
                    color: #fff;
                }
            }
            //消息隐藏模块的样式
            .nav_user_content{
                height:200px;
                background:rgba(57,64,81,1);
                position: absolute;
                right:0px;
                .nav_user_pd{
                  padding: 20px 10px 0px;
                }
                .nav_user_ye{
                    text-align: left;
                    font-size: 14px;
                    margin-bottom: 20px;
                }
                span{
                    display: block;
                    text-align: right;
                    font-size: 12px;
                    color: rgba(249,250,251,1);
                    height: 15px;
                    line-height: 15px;
                    i{
                        color:#EB7705;
                    }
                    em{
                        color:#EB7705;
                    }
                }
                .nav_user_money{
                    width: 350px;
                    clear: both;
                    font-size: 14px;
                    height: 95px;
                    .nav_user_modj{
                        float: left;
                      span{
                        text-align: left;
                        height: 40px;
                        line-height: 40px;
                      }
                    }
                    button{
                        float:right;
                    }
                }
                .nav_user_money span:nth-child(1) em{
                    font-size: 28px;
                    font-family:Helvetica85-Heavy;
                    font-weight:800;  
                    color: #fff;  
                }
                .nav_user_money span:nth-child(2){
                   color: #EB7705;
                }
                .nav_user_Account{
                    font-size:14px;
                    clear: both;
                    height: 50px;
                    line-height: 50px;
                    ul{
                        margin: 0;
                        padding: 0;
                        height: 0px;
                        li{
                            list-style-type: none;   
                            margin-left: 0px;
                            text-align: center;
                            width: 115px;
                        }
                    }
                }
                .nav_user_Account ul li:first-child{
                    text-align: left;
                }
                .nav_user_Account ul li:last-child{
                    padding: 0px;
                }
                .nav_user_Account ul li:nth-child(3){
                    color: #387EE8;
                    text-align: right;
                }
                .nav_admin_prev{
                    // width:352px;
                    height:40px;
                    line-height: 40px;
                    font-size:14px;
                    background:rgba(49,55,69,1);
                    text-align: center;
                }
                .nav_admin_prev:hover{
                    opacity: .5;
                    z-index: 0;
                    color: #fff;
                }
            }
        }
    }
</style>
<style>
.nav_left .el-input{
    width: 97%;
}
.nav_left .el-button{
    width:88px;
    height:40px;
    border-radius:2px;
    letter-spacing: 1px;
}
.nav_left .el-input__inner,.nav_right .el-input__inner{
    background:rgba(57,64,81,1);
    border:1px solid rgba(72,81,101,1);
    color: #fff;
}
.nav_left .el-input__inner::-webkit-input-placeholder{ /* WebKit browsers */
    color: #7C828D;
    letter-spacing: 2px;
}
.nav_left .el-input__inner:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #7C828D;
    letter-spacing: 2px;
}
.nav_left .el-input__inner::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #7C828D;
    letter-spacing: 2px;
}
.nav_left .el-input__inner:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #7C828D;
    letter-spacing: 2px;
}
</style>
<script>
export default {
    data (){
        return {
            // 产品搜索框
            nav_ls_search:"",
            //代码搜索框
            nav_rs_search:"",
            nav_list:false,
            nav_user:false,
            nav_admin:false,
            username:sessionStorage.getItem("username"),
            //存储是否认证的状态值
            authzt:[],
        }
    },
    mounted(){
        //登录进来判断是否认证成功，显示在用户名字移入时
       let that = this;
       that.post(that.$store.state.aip+'customerInfo/getAuthStausByloginName',{
            loginName:sessionStorage.getItem('email'),
            email:sessionStorage.getItem('email'),
            tel:sessionStorage.getItem('email'),
         }).then((res)=>{
             if(res.code == 20000){
                 that.authzt = res.data;
            }else{
                 that.$message.error(res.message);
           }
        });  
    }, 
    methods:{
        //跳转相应的路由页面
        nav_next_link(name){
            this.$router.push({path:name});   
            sessionStorage.setItem("index",1);
        },
        //退出登录
        nav_next_login(name){
            this.$router.push({path:name});  
            sessionStorage.removeItem("index");  
            sessionStorage.removeItem("link");
            this.$cookies.remove('DOCUMENT_DOMAIN', null, DOCUMENT_DOMAIN)
        },
        nav_user_li(){
            this.$message.error("功能暂未开放，请持续关注！"); 
        },
    }
}
</script>