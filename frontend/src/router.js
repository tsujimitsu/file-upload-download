import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue'
import Hoge from './components/Hoge.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:tenantId',
      name: 'tenant-home',
      component: Home
    },
    {
      path: '/hoge',
      name: 'hoge',
      component: Hoge
    }
  ]
})
