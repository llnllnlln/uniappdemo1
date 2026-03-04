import App from './App'
import uviewPlus from '@/uni_modules/uview-plus'
import './api/mock.js'
 
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import * as Pinia from 'pinia';
export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia());
  app.use(uviewPlus)
  return {
    app,
	Pinia
  }
}
// #endif