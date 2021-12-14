import Vue from 'vue';
import axios from 'axios';
import Vueaxios from 'vue-axios';
import {
  ValidationObserver, ValidationProvider, extend, localize, configure,
} from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import App from './App.vue';
import router from './router';
import currency from './filters/currency';
import date from './filters/date';
import './bus';

Vue.config.productionTip = false;

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

Vue.use(Vueaxios, axios);
axios.defaults.withCredentials = true;

localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

Vue.component('Loading', Loading);
Vue.filter('currency', currency);
Vue.filter('date', date);

new Vue({
  router,
  created() {
    const title = localStorage.getItem('title') || '';
    if (title) {
      document.title = title;
    }
  },
  render: (h) => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  function titleChange() {
    document.title = to.meta.title ? to.meta.title : '陶藝綻放';
    localStorage.setItem('title', to.meta.title);
  }

  if (to.meta.requiresAuth === true) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((res) => {
      if (res.data.success) {
        next();
        titleChange();
      } else {
        next({
          path: '/login',
        });
        titleChange();
      }
    });
  } else {
    next();
    titleChange();
  }
});
