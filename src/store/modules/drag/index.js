export default {
  drag: {
    namespaced: true,
    state: () => ({
      nodeList: [],
    }),
    mutations: {
      changeNodeList(state, payload) {
        state.nodeList = payload;
      },
    },
  },
};
