require('dotenv').config()

import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import VueCookies from 'vue-cookies'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(VueCookies)

Vue.use(Vuex)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
