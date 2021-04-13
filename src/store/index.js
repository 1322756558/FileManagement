/*
 * @Date: 2021-02-28 22:22:14
 * @LastEditors: zhou
 * @LastEditTime: 2021-03-03 16:55:33
 * @FilePath: \yfkj\src\store\index.js
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    SET_USER_INFO: (state, info) => {
      state.userInfo = info
    } 
  },
  actions: {
  },
  modules: {
  }
})
