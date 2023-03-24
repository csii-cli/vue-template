import axios from 'axios'
import Cookies from 'js-cookie'
import Router from '@/router/index'
import $mConfirm from '@/components/m-confirm'
import { etxApiArr } from './etxapi'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 1000 * 60 * 3 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (etxApiArr.includes(config.url)) {
      config.headers['Encrypt-Mode'] = 0
    } else if (process.env.VUE_APP_MODE_CRYPT === 'ENCRYPT') {
      config.headers['Encrypt-Mode'] = 1
      // config.data = encrypt(JSON.stringify(config.data), pubkeyHex, {
      //   mode: mode,
      //   iv: iv
      // })
    }
    const token = Cookies.get('token')
    if (token) {
      config.headers['X-Token'] = token
    }
    return config
  },
  (error) => {
    // 发送失败
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.config.responseType === 'blob') {
      return response
    }
    let dataAxios = null
    if (response.config.headers['Encrypt-Mode'] === 1) {
      // dataAxios = JSON.parse(
      //   decrypt(response.data, pubkeyHex, {
      //     mode: mode,
      //     iv: iv
      //   })
      // )
    } else {
      dataAxios = response.data
    }
    // const dataAxios = response.data
    console.log('dataAxios', dataAxios)
    if (dataAxios.respCode === '00000000') {
      return dataAxios
    } else if (dataAxios.respCode === 'invalid.user') {
      $mConfirm('提示', dataAxios.respMsg, {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          // 确认回调
          sessionStorage.removeItem('SESSION_ID')
          Router.push({
            path: '/login'
          })
        })
        .catch(() => {
          // 取消回调
        })
      return dataAxios
    } else {
      $mConfirm('提示', dataAxios.respMsg, {
        confirmButtonText: '确认'
      })
      return dataAxios
    }
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
  }
)
export default service
