import tips from './tips'
import enumList from './enum'

export default (function () {
  var locales = {}

  locales.id = 'zh_CN'
  /**
   * fields/messages for example $field('xxxx')/$msg('xxxx') or
   * $locale.FIELDS.xxxx/$locale.MESSAGES.xxxx
   * $msg('IdType')[form.idType]
   */

  /**
   * 全局温馨提示引入
   * */
  locales.TIPS = tips
  /**
   * this.$enum('Sex')[form.sex]
   * @description:枚举
   * @param {type}
   * @return {type}
   */
  locales.ENUMList = enumList
  return locales
})()
