import { httpPost, httpFile } from './http'
/* 注册 */
export const perUserRegister = (param) => {
  return httpPost('addUser', param)
}
/* 登录 */
export const perUserLogin = (param) => {
  return httpPost('userLogin', param)
}
/* 退出登录 */
export const userLogout = (param) => {
  return httpPost('userLogout', param)
}
/* 根据用户名查询文章 */
export const getArticle = (param) => {
  return httpPost('getArticle', param)
}
/* 根据文章类型查询文章 */
export const getTypeArticle = (param) => {
  return httpPost('getTypeArticle', param)
}
/* 查询所有文章 */
export const getAllArticle = (param) => {
  return httpPost('getAllArticle', param)
}
/* 写入文章 */
export const writeAticle = (param) => {
  return httpPost('writeAticle', param)
}
/* 修改文章 */
export const updateAticle = (param) => {
  return httpPost('updateAticle', param)
}
/* 删除文章 */
export const delAticle = (param) => {
  return httpPost('delAticle', param)
}
/* 打印测试接口 */
export const perPrint = (param) => {
  return httpPost('proList', param)
}
/* 分页查询文章 */
export const queryAticles = (param) => {
  return httpPost('selectAll', param)
}
/* 参数测试 */
export const queryParam = (param) => {
  return httpPost('index', param)
}
/* 获取token */
export const getToken = (param) => {
  return httpPost('getToken', param)
}
/* 阅读量 */
export const addReadNum = (param) => {
  return httpPost('addReadNum', param)
}
/* 点赞量 */
export const addGoodNum = (param) => {
  return httpPost('addGoodNum', param)
}
/* 添加评论 */
export const addComment = (param) => {
  return httpPost('AddComment', param)
}
/* 根据文章id查询文章 */
export const getArticleById = (param) => {
  return httpPost('getArticleById', param)
}
/* 根据文章id查询文章 */
export const getArticleById2 = (param) => {
  return httpPost('getArticleById2', param)
}
/* 添加子评论 */
export const AddCommentReply = (param) => {
  return httpPost('AddCommentReply', param)
}
/* 父评论点赞 */
export const addCommentGoodNum = (param) => {
  return httpPost('addCommentGoodNum', param)
}
/* 查询子评论 */
export const queryCommentReply = (param) => {
  return httpPost('queryCommentReply', param)
}
/* 公众号 自定义菜单设置 */
export const setWx = (param) => {
  return httpPost('setWx', param)
}
/* markdown图片处理 */
export const addMarkImage = (param) => {
  return httpFile('file/upload', param)
}
/* markdown图片处理删除 */
export const dleEditorImgDel = (param) => {
  return httpPost('deleteAticleImage', param)
}
/* markdown图片处理删除 */
export const uploadStr = (param) => {
  return httpPost('file/uploadStr', param)
}
