<template>
 <div>
    <!-- 头部模块 -->
    <Navindex></Navindex>
    <!-- 左边模块 -->
    <Navleft></Navleft>
    <!-- 中间内容模块 -->
    <section class="user_message_content">
        <p>消息列表</p>
        <!-- 筛选条件模块 -->
        <div class="user_ms_scrch">
            <el-radio-group v-model="radio1">
                <el-radio-button label="未读消息"></el-radio-button>
                <el-radio-button label="已读消息"></el-radio-button>
                <el-radio-button label="全部消息"></el-radio-button>
            </el-radio-group>
             <el-select v-model="value" style="width:100px"  placeholder="标记为">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <!-- 搜索内容 -->
            <el-input v-model="serch_message" style="width:200px"  clearable placeholder="请输入消息名称"></el-input>
            <el-button type="primary" :loading="loading">查询消息</el-button>
            <el-button type="danger">删除消息</el-button>  
         </div>  
        <!-- 表格模块开始 -->
        <div class="user_ms_table">
         <el-table
            ref="multipleTable" :header-cell-style="{background:'rgba(245,246,250,1)',color:'#505050'}"
            :data="tableData" tooltip-effect="dark"  style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            align='center' class="tableBox"
            width="100">
            </el-table-column>
            <el-table-column
            prop="name"
            label="消息名称"
            align='center'>
            </el-table-column>
            <el-table-column
             prop="time"
            label="发送时间"
            align='center'>
            <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
            prop="type"
            align='center'
            label="消息类型" >
            <template >111111</template>
            </el-table-column>
             <el-table-column
            fixed="right"
             align='center'
            label="状态">
            <template>
                已读
            </template>
            </el-table-column>
        </el-table>
        </div>
    </section>
      <!-- 底部内容模块-->
      <Allfooter></Allfooter>
  </div>
</template>
<style>
.user_ms_scrch .el-button{
    padding: 11px 20px;
    margin-left: 10px;
}
.user_ms_scrch .el-radio-group{
    height: 41px;
}
.el-table__header tr, .el-table__header th,.el-table__body tr, .el-table__body td{
      padding: 0;
      height: 45px;
}
</style>
<style lang="less" scoped>
.user_message_content{
        padding: 0px 0px 0px 20px;
        width: 1670px;
        margin-left: 200px;
        margin-bottom: 5px;
        p{
            font-size: 14px;
            color:rgba(164,173,195,1); 
            height: 50px;
            line-height: 50px;
        }
        .user_ms_scrch{
            margin-bottom: 20px;
        }
        .user_ms_table{
            width:1668px;
            height:870px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(222,229,235,1);
        }
        .tableBox{
            height: 30px !important;
        }
       
}
</style>
<script>
export default {
    data (){
        return{
         //用户消息搜索
         serch_message:"",  
         //控制查询按钮效果
         loading:false, 
         radio1:"",   
         options: [{
          value: '1',
          label: '已读'
        }, {
          value: '2',
          label: '未读'
        }],
        value: '',
         tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
        }
    },
    mounted(){

    },
    methods:{
         toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
}
</script>