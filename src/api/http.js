import request from '@/plugin/axios'
import qs from 'qs'
let commonData = {
  _SessionId: 'test' // 会话Id
}
// export function httpGet(url, params = {}) {
//   commonData = {
//     ...commonData
//   }
//   return request({
//     url,
//     method: 'get',
//     params: {
//       ...params
//     }
//   })
// }

export function httpGet(url, params = {}) {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'get',
      params: {
        ...params
      }
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// export function httpPost (url, data = {}) {
//   return request({
//     url,
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json; charset=utf-8'
//     },
//     data: {
//       ...data,
//       ...commonData
//     },
//     transformRequest: [
//       function(data) {
//         return JSON.stringify(data)
//       }
//     ]
//   })
// }
export function httpPost(url, data = {}) {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: {
        ...data,
        ...commonData
      },
      transformRequest: [
        function (data) {
          return JSON.stringify(data)
        }
      ]
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function httpForm(url, data = {}) {
  return new Promise((resolve, reject) => {
    return request({
      url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: {
        ...data,
        ...commonData
      },
      transformRequest: [
        function (data) {
          data = qs.stringify(data)
          return data
        }
      ]
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function download(url, data = {}) {
  return request({
    url,
    method: 'post',
    responseType: 'blob',
    data: {
      ...commonData,
      ...data
    },
    transformRequest: [
      function (data) {
        data = qs.stringify(data)
        return data
      }
    ]
  })
}
export function getDownload(url, params) {
  commonData = {
    ...commonData,
    ...params,
    IFP_SID: sessionStorage.getItem('IFP_SESSION_ID')
      ? sessionStorage.getItem('IFP_SESSION_ID')
      : ''
  }
  return request({
    url,
    method: 'get',
    responseType: 'blob',
    params: {
      ...params,
      ...commonData
    }
    /* transformRequest: [function (data) {
          data = qs.stringify(data)
          return data
        }] */
  })
}

// uploadFileRequest请求
export function httpFile(url, data = {}) {
  return new Promise((resolve, reject) => {
    return request({
      url,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      file: data
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
