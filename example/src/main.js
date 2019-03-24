import Vue from 'vue'
import App from './App.vue'
import vClickOutside from 'v-click-outside'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
Vue.use(vClickOutside)

new Vue({
  el: '#app',
  render: h => h(App)
})