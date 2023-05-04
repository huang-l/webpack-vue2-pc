const mixin = {
  mounted() {
    document.body.appendChild(this.$el);
  },
  watch: {
    visible(value) {
      // 动画结束后销毁实例
      if (value) return;
      this.$destroy();
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    },
  },
};

export default {
  install(Vue) {
    Vue.prototype.$dialog = (component, props) => {
      const mixins = component.mixins || [];
      mixins.push(mixin);
      component.mixins = mixins;
      const DialogConstructor = Vue.extend(component);
      const dialog = new DialogConstructor({
        propsData: props || {},
      });
      dialog.$mount();
    };
  },
};
