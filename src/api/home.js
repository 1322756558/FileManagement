/*
 * @Date: 2021-02-28 22:22:14
 * @LastEditors: zhou
 * @LastEditTime: 2021-04-14 09:41:46
 * @FilePath: \yfkj\src\api\home.js
 */

// 获取项目
import { axios } from '@/utils/request'
import baseUrl from './baseUrl'

export default {
  getProject: param => {
    return axios({
      url: baseUrl + '/project/getProject',
      method: 'get',
      params: param
    })
  },
  addCompetence: param => {
    return axios({
      url: baseUrl + '/project/addCompetence',
      method: 'post',
      data: param
    })
  },
  deleteCompetence: param => {
    return axios({
      url: baseUrl + '/project/deleteCompetence',
      method: 'post',
      data: param
    })
  },
  addProject: param => {
    return axios({
      url: baseUrl + '/project/addProject',
      method: 'post',
      data: param
    })
  },
  uploadFolder: param => {
    return axios({
      url: baseUrl + '/file/uploadFolder',
      method: 'post',
      data: param
    })
  },
  deleteProject: param => {
    return axios({
      url: baseUrl + '/project/deleteProject',
      method: 'post',
      data: param
    })
  },
  //未验证重复性
  addProjectType: param => {
    return axios({
      url: baseUrl + '/projectType/addProjectType',
      method: 'post',
      data: param
    })
  },
  // 仅限超级用户
  listTypes: () => {
    return axios({
      url: baseUrl + '/projectType',
      method: 'post',
    })
  },
  getTypeInfo: param => {
    return axios({
      url: baseUrl + '/projectType/getTypeInfo',
      method: 'post',
      data: param
    })
  },
  selectFileTree:param=>{
    return axios({
      url:baseUrl+'/file/selectFileTree',
      method:'post',
      data:param
    })
  },
  selectOnlyProject:param=>{
    return axios({
      url:baseUrl+'/project/selectOnlyProject',
      method:'post',
      data:param
    })
  },
  selectOnlyFile:param=>{
    return axios({
      url:baseUrl+'/file/selectOnlyFile',
      method:'post',
      data:param
    })
  },
  selectFileTreeByID:param=>{
    return axios({
      url:baseUrl+'/file/selectFileTreeByID',
      method:'post',
      data:param
    })
  }
}