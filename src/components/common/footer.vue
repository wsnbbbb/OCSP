<template>
    <!-- 底部模块 -->
    <div class="login_footer">
        {{$t("login.copyright")}}
    </div>
</template>
<style lang="less" scoped>
.login_footer{
    width: 100%;
    font-size:12px;
    height:60px;
    background:rgba(242,242,242,1);
    font-weight:200;
    color:rgba(139,141,145,1);
    position: absolute;
    right: 0;
    left: 0;
    text-align: center;
    line-height: 60px;
    z-index: 1;
    border-top: 1px solid rgba(221,221,221,1);
}
</style>