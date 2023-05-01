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
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  name: "MyDialog",
  props: {
    title: {
      type: String,
      default: "弹窗标题",
    },
    width: {
      type: String,
      default: "500px",
    },
  },
  data() {
    return {
      visible: true,
    };
  },
};
</script>
