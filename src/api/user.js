/*
 * @Date: 2021-02-28 22:22:14
 * @LastEditors: zhou
 * @LastEditTime: 2021-03-28 23:22:48
 * @FilePath: \yfkj\src\api\user.js
 */


import { axios } from '@/utils/request'
import baseUrl from './baseUrl'

export default {
  login: param => {
    return axios({
      url: baseUrl + '/auth/login',
      method: 'post',
      data: param
    })
  },
  register: param => {
    return axios({
      url: baseUrl + '/auth/register',
      method: 'post',
      data: param
    })
  },
  checkUsername: param => {
    return axios({
      url: baseUrl + '/auth/checkUsername',
      method: 'get',
      params: param
    })
  },
  // 仅限超级用户
  listUsers: () => {
    return axios({
      url: baseUrl + '/users',
      method: 'post',
    })
  },
  // getDetail: () => {
  //   return axios({
  //     url: baseUrl + '/users/detail',
  //     method: 'post'
  //   })
  // }
  
}