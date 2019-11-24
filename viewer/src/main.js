import '@mdi/font/css/materialdesignicons.css';

import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import HelloWorld from './components/HelloWorld';
import LeakList from './components/LeakList';
import LeakDetail from './components/LeakDetail';

const router = new VueRouter({
  routes: [
    { path: '/', component: HelloWorld },
    { path: '/ye', component: { render: h => h('em', [{ text: 'kek' }]) } },
    { path: '/leaks', component: LeakList },
    {
      path: '/leaks/:leakId',
      component: LeakDetail,
      props: $route => ({ leakId: +$route.params['leakId'] })
    }
  ]
});

Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
  router: router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
