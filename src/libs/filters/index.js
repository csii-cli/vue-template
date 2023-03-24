/* 是否为空 */
export const isNullOrEmpty = function (val) {
  if (val == null || val === '' || typeof val === undefined) {
    return true
  } else {
    return false
  }
}
/* 时间戳时间格式化
 *default  2020-12-17 16:00:32
 *yyyy-mm-dd  2020-12-17
 *yyyy-mm  2020-12
 *hh:mm   16:01
 *yyyy 2020
 *mm-dd  12:17
 *hh:mm  16:02
 *ymd  2020年12月17日
 *
 */
export const timeFormat = (value, format) => {
  const date = new Date(value)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const h = date.getHours()
  const min = date.getMinutes()
  const s = date.getSeconds()
  let result = ''
  if (format === undefined) {
    result = `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d} ${h < 10 ? '0' + h : h}:${
      min < 10 ? '0' + min : min
    }:${s < 10 ? '0' + s : s}`
  }
  if (format === 'yyyy-mm-dd') {
    result = `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`
  }
  if (format === 'yyyy-mm') {
    result = `${y}-${m < 10 ? '0' + m : m}`
  }
  if (format === 'mm-dd') {
    result = ` ${m < 10 ? '0' + m : m}:${d < 10 ? '0' + d : d}`
  }
  if (format === 'hh:mm') {
    result = ` ${h < 10 ? '0' + h : h}:${min < 10 ? '0' + min : min}`
  }
  if (format === 'yyyy') {
    result = `${y}`
  }
  if (format === 'ymd') {
    result = `${y}年${m}月${d}日`
  }
  return result
}
/* 测试 */
export const isTest = function (val) {
  return val.slice(2)
}
/* 字节转换成 B KB MB GB */
export const sizeTostr = (size) => {
  var data = ''
  if (size < 0.1 * 1024) {
    // 如果小于0.1KB转化成B
    data = size.toFixed(2) + 'B'
  } else if (size < 0.1 * 1024 * 1024) {
    // 如果小于0.1MB转化成KB
    data = (size / 1024).toFixed(2) + 'KB'
  } else if (size < 0.1 * 1024 * 1024 * 1024) {
    // 如果小于0.1GB转化成MB
    data = (size / (1024 * 1024)).toFixed(2) + 'MB'
  } else {
    // 其他转化成GB
    data = (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
  }
  var sizestr = data + ''
  var len = sizestr.indexOf('.')
  var dec = sizestr.substr(len + 1, 2)
  if (dec === '00') {
    // 当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
  }
  return sizestr
}
export const timeAgo = (dateTimeStamp) => {
  // dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  let result = null
  var minute = 1000 * 60 // 把分，时，天，周，半个月，一个月用毫秒表示
  var hour = minute * 60
  var day = hour * 24
  var week = day * 7
  var halfamonth = day * 15
  var month = day * 30
  var now = new Date().getTime() // 获取当前时间毫秒
  var diffValue = now - dateTimeStamp // 时间差

  if (diffValue < 0) {
    return
  }
  var minC = diffValue / minute // 计算时间差的分，时，天，周，月
  var hourC = diffValue / hour
  var dayC = diffValue / day
  var weekC = diffValue / week
  var monthC = diffValue / month
  if (monthC >= 1 && monthC < 4) {
    result = ' ' + parseInt(monthC) + '月前'
  } else if (weekC >= 1 && weekC < 4) {
    result = ' ' + parseInt(weekC) + '周前'
  } else if (dayC >= 1 && dayC < 7) {
    result = ' ' + parseInt(dayC) + '天前'
  } else if (hourC >= 1 && hourC < 24) {
    result = ' ' + parseInt(hourC) + '小时前'
  } else if (minC >= 1 && minC < 60) {
    result = ' ' + parseInt(minC) + '分钟前'
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = '刚刚'
  } else {
    var datetime = new Date()
    datetime.setTime(dateTimeStamp)
    var Nyear = datetime.getFullYear()
    var Nmonth =
      datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
    var Ndate = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
    var Nhour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
    var Nminute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes()
    var Nsecond = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds()
    result = Nyear + '-' + Nmonth + '-' + Ndate
  }
  return result
}
