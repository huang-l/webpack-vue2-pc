export default {
  user: {
    namespaced: true,
    state: () => ({
      userInfo: {},
    }),
    mutations: {
      changeUserInfo(state, payload) {
        state.userInfo = payload;
      },
    },
  },
};
