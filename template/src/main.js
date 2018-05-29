// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto';
import Vue from 'vue';
import Axios from 'axios';
import ElementUI from 'element-ui';
import MyComponents from 'valuesimplex-vue-components';

import 'element-ui/lib/theme-chalk/index.css';

import App from './App';
import router from './router';
import store from './store';
import commonMethods from './utils/common';

import './assets/css/reset.less';
import './assets/css/master.less';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(MyComponents);

// 请求拦截
Axios.interceptors.request.use((config) => {
  const newConfig = Object.assign(config, {
    url: `/api/v1${config.url}`,
  });
  return newConfig;
}, error => Promise.reject(error));

// 响应拦截
Axios.interceptors.response.use(res => res.data, (e) => {
  switch (e.response.status) {
    case 401:
      router.replace('/login');
      Vue.prototype.$notify.error({
        title: '提示',
        message: '未登录，请重新登录',
        duration: 2000,
      });
      break;

    case 420:
      router.replace('/login');
      Vue.prototype.$notify.error({
        title: '提示',
        message: e.response.data.msg,
        duration: 2000,
      });
      break;

    case 417:
      Vue.prototype.$notify.error({
        title: '提示',
        message: e.response.data.msg,
        duration: 2000,
      });
      break;

    default:
      break;
  }
  return Promise.reject(e);
});

Vue.prototype.$http = Axios;
Vue.prototype.$commonMethods = commonMethods;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
