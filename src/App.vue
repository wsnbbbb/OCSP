<template>
  <div id="app">
      <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
    provide() {
    return {
      reload: this.reload
    };
  },
  data: function() {
    return {
      isRouterAlive: true,
      routerPath: this.$router.path
    };
  },
   methods: {
    // 封装页面刷新的方法
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
}
</script>
<style>
body{
    padding: 0;
    margin: 0;
    list-style: none;
    background: #f5f5f5;
}
address,cite,dfn,em,var, i {font-style:normal;}
input[type="number"] {
  -moz-appearance: textfield;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>