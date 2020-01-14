import localeFilter from "@/filters/locale.filter"

export default {
  install(Vue) {
    Vue.prototype.$title = function(titleKey) {
      const appName = process.env.VUE_APP_TITLE
      return `${localeFilter(titleKey)} | ${appName}`
    }
  }
}
