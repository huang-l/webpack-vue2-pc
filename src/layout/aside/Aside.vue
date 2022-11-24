<template>
  <el-menu
    class="hl-menu"
    @select="selectMenu"
    :default-active="$route.path"
    background-color="#ccc"
  >
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/table">
      <i class="el-icon-table-lamp"></i>
      <span slot="title">虚拟列表</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { debounce } from 'lodash';
export default {
  methods: {
    selectMenu: debounce(function (key) {
      if (key === this.$route.path) return;
      this.$router.push(key);
    }, 300),
  },
};
</script>

<style lang="less" scoped>
.hl-menu {
  height: 100%;
}
</style>
