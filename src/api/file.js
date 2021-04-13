/*
 * @Date: 2021-02-28 22:22:14
 * @LastEditors: zhou
 * @LastEditTime: 2021-03-24 00:21:23
 * @FilePath: \yfkj\src\api\file.js
 */


import { axios } from '@/utils/request'
import baseUrl from './baseUrl'

export default {
  // uploadFile: param => {
  //   return axios({
  //     url: baseUrl + '/file/uploadFile',
  //     method: 'post',
  //     data: param
  //   })
  // },
  getFiles: param => {
    return axios({
      url: baseUrl + '/file/selectFiles',
      method: 'post',
      data: param
    })
  },
  deleteFiles: param => {
    return axios({
      url: baseUrl + '/file/deleteFile',
      method: 'post',
      data: param
    })
  },
  moveFile: param => {
    return axios({
      url: baseUrl + '/file/moveFile',
      method: 'post',
      data: param
    })
  },
  renameFile: param => {
    return axios({
      url: baseUrl + '/file/renameFile',
      method: 'post',
      data: param
    })
  }
  // downloadFile: param => {
  //   return axios({
  //     url: baseUrl + '/file/downloadFile',
  //     method: 'post',
  //     data: param
  //   })
  // }
}