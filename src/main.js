
import Vue from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import router from './router'
import store from './store'

import apis from './api/index'

import './permission'

import Storage from 'vue-ls';

Vue.config.productionTip = false

// 注册后台接口
Vue.prototype.$WebApi = apis

const options = {
  namespace: 'yfkj_', // key键前缀
  name: 'ls', // 命名Vue变量.[ls]或this.[$ls],
  storage: 'local', // 存储名称: session, local, memory
};

Vue.use(Antd);
Vue.use(Storage, options);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
