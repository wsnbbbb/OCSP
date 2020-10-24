<template>
 <div>
      <!-- 头部logo模块 -->
    <div id="login_nav">
        <div class="login_width">
            <!-- 左边内容 -->
            <img src="../../assets/logo.png">
            <span>控制台</span>
             <!-- 右边语言切换 -->
            <div class="login_text_drop">
                <div>首页</div>
                <div class="text_i18v" 
                @click="show_Language = !show_Language">
                    <span ref="names">中文简体</span>
                    <i v-if="show_Language == false" class="el-icon-caret-bottom"></i>
                    <i v-if="show_Language == true" class="el-icon-caret-top"></i>
                 </div>
                 <!-- 选择语言内容 -->
                 <transition name="el-zoom-in-top">
                    <div class="text_i18v_list" 
                    v-show="show_Language">
                        <ul>
                            <li v-for="(item,index) in Language_list" :key="index"
                             @click="openValue(item.name)">
                                {{item.name}}
                            </li>
                        </ul>
                       </div>
                 </transition>
            </div>
        </div>
   </div>
  
</div>
</template>
<style lang="less" scoped>
.el-icon-caret-bottom,.el-icon-caret-top{
    color:#9EA4AF;
    padding-left: 30px;
}
#login_nav{ 
    width:100%;
    height:70px;
    background:rgba(36,42,54,1);
    .login_width{
        width: 1200px;
        margin: 0 auto;
        line-height: 70px;
        clear: both;
        :hover{
            cursor: pointer;
        }
        img:nth-child(1){
            width:148px;
            height:38px;
            vertical-align: middle;
        }
        span:nth-child(2){
            font-size: 14px;
            color: #fff;
            position: relative;
            left: 15px;
            letter-spacing: 1px;
        }
    }
    .login_text_drop{
        float: right;
        div:nth-child(1){
          font-size: 14px;   
          display: inline-block;   
          color:rgba(255,255,255,1);
          margin-right: 15px;
        }
        .text_i18v{
            width:130px;
            height:30px;
            letter-spacing: 1px;
            border:1px solid rgba(95,106,129,1);
            position: relative;
            display: inline-block;
            line-height: 30px;
            font-size: 14px;
            cursor: pointer;
            span:nth-child(1){
                border: none;
                outline: none;
                background: transparent;
                font-weight:400;
                color: #DFE2E8;
                vertical-align: middle;
                padding-left: 10px;
            }
             img{
                position: absolute;
                right: 12px;
                top: 35%;
                width:14px;
             }
         }
          .text_i18v_list{
                width:130px;
                height:116px;
                background:rgba(40,48,65,1);
                margin-left: 49px;
                margin-top: -18px;
                font-size: 14px;
                ul{
                    padding: 0;
                    margin: 0;
                }
                ul li{
                    height: 36px;
                    cursor: pointer;
                    line-height: 36px;
                    list-style: none;
                    color: #DFE2E8;
                    text-align: left;
                    padding-left: 10px;
                   color:rgba(164,173,195,1);
                }
                ul li:hover{
                    background-color: #21293A;
                    color: #DFE2E8;
                }
            }
    }
}
</style>
<script>
export default {
     data(){
      return {
        //语言切换隐藏
        show_Language: false,
        //选择语言值
        Language_list:[{name:"中文简体"},{name:"中文繁体"},{name:"English"}],
      }
    },
    mounted(){},
    methods:{
        openValue(name,index){
            // this.$refs.names.innerText = name;
            this.show_Language = false;
            this.$message.error("功能暂未开放");
            // if(this.$i18n.locale=="en"){
			// 	this.$i18n.locale = "zh";
			// }else{
			// 	this.$i18n.locale = "en";
			// }

        },

    },
}
</script>