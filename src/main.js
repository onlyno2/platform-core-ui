import 'core-js/stable'
import "regenerator-runtime/runtime";
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css';

import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'

Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)
Vue.use(VueToast, {
  position: 'top-right',
  duration: 3000
})

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
