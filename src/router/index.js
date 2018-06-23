import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/HomePage'
import Gas from '@/pages/Gas'
import CarService from '@/pages/CarService'
import Personal from '@/pages/Personal'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: 'HomePage'
    },
    {
      path: '/HomePage',
      name: 'Home',
      component: Home
    },
    {
      path: '/Gas',
      name: 'Gas',
      component: Gas
    },
    {
      path: '/CarService',
      name: 'CarService',
      component: CarService
    },
    {
      path: '/Personal',
      name: 'Personal',
      component: Personal
    }
  ]
})
