<template>
        <section class="nav_left_list">
            <p>账号信息</p>
            <ul>
                <li v-for="(item, index) in list" :class="{active:index==isShow}" :key="index"  
                @click="nav_router(index)"><i :class="item.img"></i> {{item.name}}</li>
            </ul>
        </section>
</template>
<style lang="less" scoped>
    //点击当前加上样式
   .active {
        background:rgba(49,55,69,1);
        color: #fff !important;
    }
    .nav_left_list{
        width:200px;
        height:1010px;
        background:rgba(57,64,81,1);
        float: left;
        cursor: pointer;
        p{
            color:rgba(164,173,195,1);
            font-size: 16px;
            padding: 20px;
            margin: 0;
        }
        ul{
            margin: 0;
            padding: 0;
            li{
                padding: 0px 20px;
                list-style-type: none;
                font-size: 14px;
                color:rgba(164,173,195,1);
                height: 45px;
                line-height: 45px;
                vertical-align: middle;
                img{
                    padding-right: 10px;
                    width:12px;
                    height:12px;
                }
            }
        }
        ul li:hover{
            background:rgba(49,55,69,1);
            color: #fff;
            transition: .3s linear;
        }
    }
</style>
<script>
export default {
    data (){
        return {
           list: [
                {img:"el-icon-document", name: "基本信息" },
                {img:"el-icon-edit-outline", name: "认证信息" },
            ],
            isShow: -1,
        }
    },
    mounted(){this.isShow = sessionStorage.getItem("index")},
    methods:{
        nav_router(index){
            let url; 
            index == 0 ? url = "user_information":"",
            index == 1 ? url = "user_Authen":"",
            index == 2 ? url = "user_message":"",
            sessionStorage.setItem("index",index);
            this.$router.push({name:url,path:url}); 
        }
    },
}
</script>