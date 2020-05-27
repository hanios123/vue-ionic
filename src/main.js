import Vue from 'vue'
import App from './App.vue'
import Ionic from "@ionic/vue"
import { IonicVueRouter } from "@ionic/vue";
import HomePage from './components/HomePage.vue';
import "@ionic/core/css/core.css"
import "@ionic/core/css/ionic.bundle.css"

Vue.config.productionTip = false;
Vue.use(Ionic);
Vue.use(IonicVueRouter);

const router = new IonicVueRouter({
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      name: "home",
      component: HomePage
    }
  ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
