export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'imjohn',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  // cookieExpires: 1 / 48,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'http://localhost:8090',
    pro: 'http://localhost:8090',
    imgUrl: 'https://www.imjohn.cn/upload/'
  },
  /* 微信配置 */
  wxConfig: {
    self_redirect: false,
    id: 'qrcode',
    appid: 'wxbdc5610cc59c1631',
    scope: 'snsapi_login',
    redirect_uri:
      process.env.NODE_ENV === 'development'
        ? 'https%3A%2F%2Fpassport.yhd.com%2Fwechat%2Fcallback.do'
        : window.location.href + '?code=CODE&state=STATE',
    state: '1211111',
    style: 'black',
    href: ''
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {}
}
