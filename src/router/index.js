import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/HomePage'
import Gas from '@/pages/Gas'
import CarService from '@/pages/CarService'
import Personal from '@/pages/Personal'
import jiaYou from '@/pages/jiayouliang'
import order from '@/pages/Order'
import orderList from '@/pages/orderList'
import Login from '@/pages/login'
import detail from '@/pages/orderDetails'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      redirect: 'login'
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
      path: '/Order/:gasModel/:money/:id/:gas_gun',
      name: 'Order',
      component: order
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: orderList
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/orderDetails',
      name: 'orderDetails',
      component: detail
    }
  ]
})
