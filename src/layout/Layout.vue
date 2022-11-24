<template>
  <el-container class="hl-container">
    <el-header class="hl-header">头部</el-header>
    <el-container>
      <el-aside width="200px"><Aside></Aside></el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from './aside/Aside.vue';
export default {
  components: { Aside },
};
</script>

<style lang="less" scoped>
.hl-container {
  height: 100%;
  .hl-header {
    height: 50px !important;
    line-height: 50px;
    box-shadow: 0 1px 1px #ccc;
  }
}
</style>
