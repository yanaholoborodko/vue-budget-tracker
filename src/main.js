import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import toastsPlugin from '@/utils/toasts.plugin.js'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(toastsPlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

firebase.initializeApp({
  apiKey: "AIzaSyDrpymlb6ufyBPGSCkvekVDWkTAlKzWSZs",
  authDomain: "vue-budget-tracker.firebaseapp.com",
  databaseURL: "https://vue-budget-tracker.firebaseio.com",
  projectId: "vue-budget-tracker",
  storageBucket: "",
  messagingSenderId: "811630794035",
  appId: "1:811630794035:web:6769ef58594940345ada46"
});

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


