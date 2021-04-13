/*
 * @Date: 2021-02-28 22:22:14
 * @LastEditors: zhou
 * @LastEditTime: 2021-04-08 23:31:38
 * @FilePath: /yfkj/src/router/index.js
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Home from '@/views/Home'
// import Login from '@/views/user/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/register')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/index' )
  },
  {
    path: '/preview',
    name: 'Preview',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/components/preview')
  }
  // {
  //   path: '/about',
  //   name: 'Register',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
