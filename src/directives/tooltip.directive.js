import localeFilter from "@/filters/locale.filter";

export default {
  bind(el, { value, modifiers }) {
    M.Tooltip.init(el, {
      html: modifiers.noloc ? value : localeFilter(value),
      position: "top"
    });
  },
  unbind(el) {
    const tooltip = M.Tooltip.getInstance(el);

    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  }
};
