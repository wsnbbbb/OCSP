<template>
  <div>
    <!-- 头部模块 -->
    <Navindex></Navindex>
    <!-- 左边模块 -->
    <Navleft></Navleft>
    <!-- 中间内容模块 -->
    <section class="user_authen_content">
      <p>认证信息</p>
      <div class="user_authen_rz">
          <!-- 企业认证 -->
          <div class="user_authen_pdd">
              <p></p>
              <div>
                  <img src="../../assets/authr/qyrz.png">
                  <span>企业认证</span>
              </div>
              <div>
                  <ul>
                      <li>适用于企业、政府</li>
                      <li>事业单位</li>
                      <li>社会团体、个体工商户等</li>
                      <li>账号归属企业</li>
                  </ul>
              </div>
              <div>
                <el-button type="warning" v-if="user_info.authStatus == 3&& user_info.authType == 5" @click="user_link('user_enterprise',1)">审核中</el-button>    
                <el-button type="success" disabled v-else-if="user_info.authStatus == 1&& user_info.authType == 5">已认证</el-button>
                <el-button type="danger" v-else-if="user_info.authStatus == 2&& user_info.authType == 5"  @click="user_link('user_enterprise')">审核失败,重新认证</el-button>
                <el-button type="primary" :disabled="disabled5" v-else @click="user_link('user_enterprise')" >立即认证</el-button>
              </div>
          </div>
            <!-- 个人认证 -->
            <div class="user_authen_pdd">
              <p class="user_none"></p>
              <div class="user_padding_whax">
                  <img src="../../assets/authr/grz.png">
                  <span>个人认证</span>
              </div>
              <div>
                  <ul>
                      <li>适用于个人用户</li>
                      <li>账号归属个人</li>
                  </ul>
              </div>
              <div>
                <el-button type="warning"  v-if="user_info.authStatus == 3 && user_info.authType == 1" @click="user_link('user_Persoals',2)">审核中</el-button>    
                <el-button type="success" disabled v-else-if="user_info.authStatus == 1&& user_info.authType == 1">已认证</el-button>
                <el-button type="danger"  v-else-if="user_info.authStatus == 2&& user_info.authType == 1" @click="user_link('user_Personal')">审核失败,重新认证</el-button>
                <el-button type="primary" :disabled="disabled1" v-else @click="user_link('user_Personal')" >立即认证</el-button>
              </div>
          </div>
      </div>  
    </section>
 </div>
</template>
<style lang="less" scoped>
    .user_authen_content{
        padding: 0px 0px 0px 20px;
        width: 1670px;
        margin-left: 200px; 
        p{
            font-size:14px;
            font-weight:400;
            color:rgba(164,173,195,1); 
            height: 50px;
            line-height: 50px;
        }
        .user_authen_rz{
            width:1198px;
            // height:438px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(222,229,235,1);
            .user_authen_pdd:nth-child(2){
                border-bottom: none;
            }
            .el-button+.el-button{
                margin-left: 0px;
            }
            .user_authen_pdd{
                width: 1130px;
                margin: 0 auto;
                height: 212px;
                border-bottom: 1px solid rgba(224,224,224,1);
                p{
                    width:1140px;
                    height:30px;
                    background:rgba(216,229,243,1);
                    border:1px solid rgba(188,209,236,1);
                }
                .user_padding_whax{
                    padding:30px 0px;
                }
                div{
                    width: 200px;
                    display: inline-block;
                    letter-spacing: 2px;
                    ul{
                        li{
                            color:rgba(138,138,138,1);
                            font-size: 12px;
                            height: 30px;
                            line-height: 30px;
                        }
                    }
                }
            }
            .user_authen_pdd div:nth-child(4){
                text-align: center;
                float: right;
                line-height:150px;
                button{
                    // width: 96px;
                    border-radius:2px;
                }
            }
            .user_authen_pdd div:nth-child(2){
                text-align: center;
                span{
                    font-size:16px;
                    font-family:Source Han Sans CN;
                    font-weight:600;
                    color:rgba(80,80,80,1);
                    display: block;
                    padding-top: 10px;
                }
            }
            .user_authen_pdd:last-child{
                border:none;
            }
            .user_authen_pdd .user_none{
                display: none;
            }
        }
    }
</style>
<script>
export default {
    data (){
        return {
            //存储状态码判断按钮 
            user_info:[],
            disabled1:false,
            disabled5:false,
        }
    },
    mounted(){
         //请求拿到用户信息
         let that = this;
         that.post(that.$store.state.aip+'customerInfo/getAuthStausByloginName',{
            loginName:sessionStorage.getItem('email'),
            email:sessionStorage.getItem('email'),
            tel:sessionStorage.getItem('email'),
         }).then((res)=>{
                if(res.code == 20000){
                    that.user_info = res.data;
                    // authType == 1 企业锁住,放开个人认证 
                    switch(res.data.authType) {
                        case 1:
                        that.disabled5 = true;
                        that.disabled1 = false;
                        break;
                        case 5:
                        that.disabled5 = false;
                        that.disabled1 = true;
                        break;
                        default:
                        that.disabled5 = false;
                        that.disabled1 = false;
                    }
                    switch(res.data.authStatus) {
                        case 2:
                        that.disabled5 = false;
                        that.disabled1 = false;
                        break;
                    }
                }else{
                    that.$message.error(res.message);
                }
            });  
    },
    methods :{
        //跳转到相应的认证页面
        user_link(name,index){
            //存储审核中状态直接跳转到认证第三步
            sessionStorage.setItem("steps",index);
            this.$router.push({path:name}); 
        }
    }
}
</script>