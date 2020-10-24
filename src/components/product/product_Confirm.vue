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
          <!-- 左边内容模块 -->
          <div class="product_details_left">
              <div class="product_list_type">配置清单</div>
                    <div class="product_list_width">
                        <span>CPU：<em>E5 8核</em></span>
                        <span>内存：<em>8GB</em></span>
                        <span>硬盘：<em>8GB</em></span>
                        <span>IP：&nbsp;&nbsp;&nbsp;&nbsp;<em>8GB</em></span>
                        <span>带宽：<em>10m</em></span>    
              </div>
          </div>

          <!-- 右边内容模块-->
          <div class="product_confirm_right">
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
          </div>
      </div>   
     
     <!-- 预估价格 -->
     <div class="product_details_configuration">
         <div class="product_details_wdith">
             <div class="product_purchase_time">
                  购买个数 <span>¥</span><span>8000.00</span>
             </div>
             <div class="product_purchase_time">
                  购买个数  <el-input-number size="small" v-model="num3"></el-input-number>
             </div>
            <!-- 确认按钮 -->
             <div class="product_submit">
                <el-button type="primary" plain>加入购物车</el-button>
                <el-button type="primary">购买</el-button>
             </div>

         </div>
     </div>

    </div>
</template>
<style>
.el-breadcrumb__item:last-child .el-breadcrumb__inner {
    font-weight: 700 !important;
    color: #303133 !important;
}
 .el-select .el-input__inner{
     border-radius: 2px;
 }
 .product_confirm_right p .el-tag{
        margin-left: 10px;
        height: 25px;
        line-height: 25px;
        border:1px solid rgba(255,167,120,1);
 }
 .product_purchase_time  .el-input--small .el-input__inner{
       color:rgba(253,113,75,1) !important;
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
        height: 909px;
        clear: both;
        // 左边模块样式
        .product_details_left{
            width:1220px;
            float: left;
            height: 909px;
            background:rgba(255,255,255,1);
            box-shadow:0px 0px 9px 0px rgba(79,79,79,0.2);
            margin-bottom: 10px;
             .product_list_type{
                margin: 0 auto;
                font-size: 14px;
                height: 50px;
                width: 1100px;
                line-height: 50px;
                color:rgba(79,79,79,1);
                border-bottom: 1px solid rgba(221,229,235,1);
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
                span{
                        height: 40px;
                        line-height: 40px;
                        display:block;
                        color: #898989;
                        em{
                            margin-left: 10px;
                            color: #4F4F4F;
                            font-weight:550;
                            vertical-align: middle;
                        }
                    }
             }
        }
        
        //右边模块样式
        .product_confirm_right{
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
        // position: fixed;
        // bottom: 0;
        // right: 0;
        .product_details_wdith{
            width: 1628px;
            margin: 0 auto;
            .product_purchase_time{
                font-size: 14px;
                color:rgba(79,79,79,1);
                width: 300px;
                display: inline-block;
                .el-input-number{
                    margin-left: 20px;
                }
                span{
                    color: #FD714B;
                    font-size: 30px;
                    letter-spacing: 2px;
                }
              
            }
            .product_purchase_time span:nth-child(1){
                font-size: 12px;
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
export default {
    data(){
        return {
            checked:true,
             num3: 1,
        }
    },
    mounted(){

    },
    methods:{

    }
}
</script>