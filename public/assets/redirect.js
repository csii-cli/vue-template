// 重定向
function refuseApp() {
  var isApp = false
  if (/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/i.test(navigator.userAgent)) {
    isApp = true
  }
  return isApp
}
if (refuseApp()) {
  location.href = 'http://www.imjohn.cn:9080/h5/#/homes'
}
