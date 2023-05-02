<template>
  <div class="home-wrapper">
    <div class="chart-list">
      <div class="chart-item" v-for="(option, index) in chartArr" :key="index">
        <my-echart width="340" height="230" :option="option"></my-echart>
      </div>
    </div>
  </div>
</template>

<script>
import MyEchart from "@/components/MyEchart.vue";
export default {
  name: "Home",
  components: { MyEchart },
  data() {
    return {
      chartArr: [
        {
          title: {
            text: "基础折现图",
          },
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: "line",
            },
          ],
        },
        {
          title: {
            text: "基础面积图",
          },
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: "line",
              areaStyle: {},
            },
          ],
        },
        {
          title: {
            text: "折线图堆叠",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["Email", "Union Ads"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "Email",
              type: "line",
              stack: "Total",
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: "Union Ads",
              type: "line",
              stack: "Total",
              data: [220, 182, 191, 234, 290, 330, 310],
            },
          ],
        },
        {
          title: {
            text: "基础柱状图",
          },
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: "bar",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.home-wrapper {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  .chart-list {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .chart-item {
      margin: 10px;
      background-color: #fff;
    }
  }
}
</style>
