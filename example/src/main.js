import Vue from 'vue'
import App from './App.vue'
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)

new Vue({
  el: '#app',
  render: h => h(App)
})