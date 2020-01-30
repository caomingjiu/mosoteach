import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import global_ from '@/util/Global'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Vuex from 'vuex'

Vue.use(Vuex)

Vue.use(ElementUI);

Vue.use(VueMaterial)

Vue.prototype.GLOBAL = global_

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state,payload) {
      state.count = payload.amount
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
