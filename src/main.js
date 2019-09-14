import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import toastsPlugin from '@/utils/toasts.plugin.js'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false

Vue.use(toastsPlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
