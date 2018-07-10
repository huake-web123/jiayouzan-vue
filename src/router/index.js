import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/HomePage'
import Gas from '@/pages/Gas'
import CarService from '@/pages/CarService'
import Personal from '@/pages/Personal'
import jiaYou from '@/pages/jiayouliang'
import order from '@/pages/Order'
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
    },
    {
      path: '/jiayouliang/:id',
      name: 'jiayouliang',
      component: jiaYou
    },
    {
      path: '/Order/:gasModel/:money',
      name: 'Order',
      component: order
    }
  ]
})
