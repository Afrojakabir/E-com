import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import router from './router'

Vue.use(BootstrapVue)
Vue.use(VueRouter)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#akaba')
