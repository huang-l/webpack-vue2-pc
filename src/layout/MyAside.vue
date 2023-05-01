<template>
  <el-menu
    class="my-menu"
    @select="selectMenu"
    :default-active="$route.path"
    background-color="#333e42"
  >
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { debounce } from "lodash";
export default {
  name: "MyAside",
  methods: {
    selectMenu: debounce(function (key) {
      if (key === this.$route.path) return;
      this.$router.push(key);
    }, 300),
  },
};
</script>

<style lang="less" scoped>
.my-menu {
  height: 100%;
}
</style>
