import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/HomePage'
import Gas from '@/pages/Gas'
import Personal from '@/pages/Personal'
import jiaYou from '@/pages/jiayouliang'
import order from '@/pages/Order'
import orderList from '@/pages/orderList'
import Login from '@/pages/login'
import detail from '@/pages/orderDetails'
import mobile from '@/pages/mobilephone'
import data from '@/pages/mydata'
import LayoutMenu from '@/layout/layoutmenu'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      redirect: 'login'
    },
    {
      path: '/homepage',
      name: 'home',
      component: LayoutMenu,
      redirect: '/homepage/index',
      children: [
        {
          path: 'index',
          name: 'home',
          component: Home
        }
      ]
    },
    {
      path: '/gas',
      name: 'gas',
      component: LayoutMenu,
      redirect: '/gas/index',
      children: [
        {
          path: 'index',
          name: 'gas',
          component: Gas
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/Personal',
      name: 'Personal',
      component: LayoutMenu,
      redirect: '/Personal/index',
      children: [
        {
          path: 'index',
          name: 'Personal',
          component: Personal
        }
      ]
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
      component: LayoutMenu,
      redirect: '/orderList/index',
      children: [
        {
          path: 'index',
          name: 'orderList',
          component: orderList
        }
      ]
    },
    {
      path: '/orderdetails/:id',
      name: '123',
      component: detail
    },
    {
      path: '/mobilephone',
      name: 'mobilephone',
      component: mobile
    },
    {
      path: '/mydata',
      name: 'mydata',
      component: data
    }
  ]
})
