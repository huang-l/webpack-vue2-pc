export default {
  home: {
    namespaced: true,
    state: () => ({
      count: 0,
    }),
    mutations: {
      addCount(state, payload) {
        state.count += payload;
      },
    },
  },
};
