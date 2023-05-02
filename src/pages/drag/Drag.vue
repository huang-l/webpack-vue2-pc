<template>
  <div class="drag-wrapper">
    <div class="drag-header">
      <span>拖拽页</span>
      <el-button @click="add">添加节点</el-button>
    </div>
    <div class="drag-content">
      <svg class="svg" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <marker
            id="arrow"
            markerWidth="13"
            markerHeight="13"
            refX="8"
            refY="6"
            orient="auto"
          >
            <path d="M2,2 L10,6 L2,10" style="stroke: #fff; fill: none"></path>
          </marker>
        </defs>
        <path
          v-for="(item, index) in path"
          :key="index"
          :id="`path${item.start}${item.end}`"
          :d="filterPath(item)"
          style="
            stroke: #fff;
            stroke-width: 1px;
            fill: none;
            marker-end: url(#arrow);
          "
        ></path>
      </svg>
      <div
        class="drag-item"
        v-for="item in nodeList"
        :key="item.key"
        :style="{ left: `${item.x}px`, top: `${item.y}px` }"
        @mousedown="onMousedown($event, item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import NodeAddModal from "./NodeAddModal";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Drag",
  computed: {
    ...mapState("drag", ["nodeList"]),
    path() {
      const length = this.nodeList.length;
      if (length < 2) return [];
      const pathArr = [];
      for (let i = 0; i < length - 1; i++) {
        pathArr.push({
          start: this.nodeList[i].key,
          end: this.nodeList[i + 1].key,
        });
      }
      return pathArr;
    },
  },
  methods: {
    ...mapMutations("drag", ["changeNodeList"]),
    add() {
      this.$dialog(NodeAddModal, {
        title: "添加节点",
        width: "500px",
        onOk: (param) => {
          const key = this.nodeList.length
            ? this.nodeList[this.nodeList.length - 1].key + 1
            : 1;
          const nodeList = this.nodeList.concat({ key, ...param });
          this.changeNodeList(nodeList);
        },
      });
    },
    getPathStr(sX, sY, eX, eY) {
      const startX = sX + 30;
      const startY = sY + 30;
      const endX = eX + 30;
      const endY = eY;
      const dX = ((endX - startX) / 2) * 0.1;
      const dY = ((endY - startY) / 2) * 0.9;
      return `M${startX} ${startY} C${startX + dX} ${startY + dY}, ${
        endX - dX
      } ${endY - dY}, ${endX} ${endY}`;
    },
    onMousedown(e, item) {
      const node = e.target;
      const { clientX, clientY } = e;
      let isDown = false;
      let lastLeft = item.x;
      let lastTop = item.y;
      const move = (moveEvent) => {
        isDown = true;
        lastLeft = item.x + moveEvent.clientX - clientX;
        lastTop = item.y + moveEvent.clientY - clientY;
        lastLeft < 0 && (lastLeft = 0);
        lastTop < 0 && (lastTop = 0);
        const style = getComputedStyle(node.parentNode);
        const maxLeft = Math.floor(Number(style.width.slice(0, -2))) - 60;
        const maxTop = Math.floor(Number(style.height.slice(0, -2))) - 30;
        lastLeft > maxLeft && (lastLeft = maxLeft);
        lastTop > maxTop && (lastTop = maxTop);
        node.style.left = `${lastLeft}px`;
        node.style.top = `${lastTop}px`;
        // 设置连线的变化 起点
        this.path
          .filter((p) => p.start === item.key)
          .forEach((item) => {
            const end = this.nodeList.find((n) => n.key === item.end);
            if (end) {
              const str = this.getPathStr(lastLeft, lastTop, end.x, end.y);
              const pathStr = `path${item.start}${item.end}`;
              document.getElementById(pathStr).setAttribute("d", str);
            }
          });
        // 终点
        this.path
          .filter((p) => p.end === item.key)
          .forEach((item) => {
            const start = this.nodeList.find((n) => n.key === item.start);
            if (start) {
              const str = this.getPathStr(start.x, start.y, lastLeft, lastTop);
              const pathStr = `path${item.start}${item.end}`;
              document.getElementById(pathStr).setAttribute("d", str);
            }
          });
      };
      const up = () => {
        if (isDown) {
          isDown = false;
          const nodeList = this.nodeList.map((l) => {
            if (l.key === item.key) {
              l.x = lastLeft;
              l.y = lastTop;
            }
            return l;
          });
          this.changeNodeList(nodeList);
        }
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },
    filterPath(path) {
      const start = this.nodeList.find((n) => n.key === path.start);
      const end = this.nodeList.find((n) => n.key === path.end);
      let str = "";
      if (start && end) {
        str = this.getPathStr(start.x, start.y, end.x, end.y);
      }
      return str;
    },
  },
};
</script>

<style lang="less" scoped>
.drag-wrapper {
  height: 100%;
  .drag-header {
    height: 50px;
    padding: 0 20px;
    box-shadow: 0 1px 1px #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .drag-content {
    height: calc(100% - 50px);
    position: relative;
    .drag-item {
      position: absolute;
      width: 60px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #ff4500;
      cursor: pointer;
      user-select: none;
    }
    .svg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
