<template>
  <div class="not-found">
    404<el-button type="primary" @click="toHome">返回首页</el-button>
  </div>
</template>
<script>
export default {
  name: "NotFound",
  methods: {
    toHome() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.not-found {
  height: 100%;
  color: #fff;
  font-size: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
