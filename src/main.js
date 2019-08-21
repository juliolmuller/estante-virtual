import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Disable framework tips when in production
Vue.config.productionTip = false

// Initialize Vue.js application
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
