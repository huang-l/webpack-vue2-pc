<template>
  <div
    ref="echart"
    :style="{ width: filterWh(width), height: filterWh(height) }"
    v-resize="resize"
  ></div>
</template>

<script>
import * as echarts from "echarts";
import { debounce } from "lodash";
export default {
  name: "MyEchart",
  props: {
    width: {
      type: String | Number,
      default: "100%",
    },
    height: {
      type: String | Number,
      default: "100%",
    },
    option: {
      type: Object,
      default: () => ({
        title: {
          text: "请传入option",
        },
      }),
    },
  },
  watch: {
    width(newVal) {
      console.log(newVal);
    },
  },
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.echart);
    this.myChart.setOption(this.option);
  },
  beforeDestroy() {
    // 销毁echarts实例
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    filterWh(wh) {
      if (typeof wh === "number") {
        return `${wh}px`;
      }
      if (typeof wh === "string") {
        if (!Number.isNaN(Number(wh))) {
          return `${wh}px`;
        }
        if (wh.includes("%") && !Number.isNaN(Number(wh.slice(0, -1)))) {
          return wh;
        }
        if (wh.includes("px") && !Number.isNaN(Number(wh.slice(0, -2)))) {
          return wh;
        }
      }
      return "100%";
    },
    resize: debounce(function (data) {
      let { width, height } = data;
      console.log("width:", width, "height:", height);
      if (this.myChart) {
        this.myChart.resize();
      }
    }, 300),
  },
};
</script>
