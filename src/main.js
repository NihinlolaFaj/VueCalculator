import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
window.axios = require('axios');
// Vue.use(VueAxios, axios)
// Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
