<template>
    <div>
      <!-- 头部模块 -->
      <Navindex></Navindex>
      <!-- 头部详情步骤 -->
      <div class="product_details_nav">
          <div class="product_details_title">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>计算</el-breadcrumb-item>
                <el-breadcrumb-item>服务器</el-breadcrumb-item>
                <el-breadcrumb-item>普通服务器</el-breadcrumb-item>
                <!-- :to="{ path: '/' }" -->
              </el-breadcrumb>
          </div>
      </div>
      <!-- 中间内容部分开始 -->
      <div class="product_details_content">
          <!-- 产品-->
          <div class="product_details_left">
              <div class="product_list_type">{{name}}</div>
                    <div class="product_list_width">
                        <!-- 区域 -->
                        <div class="product_list_chetd">
                            <span>区域</span>
                            <div class="product_list_text" v-for="(item,index) in user_info.houses.options" :key="index">
                                <ul>
                                    <li>{{item.children}}</li>
                                </ul>
                            </div> 
                        </div>
                        <!-- 计费模式 -->
                        <div class="product_list_chetd">
                            <span>计费模式</span>
                            <div class="product_list_text">
                                <ul>
                                    <li>包年包月</li>
                                </ul>
                            </div> 
                        </div>
              </div>
          </div>

          <!-- 右边内容模块-->
          <!-- <div class="product_details_right">
              <p>精选产品<el-tag type="warning">热门</el-tag></p>
              <div class="product_list_missing">
                    <ul>
                        <li>活动1：新用户享受现有代理等级折扣后，再享 8.5折优惠</li>
                        <li>活动2：IKG全线产品，无门槛，1000元代金券</li>
                        <li>活动2：IKG全线产品，无门槛，1000元代金券</li>
                        <li>活动2：IKG全线产品，无门槛，1000元代金券</li>
                        <li>活动2：IKG全线产品，无门槛，1000元代金券</li>
                    </ul>
                    <p>规格 
                         <el-select v-model="value" placeholder="请选择">
                        <el-option  v-for="item in options" :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    </p>
                    <p><em>200</em>元/月</p>
                    <p><el-button type="primary">立即购买</el-button> </p>
              </div>
              <div class="product_list_missing">
                    <ul>
                        <li>活动1：新用户享受现有代理等级折扣后，再享 8.5折优惠</li>
                        <li>活动2：IKG全线产品，无门槛，1000元代金券</li>
                        <li>活动2：IKG全线产品，无门槛，1000元代金券</li>
                        <li>活动2：IKG全线产品，无门槛，1000元代金券</li>
                        <li>活动2：IKG全线产品，无门槛，1000元代金券</li>
                    </ul>
                    <p>规格 
                        <el-select v-model="value" placeholder="请选择">
                        <el-option  v-for="item in options" :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    </p>
                    <p><em>200</em>元/月</p>
                    <p><el-button type="primary">立即购买</el-button> </p>
              </div>

          </div> -->

           <!-- 服务器配置-->
          <div class="product_details_left">
            <div class="product_list_type">服务器配置</div>
            <div class="product_list_width">
                <!-- CPU -->
                <span class="product_type">CPU</span>
                <div class="product_list_chetd">
                    <span>型号</span>
                    <div class="product_list_text" v-for="(item,index) in user_info.config[3].configs.models" :key="index">
                        <ul>
                            <li>{{item.values}}</li>
                        </ul>
                    </div> 
                </div>
                <!-- 计费模式 -->
                <div class="product_list_chetd product_list_two">
                    <span>核数</span>
                    <div class="product_list_text">
                        <ul>
                            <li>4</li>
                            <li>5</li>
                            <li>36</li>
                        </ul>
                    </div> 
                </div>
            
                <!-- 内存 -->
                <div class="product_list_width">
                    <span class="product_type">内存</span>
                    <!-- 内存 -->
                    <div class="product_list_chetd">
                        <span>类型</span>
                        <div class="product_list_text">
                            <ul>
                                <li>DDR3</li>
                                <li>DDR3</li>
                            </ul>
                        </div> 
                    </div>
                    <!-- 容量 -->
                    <div class="product_list_chetd product_list_two">
                        <span>容量</span>
                        <div class="product_list_text">
                            <ul>
                                <li>16GB</li>
                                <li>16GB</li>
                                <li>16GB</li>
                            </ul>
                        </div> 
                    </div>   
                </div>

                <!-- 硬盘 -->
                <div class="product_list_width">
                <span class="product_type">硬盘</span>
                <!-- 硬盘 -->
                <div class="product_list_chetd">
                    <span>接口</span>
                    <div class="product_list_text">
                        <ul>
                            <li>SATA</li>
                            <li>SAS</li>
                        </ul>
                    </div> 
                </div>
                    <!--类别 -->
                <div class="product_list_chetd">
                    <span>类别</span>
                    <div class="product_list_text">
                        <ul>
                            <li>HDD</li>
                            <li>SSD</li>
                        </ul>
                    </div> 
                </div>
                <!-- 容量 -->
                <div class="product_list_chetd ">
                    <span>容量</span>
                    <div class="product_list_text">
                        <ul>
                            <li>16GB</li>
                            <li>16GB</li>
                            <li>16GB</li>
                        </ul>
                    </div> 
                </div>  
                <!-- 规格 -->
                    <div class="product_list_chetd ">
                    <span>规格</span>
                    <div class="product_list_text">
                        <ul>
                            <li>16GB</li>
                            <li>16GB</li>
                            <li>16GB</li>
                        </ul>
                    </div> 
                </div>   
                <!-- 用途 -->
                    <div class="product_list_chetd product_list_two">
                    <span>用途</span>
                    <div class="product_list_text">
                        <ul>
                            <li>16GB</li>
                            <li>16GB</li>
                        </ul>
                    </div> 
                </div>   
                </div>

                <!-- 机箱 -->
                <div class="product_list_width">
                <span class="product_type">机箱</span>
                <!-- 机箱 -->
                <div class="product_list_chetd">
                    <span>类型</span>
                    <div class="product_list_text">
                        <ul>
                            <li>SATA</li>
                            <li>SSD</li>
                        </ul>
                    </div> 
                </div>
                <!-- 用途 -->
                <div class="product_list_chetd ">
                    <span>用途</span>
                    <div class="product_list_text">
                        <ul>
                            <li>桌面</li>
                            <li>桌面</li>
                        </ul>
                    </div> 
                </div>  
                <!-- 内存扩展能力 -->
                    <div class="product_list_chetd product_height_reast">
                    <span>内存扩展能力</span>
                    <div class="product_list_text">
                        <span>插槽数</span>
                        <ul>
                            <li>1</li>
                            <li>2</li>
                        </ul>
                    </div> 
                        <div class="product_list_text product_width_reast">
                        <span>最大容量</span>
                        <ul>
                            <li>12G</li>
                            <li>32G</li>
                        </ul>
                    </div> 
                </div>   
                <!-- 硬盘扩展能力 -->
                    <div class="product_list_chetd product_height_reast">
                    <span>硬盘扩展能力</span>
                    <div class="product_list_text">
                        <span>插槽数</span>
                        <ul>
                            <li>1</li>
                            <li>2</li>
                        </ul>
                    </div> 
                        <div class="product_list_text product_width_reast">
                        <span>最大容量</span>
                        <ul>
                            <li>12G</li>
                            <li>32G</li>
                        </ul>
                    </div> 
                </div>   
                <!-- 网卡扩展能力 -->
                    <div class="product_list_chetd">
                    <span>网卡扩展能力</span>
                    <div class="product_list_text">
                        <ul>
                            <li class="hvr-overline-from-left">2</li>
                            <li class="hvr-overline-from-left">3</li>
                        </ul>
                    </div> 
                </div>   
                </div>

              </div>
          
          </div>

          <!-- 网络配置-->
          <div class="product_details_left">
              <div class="product_list_type">网络配置</div>
                     <!-- 带宽 -->
                     <div class="product_list_width">
                        <span class="product_type">带宽</span>
                        <!-- 类型 -->
                        <div class="product_list_chetd">
                            <span>类型</span>
                            <div class="product_list_text">
                                <ul>
                                    <li>DDR3</li>
                                    <li>DDR3</li>
                                </ul>
                            </div> 
                        </div>
                        <!-- 大小 -->
                        <div class="product_list_chetd">
                            <span>大小</span>
                            <div class="product_list_text">
                                <ul>
                                    <li>16GB</li>
                                    <li>16GB</li>
                                    <li>16GB</li>
                                </ul>
                            </div> 
                        </div>   

                     <!-- IP -->
                     <div class="product_list_width">
                       <span class="product_type">IP</span>
                        <div class="product_list_chetd">
                            <span>IP</span>
                            <div class="product_list_text">
                                <el-checkbox v-model="checked">随机分配</el-checkbox>
                                <el-checkbox v-model="checked">
                                    选择IP段&nbsp;&nbsp;
                                </el-checkbox>
                                 <el-select v-model="value" placeholder="请选择IP" slot="apped">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </div> 
                        </div>
                        <!-- IP个数 -->
                         <div class="product_list_chetd">
                            <span>IP个数：</span>
                            <div class="product_list_text IPsize">
                                 <el-input type="primary" clearable v-model="IPsize"></el-input>
                            </div> 
                        </div>   
                     </div>

              </div>
          </div>

         <!-- 库存通知 -->
         <div class="Inventory_to_inform">
              <span class="Inventory_one">您购买的配置暂无库存，系统已提交您的需求，我们将尽快为您提供相关服务！</span>
              <span class="Inventory_two"><el-checkbox v-model="checked2">有库存通知</el-checkbox> </span>
         </div>


          <!-- 可选机器-->
         <div class="product_details_left">
            <div class="product_list_type product_list_bo_none">可选机器</div>
                <div class="product_list_machine">
                        <ul>
                            <li><el-checkbox v-model="checked">随机选择</el-checkbox></li>
                            <li><el-checkbox v-model="checked">随机选择</el-checkbox></li>
                            <li><el-checkbox v-model="checked">随机选择</el-checkbox></li>
                            <li><el-checkbox v-model="checked">随机选择</el-checkbox></li>
                        </ul>
                </div>
            </div>    
        </div> 
     
     <!-- 确认配置 -->
     <div class="product_details_configuration">
         <div class="product_details_wdith">
             <div class="product_purchase_time">
                  购买时长 <el-select v-model="value" placeholder="请选择" slot="apped">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                 </el-select>
             </div>
            <!-- 确认按钮 -->
             <div class="product_submit">
                <el-button type="primary" @click="add_Confirm">确认配置</el-button>
             </div>

         </div>
     </div>


    </div>
</template>
<style>
 .el-breadcrumb__item:last-child .el-breadcrumb__inner{
    font-weight: 700 !important;
    color: #303133 !important;
 }
 .IPsize .el-input{
     width: 206px;
 }
 .el-select .el-input__inner,.IPsize .el-input__inner{
     border-radius: 2px;
 }
.product_list_machine .el-checkbox{
    width: 663px;
}
 .product_details_right p .el-tag{
    margin-left: 10px;
    height: 25px;
    line-height: 25px;
    border:1px solid rgba(255,167,120,1);
 }
</style>
<style lang="less" scoped>
    .product_details_nav{
        width:1902px;
        height:52px;
        line-height: 52px;
        background:rgba(255,255,255,1);
        border-radius:2px 2px 0px 0px;
        .product_details_title{
            width: 1630px;
            margin: 0 auto;
            .el-breadcrumb{
              height:52px;
              line-height: 52px;
              cursor: pointer;
              color:rgba(163,173,195,1);
              
            }
        }
    }
    // 中间内容部分样式
    .product_details_content{
        width:1630px;
        margin: 10px auto;
        height: 2010px;
        clear: both;
        // 左边模块样式
        .product_list_bo_none{
            border-bottom: none !important;
        }
        .product_width_reast,.product_list_machine{
            width: 690px !important;
        }
        .product_height_reast{
            height: 100px !important;
        }
        //库存通知样式
        .Inventory_to_inform{
            width:1200px;
            height:34px;
            line-height: 34px;
            font-size: 12px;
            margin:10px 0px 20px;
            float: left;
            .Inventory_one{
                letter-spacing: 1px;
                color:rgba(255,147,95,1);
                text-align: center;
                width:1080px;
                float: left;
                background:rgba(255,247,235,1);
                border:1px solid rgba(255,167,119,1);
            }
           .Inventory_two{
               float:right;
           }
        }
        
        .product_details_left{
            width:1220px;
            float: left;
            background:rgba(255,255,255,1);
            box-shadow:0px 0px 9px 0px rgba(79,79,79,0.2);
            margin-bottom: 10px;
            // 可选机器样式
            .product_list_machine{
                border: 1px solid rgba(221,229,235,1);
                margin: 0px auto 40px;
                ul{
                     margin: 0;
                     padding: 0;
                    li{
                        font-size:12px;
                        font-family:Source Han Sans CN;
                        font-weight:300;
                        color:rgba(79,79,79,1);
                        list-style-type: none;
                        height: 40px;
                        line-height: 40px;
                        letter-spacing: 1px;
                        border-bottom: 1px solid rgba(221,229,235,1);
                        padding: 0px 10px;
                    }
                }
            }
            .product_list_machine ul li:hover{
                cursor: pointer;
                background:rgba(235,243,251,1);
            }
            .product_list_machine ul li:last-child{
                border: none;
            }
           .product_list_type{
                margin: 0 auto;
                font-size: 14px;
                height: 50px;
                width: 1100px;
                line-height: 50px;
                color:rgba(79,79,79,1);
                border-bottom: 1px solid rgba(221,229,235,1);
           }
           .product_list_two{
               border-bottom:1px solid rgba(221,229,235,1);
           }
           .product_list_two_width{
                width:790px !important;
           }
           .product_list_width{
                margin: 0 auto;
                font-size: 14px;
                width: 990px;
                color:rgba(137,137,137,1);
                padding: 12px 0px;
                .product_type{
                    color: #4F4F4F;
                    float: left;
                    height: 60px;
                    width: 50px;
                    font-weight: 550;
                    line-height: 60px;
                }
                .product_list_chetd{
                    width: 890px;
                    height: 50px;
                    margin: 0 auto;
                    span{
                        float: left;
                        height: 32px;
                        line-height: 32px;
                        width: 100px;
                    }
                    .product_list_text{
                        width: 780px;
                        margin: 0 auto;
                        height: 35px;
                        span{
                            color:#4F4F4F;
                        }
                    }
                    ul{
                        height:32px;
                        li{
                            float: left;
                            width:102px;
                            text-align: center;
                            height:32px;
                            line-height: 32px;
                            list-style-type: none;
                            border:1px solid rgba(221,229,235,1);
                        }
                    }
                }
              .product_list_chetd ul li:nth-child(2),.product_list_chetd ul li:nth-child(3){
                   border-left: none;
               } 
              .product_list_chetd ul li:hover{
                  cursor: pointer;
                  background:rgba(232,240,250,1);
                  color:rgba(77,145,249,1);
                  transition: 0.3s ease-in-out;
                //   border: 1px solid rgba(77,145,249,1);
              }  
           }

        }
         //右边模块样式
         .product_details_right{
            width:402px;
            float: right;
            background:rgba(255,255,255,1);
            p{
                font-size: 14px;
                font-weight:400;
                color:rgba(80,80,80,1);
                width: 346px;
                margin: 20px auto;
            }
            .product_list_missing{
                width:344px;
                // height:463px;
                background:rgba(255,255,255,1);
                border:1px solid rgba(222,229,235,1);
                margin: 0px auto 20px;
                cursor: pointer;
                ul{
                    margin: 0;
                    padding: 10px;
                    li{
                        width:299px;
                        font-size:14px;
                        font-family:Source Han Sans CN;
                        font-weight:300;
                        color:rgba(102,102,102,1);
                        line-height:30px;
                        margin: 0 auto;
                        list-style-type: none;
                    }
                }
                .el-select{
                    margin-left: 10px;
                }
           
            }
            .product_list_missing ul li:hover{
                color: rgba(77,146,249,1);
            }
            .product_list_missing p:nth-child(2){
                text-align: center;
            }
          
             .product_list_missing p:nth-child(3){
                text-align: center;
                color: #8A8A8A;
                em{
                    color:rgba(254,113,75,1);
                    font-size: 30px;
                }
            }
            .product_list_missing p:nth-child(4){
                text-align: center;
                  margin-bottom: 20px;
                .el-button{
                    width:198px;
                    height:40px;
                    letter-spacing: 1px;
                    border-radius:2px;
                }
            }
         }
    }
    //底部确认配置样式
    .product_details_configuration{
        width:1901px;
        height:80px;
        line-height: 75px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(221,229,235,1);
        border-radius:2px 2px 0px 0px;
        .product_details_wdith{
            width: 1628px;
            margin: 0 auto;
            .product_purchase_time{
                font-size: 14px;
                color:rgba(79,79,79,1);
                width: 300px;
                display: inline-block;
                .el-select{
                    margin-left: 20px;
                    width: 120px;
                }
            }
            .product_submit{
                float: right;
                .el-button{
                  border-radius: 2px;
                }
            }
        }
    }
</style>
<script>
import test_data from './test.js';
console.log(test_data);
export default {
    data(){
        return {
            checked:true,
            checked2:false,
            //服务器数组配置
            // user_info:[],
            user_info:test_data.resourceConfig.config.config,
            //IP个数
            IPsize:"",
            //接受列表传入的id
            id:sessionStorage.getItem("id"),
            //产品名称
            name:"",
            //区域地址
            houses:[],
        }
    },
    mounted(){
         //请求获取产品列表
         let that = this;
        //  that.$store.state.aip
        //  that.get("http://10.3.9.24:8080/api-goods/goods/productMaster/"+that.id,{}).then((res)=>{
         that.get("http://10.3.9.24:8080/api-goods/goods/productMaster/0085809444eeb8a8a05acb8634a818f7",{}).then((res)=>{
                if(res.code == 20000){
                    that.user_info = JSON.parse(res.data.resourceConfig.config);
                    console.log (JSON.parse(res.data.resourceConfig.config))
                    that.name = res.data.name;
                }else{
                    that.$message.error(res.message);
                }
            });  
    },
    methods:{
        //确认配置
        proudct_add_Confirm(){

        },
    }
}
</script>