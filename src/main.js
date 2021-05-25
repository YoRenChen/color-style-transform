import Vue from 'vue'
import App from './App.vue'

import './global.less'
import { createTheme } from '@/utils/setting'
createTheme()
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
