/*
 *@Author: zhangW
 *@Date: 2021-04-22 20:33:46
 *@Description: 传输层加密base64
 */
const CryptoJS = require('crypto-js')
const key = CryptoJS.enc.Utf8.parse('0880076B18D7EE81') // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('CB3EC842D7C69578') // 十六位十六进制数作为密钥偏移量
/*
 *@Author: zhangW
 *@Date: 2021-04-22 20:34:16
 *@Param: data
 *@Description:加密
 */
export function aesEncrypt(data) {
  const encryptResult = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7 // 后台用的是pad.Pkcs5,前台对应为Pkcs7
  })
  return CryptoJS.enc.Base64.stringify(encryptResult.ciphertext)
}

/*
 *@Author: zhangW
 *@Date: 2021-04-22 20:34:30
 *@Param: key
 *@Description:解密
 */
export function aesDecrypt(data) {
  const decryptResult = CryptoJS.AES.decrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Utf8.stringify(decryptResult)
}
