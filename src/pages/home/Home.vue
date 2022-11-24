<template>
  <div>
    <span>{{ count }}</span>
    <el-button @click="increase">点击</el-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { debounce } from 'lodash';
export default {
  computed: {
    ...mapState('home', ['count']),
  },
  methods: {
    ...mapMutations('home', ['addCount']),
    increase: debounce(function () {
      this.addCount(2);
    }, 300),
  },
};
</script>
