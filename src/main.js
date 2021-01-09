import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Buefy
import Buefy from 'buefy'
import './assets/my_buefy.sass'
// my_css
import './assets/css/my_style.css'
// fontawesome 必要引用
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// 根據 icon 的種類引用
import {
  faCheck,
  faPen,
  faTimes,
  faUndo,
  faPlay,
  faPause,
  faStepForward
} from '@fortawesome/free-solid-svg-icons'
// 引用 material icons
import '@mdi/font/css/materialdesignicons.css'
// axios 套件
import axios from 'axios'
import VueAxios from 'vue-axios'
// animate.css
import 'animate.css'
// ApexCharts

// 傳送請求時一起傳送認證資訊
axios.defaults.withCredentials = true

library.add(faCheck, faPen, faTimes, faUndo, faPlay, faPause, faStepForward)

// 註冊元件
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(Buefy)

Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
