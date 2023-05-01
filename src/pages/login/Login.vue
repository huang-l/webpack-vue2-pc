<template>
  <div class="login-wrapper">
    <div class="title">个人vue系统</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-button class="login-btn" type="primary" @click="onSubmit('form')"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import cookieService from "@/utils/cookieService";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    var validatePass = (_, value, callback) => {
      const reg = /^[a-zA-Z0-9@._]{3,10}$/;
      if (!reg.test(value)) {
        callback(new Error("长度3-10 由字母 数字 @ . _组成"));
      }
      callback();
    };
    return {
      form: {
        account: "",
        password: "",
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "change" },
          { validator: validatePass, trigger: "change" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { validator: validatePass, trigger: "change" },
        ],
      },
    };
  },
  methods: {
    ...mapMutations("user", ["changeUserInfo"]),
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        const { account, password } = this.form;
        cookieService.setCookie("token", `${account}${password}`, 1);
        this.changeUserInfo({ ...this.form });
        this.$message.success("登录成功");
        this.$router.push("/");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-wrapper {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 20px;
  box-shadow: 1px 1px 10px #000;
  text-align: center;
  .title {
    color: #fff;
    line-height: 80px;
    font-size: 30px;
  }
  .login-btn {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
