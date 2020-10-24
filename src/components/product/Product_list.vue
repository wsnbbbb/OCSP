<template>
 <div> 
     <!-- 头部模块 -->
      <Navindex></Navindex>
      <!-- 顶部购买区域 -->
      <div class="product_list_nav">
          <div class="product_list_slide">
                销售区域：
                <el-select v-model="quyu_val" size="medium"  placeholder="请选择" @change="coll_area" @visible-change="sales('sales-region/queryList')">
                    <el-option v-for="item in quyu" :key="item.value" :label="item.areaName" :value="item.areaId"></el-option>
                </el-select>
                CPU：
                <el-cascader :options="CPUs" size="medium" :props="defaultParams" v-model="CPU_val" collapse-tags @visible-change="sales('cpuprice/queryList')"  placeholder="请选择" clearable filterable>
                </el-cascader>
                内存：
                 <el-cascader size="medium" :options="memory" :props="defaultParams" v-model="memory_val"  collapse-tags @visible-change="sales('memoryprice/queryList')" placeholder="请选择" clearable filterable >
                      <template slot-scope="{ node, data }">
                        <span>{{ data.areaName }}</span>
                        <span v-if="!node.isLeaf"> ({{ data.length }}) </span>
                     </template>
                </el-cascader>
                硬盘：
                 <el-cascader   size="medium" :props="props"  placeholder="请选择" clearable filterable>
                </el-cascader>
                价格区间：
                <div class="product_number">
                 <el-input v-model="maxs" placeholder="请输入" clearable size="medium"></el-input>
                 <i class="el-icon-minus"></i>
                 <el-input v-model="mins" placeholder="请输入" clearable size="medium"></el-input>
                </div>
                <!-- 查询按钮 -->
                <el-button type="primary" size="medium">查 询</el-button>
           
          </div>
        <!-- 内容区域 -->
        <div class="product_list_content">
          <!-- 左边内容模块-->
          <div class="product_list_left">
              <!-- 分类条件 -->
               <div class="product_list_tab">
                   <div class="product_list_text">
                        <span @click="product_list('1')">综合</span>
                        <!-- <el-divider direction="vertical"></el-divider> -->
                        <!-- <span>销量 <i class="el-icon-d-caret"></i></span> -->
                        <el-divider direction="vertical"></el-divider>
                        <span @click="vertical_desc">价格 <i class="el-icon-d-caret"></i></span>
                   </div>
               </div>
               <!-- 列表展示 -->
               <div class="product_list_pd"  v-loading="loading" element-loading-text="内容加载中...">
                   <el-card shadow="hover" v-for="(item,index) in user_info" :key="index">
                        <div class="product_title_list">
                            <p>{{item.name}}</p>    
                            <span class="product_list_desc">{{item.description}}</span> 
                            <div class="product_list_shop">
                                <!-- <span><i class="el-icon-star-off"></i> 关注</span> -->
                                <span @click="add_details(item.id)"><i class="el-icon-setting"></i> 立即配置</span>
                            </div>
                        </div>
                 </el-card>
                </div> 

            <!-- 分页page -->
            <el-pagination background  :page-size="pageSize"  :current-page="currentPage"  :total="currentTotal" layout="total, prev, pager, next, jumper"> </el-pagination>
          </div>
          <!-- 右边内容模块 -->
          <!-- <div class="product_list_right">
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



            
        </div> 
       <!-- 底部内容模块-->
       <Allfooter></Allfooter> 
      </div>
 </div>
</template>
<style> 
    .product_number{
        width: 300px;
    }
    .product_number,.product_list_pd .el-card{
        display: inline-block;
    }
    .el-cascader{
        margin-right: 5px;
    }
    .el-select--medium{
        line-height: 30px;
    }
    .el-cascader__empty-text{
        color: #606266;
    }
    .product_number .el-input{
        width:30% !important;
    }
    .product_list_pd .el-card{
        border-radius: 0px;
        width: 216px;
        /* height: 196px; */
        border: none;
        margin-left: 16px;
        text-align: center;
    }
    .el-pagination{
        text-align: center;
    }
    .product_list_pd .el-card__body{
        padding: 0px;
        height: 127px;
    }
    .product_list_right p .el-tag{
        margin-left: 10px;
        height: 25px;
        line-height: 25px;
        border:1px solid rgba(255,167,120,1);
    }
 .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    font-weight: 700 !important;
    color: #303133 !important;
}
</style>
<style lang="less" scoped>
    .product_list_nav{
        width:1902px;
        height:52px;
        line-height: 52px;
        background:rgba(255,255,255,1);
        border-radius:2px 2px 0px 0px;
        .product_list_slide{
            width: 1668px;
            margin:0px auto 10px;
            font-size: 14px;
            color: #333;
            .product_select{
                width:120px;
                margin-right: 10px;
                line-height: 40px;
            }
        }
        // 左边模块样式
        .product_list_content{
            // width: 1630px;
            width: 1670px;
            margin: 0 auto;
            clear: both;
            height: 1000px;
            .product_list_desc{
                font-size: 13px;
            }
          .product_list_left{
            // width:1180px;
            width: 1630px;
            background:rgba(255,255,255,1);
            padding: 20px;
            float: left;
            .product_list_tab{
                // width:1180px;
                 width: 1630px;
                border-bottom:1px solid rgba(222,229,235,1);   
                height: 50px; 
                .product_list_text{
                    font-size: 14px;
                    font-weight:400;
                    color:rgba(80,80,80,1);
                    width: 200px;
                    border:1px solid rgba(224,224,224,1);
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                }
                .product_list_text span:hover{
                    cursor: pointer;
                    color: rgba(128,179,255,1);
                }
            }
            .product_list_pd{
                margin: 30px 0px ;
            }
            .product_title_list:hover{
                border:1px solid rgba(128,179,255,1);
                cursor: pointer;
                transition: .3s all;
             }
            .product_title_list .product_list_desc:hover{
                color: rgba(77,146,249,1);
            }
            .product_title_list{
                width:212px;
                // height:148px;
                background:rgba(255,255,255,1);
                border:1px solid rgba(222,229,235,1);
                display: inline-block;
                p{
                    width:212px;
                    height:40px;
                    background:rgba(232,241,250,1);
                    text-align: center;
                    font-size:14px;
                    color:rgba(80,80,80,1);
                    margin: 0px;
                    line-height: 40px;
                    border-bottom: 1px solid rgba(128,179,255,1);
                }
                .product_title_desc{
                    list-style-type: rgba(173,207,234,1);    
                    font-size:12px;
                    font-family:Source Han Sans CN;
                    font-weight:300;
                    color:rgba(138,138,138,1); 
                    height: 30px;
                    line-height: 30px;
                    text-align: left;
                    width: 160px;
                    height: 120px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .product_list_shop{
                    width:212px;
                    height:30px;
                    background:rgba(255,255,255,1);
                    border-top: 1px solid rgba(128,179,255,1);
                    color:rgba(80,80,80,1);
                    line-height: 30px;
                    text-align: center;
                    span{
                        font-size:12px;
                        width: 70px;
                        display: inline-block;
                    }
                }
                .product_list_shop span:nth-child(1):hover,.product_list_shop span:nth-child(2):hover{
                   color: rgba(77,146,249,1);
                }
            }
        }
        //右边模块样式
         .product_list_right{
            width:402px;
            float: right;
            background:rgba(255,255,255,1);
            p{
                font-size: 14px;
                font-weight:400;
                color:rgba(80,80,80,1);
                width: 346px;
                margin: 0 auto;
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
    }
</style>
<script>
let id = 0;
export default {
    data (){
        return {
            //总页数
            currentPage: 1,
            currentTotal: 0,
            pageSize:20,
            loading:false,
            index:0,
            //价格区间
            maxs:"",
            mins:"",
            //销售区域
            quyu:[],
            quyu_val:["1","2"],
            //CPU
            CPUs:[],
            CPU_val:"",
             defaultParams: {
                label: 'name',
                value: 'id',
                children: 'sub'
            },
            //内存
            memory:[],
            memory_val:"",
            //硬盘
            disk:[],   
            disk_val:"", 
            //列表数组
            user_info:[],
            //     {
            // value: 'zhinan',
            // label: '指南',
            // children: [{
            //     value: 'shejiyuanze',
            //     label: '设计原则',
            //     children: [{
            //     value: 'yizhi',
            //     label: '一致'
            //     }, {
            //     value: 'fankui',
            //     label: '反馈'
            //     }]
            // }, {
            //     value: 'daohang',
            //     label: '导航',
            //     children: [{
            //     value: 'cexiangdaohang',
            //     label: '侧向导航'
            //     }]
            // }]
            // }, ],
          props: {
                lazy: true,
                // multiple: true,
                lazyLoad (node, resolve) {
                    const { level } = node;
                    setTimeout(() => {
                      const nodes = Array.from({ length: level + 1 })
                        .map(item => ({
                        value: ++id,
                        label: this.CPU_val,
                        leaf: level >= 2
                        }));
                        resolve(nodes);
                    }, 600);
                }
                }
            };
    },
    mounted (){
        this.product_list();
    },
    methods:{
    //请求获取产品列表
    product_list(type){
        let that = this;
        type == 1 ?　that.loading = true : "";
        that.get(g.baseURL+'/api-goods/goods/productMaster/queryList',{}).then((res)=>{
            if(res.code == 20000){
                  that.loading = false;
                that.user_info = res.data.records;
                that.currentTotal = res.data.total;
            }else{
                that.$message.error(res.message);
            }
        });  
    },
    //价格升降序
    vertical_desc(){
        let that = this;
        let type;
         //升序 asc 降序 desc
         that.index ++;
         that.index % 2 == 0 ? type="asc" : type="desc";
         that.loading = true;
        that.get(g.baseURL+'/api-goods/goods/productMaster/queryList',{priceOrder:type}).then((res)=>{
            if(res.code == 20000){
                that.loading = false;
                that.user_info = res.data.records;
                that.currentTotal = res.data.total;
            }else{
                that.$message.error(res.message);
            }
        });  
    },
    //立即配置
    add_details(id){
        console.log(id);
        let that = this;
        that.$router.push({ path: "/Product_details"});
        sessionStorage.setItem("id",id);
    },
    //销售区域查询
     coll_area(val){
           let that = this;
           that.loading = true;
            that.get(g.baseURL+'/api-goods/goods/productMaster/queryList',{salesRegionId:val}).then((res)=>{
                if(res.code == 20000){
                    that.loading = false;
                    that.user_info = res.data.records;
                    that.currentTotal = res.data.total;
                }else{
                    that.$message.error(res.message);
                }
        });  
      },

    //触发下拉统一查询条件
    sales(api){
         let that = this;
         that.get(g.baseURL+'/api-goods/goods/'+api,{}).then((res)=>{
            if(res.code == 20000){
                that.quyu = res.data;
                //cpu
                that.CPUs = res.data;
                console.log(that.CPUs)
                //内存
                that.memory = res.data;
                //硬盘
                that.disk = res.data;
            }else{
                that.$message.error(res.message);
            }
        });  
    },
    },
}
</script>