<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <span>个人vue系统</span>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userInfo.account
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="name">{{
            userInfo.account
          }}</el-dropdown-item>
          <el-dropdown-item command="exit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container class="main-container">
      <el-aside class="my-aside"><my-aside></my-aside></el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import MyAside from "./MyAside.vue";
import cookieService from "@/utils/cookieService";
import { mapState, mapMutations } from "vuex";
export default {
  name: "MyLayout",
  components: { MyAside },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
  mounted() {
    const token = cookieService.getCookie("token");
    if (!token) {
      this.$router.push("/login");
    }
  },
  methods: {
    ...mapMutations("user", ["changeUserInfo"]),
    handleCommand(key) {
      if (key === "exit") {
        this.$confirm("确定退出登录吗?", "退出登录", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({ type: "success", message: "退出登录成功!" });
            cookieService.deleteCookie("token");
            this.changeUserInfo({});
            this.$router.push("/login");
          })
          .catch(() => {
            this.$message({ type: "info", message: "已取消操作" });
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.my-container {
  height: 100%;
  color: #fff;
  .my-header {
    height: 50px !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
  }
  .main-container {
    height: calc(100% - 50px);
    .my-aside {
      width: 200px !important;
      border-right: 1px solid #ccc;
    }
  }
}
</style>
