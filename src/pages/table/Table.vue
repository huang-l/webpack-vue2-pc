<template>
  <div class="table-container">
    <div class="table-list-wrapper" @scroll="boxScroll">
      <div
        class="table-list"
        :style="`padding-top:${70 * listIndex}px;padding-bottom:${
          70 * (10 - listIndex)
        }px`"
      >
        <div
          class="table-list-item"
          v-for="(item, index) in dataList.slice(listIndex, listIndex + 10)"
          :key="index"
        >
          <span>{{ index + 1 + listIndex }}</span>
          <div class="item-detail">
            <p class="item-info">{{ item.name }}</p>
            <p class="item-info item-auth">{{ item.auth }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [
        { name: '重生', auth: '周深' },
        { name: '绝配', auth: '时代少年团' },
        { name: '对你说', auth: '半吨兄弟' },
        { name: '泛泛之友', auth: '王靖雯、盖君炎' },
        { name: '雨赶走云彩', auth: 'pro、傅梦彤' },
        { name: '鲸鱼电台', auth: '房东的猫' },
        { name: '传奇天下', auth: '陈小春' },
        { name: '明明我只删除一个你', auth: '雨中百合' },
        { name: '江湖儿女 (Live)', auth: 'Pen、布瑞吉Bridge' },
        { name: '丰收年年', auth: '门丽' },
        { name: '你不来我不爱', auth: '高安' },
        { name: '一个人太寂寞', auth: '黑龙' },
        { name: '人生没有难过的关', auth: '东北小黑姐' },
        { name: '墨菲定律', auth: '白嘉峻' },
        { name: '穷途末路才知醒悟', auth: '李英' },
        { name: '柠檬气泡', auth: 'JUVENILE、Liyuu' },
        { name: '沉默像', auth: '辞泽' },
        { name: '爱妃', auth: '阿禹ayy' },
        { name: '爱你入心又入骨', auth: '李英' },
        { name: '冥冥中', auth: '糯米Nomi' },
      ],
      listIndex: 0,
    };
  },
  methods: {
    boxScroll: function (ev) {
      const box = ev.target;
      const value = Math.floor(box.scrollTop / 80);
      this.listIndex !== value && (this.listIndex = value);
    },
  },
};
</script>
<style lang="less" scoped>
.table-container {
  height: 500px;
  overflow: hidden;
  box-shadow: 0 0 10px #ccc;
  .table-list-wrapper {
    height: 500px;
    overflow: auto;
    .table-list {
      .table-list-item {
        height: 70px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .item-detail {
          width: 270px;
          .item-info {
            margin: 0;
            height: 25px;
            line-height: 25px;
            color: #000;
          }
          .item-auth {
            font-size: 13.26px;
            color: rgba(129, 136, 148, 1);
          }
        }
      }
    }
  }
}
</style>
