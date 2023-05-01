const resizeDirective = {
  bind(el, binding) {
    const handle = binding.value;
    let width = "",
      height = "";
    // 判断元素是否缩放
    function isReize() {
      const style = getComputedStyle(el);
      if (width !== style.width || height !== style.height) {
        handle({ width: style.width, height: style.height }); // 关键(这传入的是函数,所以执行此函数)
      }
      width = style.width;
      height = style.height;
    }
    el.timer = setInterval(isReize, 300);
  },
  unbind(el) {
    clearInterval(el.timer);
  },
};
export default resizeDirective;
