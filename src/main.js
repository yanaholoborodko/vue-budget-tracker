import Vue from "vue"
import Vuelidate from "vuelidate"
import VueMeta from "vue-meta"
import Paginate from "vuejs-paginate"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import dateFilter from "@/filters/date.filter"
import localeFilter from "@/filters/locale.filter"
import currencyFilter from "@/filters/currency.filter"
import tooltipDirective from "@/directives/tooltip.directive"
import titlePlugin from "@/utils/title.plugin"
import toastsPlugin from "@/utils/toasts.plugin"
import Loader from "@/components/app/Loader"
import "./registerServiceWorker"
import "materialize-css/dist/js/materialize.min"

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(toastsPlugin);
Vue.use(titlePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.filter("date", dateFilter);
Vue.filter("locale", localeFilter);
Vue.filter("currency", currencyFilter);
Vue.directive("tooltip", tooltipDirective);
Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

//firebase initialization
firebase.initializeApp({
  apiKey: "AIzaSyDrpymlb6ufyBPGSCkvekVDWkTAlKzWSZs",
  authDomain: "vue-budget-tracker.firebaseapp.com",
  databaseURL: "https://vue-budget-tracker.firebaseio.com",
  projectId: "vue-budget-tracker",
  storageBucket: "",
  messagingSenderId: "811630794035",
  appId: "1:811630794035:web:6769ef58594940345ada46"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
