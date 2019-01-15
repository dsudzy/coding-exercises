require('dotenv').config()
import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
window.axios = require('axios');

Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  // components: { App },
  // template: "<App/>"
  render: h => h(App)
})