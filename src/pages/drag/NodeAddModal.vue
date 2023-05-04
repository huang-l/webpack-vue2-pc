<template>
  <el-dialog
    :visible.sync="visible"
    :title="title"
    :width="width"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-if="visible"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="横坐标" prop="x">
        <el-input-number :min="0" v-model="form.x"></el-input-number>
      </el-form-item>
      <el-form-item label="纵坐标" prop="y">
        <el-input-number :min="0" v-model="form.y"></el-input-number>
      </el-form-item>
      <el-button @click="handleCancel">取消</el-button
      ><el-button type="primary" @click="onSubmit('form')">确定</el-button>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "NodeAddModal",
  props: ["title", "width", "onOk"],
  data() {
    var validateName = (_, value, callback) => {
      const reg = /^[a-zA-Z0-9@._]{3,10}$/;
      if (!reg.test(value)) {
        callback(new Error("长度3-10 由字母 数字 @ . _组成"));
      }
      callback();
    };
    return {
      visible: true,
      form: {
        name: "",
        x: 0,
        y: 0,
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "change" },
          { validator: validateName, trigger: "change" },
        ],
        x: [{ required: true, message: "请设置横坐标", trigger: "change" }],
        y: [{ required: true, message: "请输入纵坐标", trigger: "change" }],
      },
    };
  },
  methods: {
    handleCancel() {
      this.visible = false;
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        this.onOk({ ...this.form });
        this.$message.success("添加成功");
        this.visible = false;
      });
    },
  },
};
</script>
