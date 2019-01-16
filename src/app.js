require('dotenv').config()
import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import Vuex from 'vuex'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
window.axios = require('axios');


Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.config.productionTip = false

export const store = new Vuex.Store({
  state: {
    user: {},
  },
  getters : {
    user: function(state) {
        return state.user
    }
  },
  mutations: {
    user: function(state, payload) {
        state.user = payload
    }
  },
  actions: {
    logout: function(context) {
        // context.commit('user', {});
        localStorage.removeItem('jwt')
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})