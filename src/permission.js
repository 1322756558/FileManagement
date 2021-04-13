/*
 * @Date: 2021-02-28 22:22:14
 * @LastEditors: zhou
 * @LastEditTime: 2021-03-28 21:58:27
 * @FilePath: \yfkj\src\permission.js
 */

import Vue from 'vue'
import router from './router'
// import store from './store'
// import user from './api/user'

router.beforeEach(async (to, from, next) => {
  const token = Vue.ls.get('ACCESS_TOKEN')
  if(to.name !== 'Login' && to.name !== 'Register' && !token){
    next({name: 'Login'})
  }else{
    // 获取用户信息，和登录格式一样
    // const submit = await user.getDetail();
    //         store.commit("SET_USER_INFO", submit.user);
  }

  next()
})