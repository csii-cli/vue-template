// 打开浏览器全屏
export const toFullScreen = () => {
  const element = document.body
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen()
  }
}
// 是否数字
export const isNumber = function (value) {
  return typeof value === 'number'
}
/**
 * * @description
 * Determines if a reference is a `String`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `String`.
 */
export const isString = function (value) {
  return typeof value === 'string'
}
/**
 *
 * @description
 * Determines if a reference is undefined.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is undefined.
 */
export const isUndefined = function (value) {
  return typeof value === 'undefined'
}

/**
 * Parse a number (as a string) into three components that can be used
 * for formatting the number.
 *
 * (Significant bits of this parse algorithm came from https://github.com/MikeMcl/big.js/)
 *
 * @param  {string} numStr The number to parse
 * @return {object} An object describing this number, containing the following keys:
 *  - d : an array of digits containing leading zeros as necessary
 *  - i : the number of the digits in `d` that are to the left of the decimal point
 *  - e : the exponent for numbers that would need more than `MAX_DIGITS` digits in `d`
 *
 */
export const parse = function (numStr) {
  const MAX_DIGITS = 22
  const DECIMAL_SEP = '.'
  const ZERO_CHAR = '0'
  const exponent = 0
  let digits
  let numberOfIntegerDigits
  let i, j, zeros

  // Decimal point?
  if ((numberOfIntegerDigits = numStr.indexOf(DECIMAL_SEP)) > -1) {
    numStr = numStr.replace(DECIMAL_SEP, '')
  }

  // Exponential form?
  if ((i = numStr.search(/e/i)) > 0) {
    // Work out the exponent.
    if (numberOfIntegerDigits < 0) numberOfIntegerDigits = i
    numberOfIntegerDigits += +numStr.slice(i + 1)
    numStr = numStr.substring(0, i)
  } else if (numberOfIntegerDigits < 0) {
    // There was no decimal point or exponent so it is an integer.
    numberOfIntegerDigits = numStr.length
  }

  // Count the number of leading zeros.
  for (i = 0; numStr.charAt(i) === ZERO_CHAR; i++) {
    /* jshint noempty: false */
  }

  if (i === (zeros = numStr.length)) {
    // The digits are all zero.
    digits = [0]
    numberOfIntegerDigits = 1
  } else {
    // Count the number of trailing zeros
    zeros--
    while (numStr.charAt(zeros) === ZERO_CHAR) zeros--

    // Trailing zeros are insignificant so ignore them
    numberOfIntegerDigits -= i
    digits = []
    // Convert string to array of digits without leading/trailing zeros.
    for (j = 0; i <= zeros; i++, j++) {
      digits[j] = +numStr.charAt(i)
    }
  }

  // If the number overflows the maximum allowed digits then use an exponent.
  if (numberOfIntegerDigits > MAX_DIGITS) {
    digits = digits.splice(0, MAX_DIGITS - 1)
    exponent = numberOfIntegerDigits - 1
    numberOfIntegerDigits = 1
  }

  return {
    d: digits,
    e: exponent,
    i: numberOfIntegerDigits
  }
}

/**
 * Round the parsed number to the specified number of decimal places
 * This function changed the parsedNumber in-place
 */
export const roundNumber = function (parsedNumber, fractionSize, minFrac, maxFrac) {
  var digits = parsedNumber.d
  var fractionLen = digits.length - parsedNumber.i

  // determine fractionSize if it is not specified; `+fractionSize` converts it to a number
  fractionSize = isUndefined(fractionSize)
    ? Math.min(Math.max(minFrac, fractionLen), maxFrac)
    : +fractionSize

  // The index of the digit to where rounding is to occur
  var roundAt = fractionSize + parsedNumber.i
  var digit = digits[roundAt]

  if (roundAt > 0) {
    // Drop fractional digits beyond `roundAt`
    digits.splice(Math.max(parsedNumber.i, roundAt))

    // Set non-fractional digits beyond `roundAt` to 0
    for (var j = roundAt; j < digits.length; j++) {
      digits[j] = 0
    }
  } else {
    // We rounded to zero so reset the parsedNumber
    fractionLen = Math.max(0, fractionLen)
    parsedNumber.i = 1
    digits.length = Math.max(1, (roundAt = fractionSize + 1))
    digits[0] = 0
    for (var i = 1; i < roundAt; i++) digits[i] = 0
  }

  if (digit >= 5) {
    if (roundAt - 1 < 0) {
      for (var k = 0; k > roundAt; k--) {
        digits.unshift(0)
        parsedNumber.i++
      }
      digits.unshift(1)
      parsedNumber.i++
    } else {
      digits[roundAt - 1]++
    }
  }

  // Pad out with zeros to get the required fraction length
  for (; fractionLen < Math.max(0, fractionSize); fractionLen++) digits.push(0)

  // Do any carrying, e.g. a digit was rounded up to 10
  var carry = digits.reduceRight(function (carry, d, i, digits) {
    d = d + carry
    digits[i] = d % 10
    return Math.floor(d / 10)
  }, 0)
  if (carry) {
    digits.unshift(carry)
    parsedNumber.i++
  }
}

/**
 * Format a number into a string
 * @param  {number} number       The number to format
 * @param  {string} groupSep     The string to separate groups of number (e.g. `,`)
 * @param  {string} decimalSep   The string to act as the decimal separator (e.g. `.`)
 * @param  {[type]} fractionSize The size of the fractional part of the number
 * @return {string}              The number formatted as a string
 */
export const formatNumber = function (number, pattern, groupSep, decimalSep, fractionSize) {
  if (!(isString(number) || isNumber(number)) || isNaN(number)) return ''

  var isInfinity = !isFinite(number)
  var isZero = false
  var numStr = Math.abs(number) + ''
  var formattedText = ''
  var parsedNumber

  if (isInfinity) {
    formattedText = '\u221e'
  } else {
    parsedNumber = parse(numStr)

    roundNumber(parsedNumber, fractionSize, pattern.minFrac, pattern.maxFrac)

    var digits = parsedNumber.d
    var integerLen = parsedNumber.i
    var exponent = parsedNumber.e
    var decimals = []
    isZero = digits.reduce(function (isZero, d) {
      return isZero && !d
    }, true)

    // pad zeros for small numbers
    while (integerLen < 0) {
      digits.unshift(0)
      integerLen++
    }

    // extract decimals digits
    if (integerLen > 0) {
      decimals = digits.splice(integerLen, digits.length)
    } else {
      decimals = digits
      digits = [0]
    }

    // format the integer digits with grouping separators
    var groups = []
    if (digits.length >= pattern.lgSize) {
      groups.unshift(digits.splice(-pattern.lgSize, digits.length).join(''))
    }
    while (digits.length > pattern.gSize) {
      groups.unshift(digits.splice(-pattern.gSize, digits.length).join(''))
    }
    if (digits.length) {
      groups.unshift(digits.join(''))
    }
    formattedText = groups.join(groupSep)

    // append the decimal digits
    if (decimals.length) {
      formattedText += decimalSep + decimals.join('')
    }

    if (exponent) {
      formattedText += 'e+' + exponent
    }
  }
  if (number < 0 && !isZero) {
    return pattern.negPre + formattedText + pattern.negSuf
  } else {
    return pattern.posPre + formattedText + pattern.posSuf
  }
}
// 过滤非数字键盘和操作键盘 ie还是不能过滤
export const filterNumKey = function (event) {
  event = window.event || event
  const keyCode = event.keyCode
  if (keyCode >= 48 && keyCode <= 57) {
    event.returnValue = true
  } else {
    if ((keyCode >= 8 && keyCode <= 46) || keyCode == 144 || keyCode == 67 || keyCode == 86) {
      event.returnValue = true
    } else {
      event.returnValue = false
    }
  }
}
export const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}

export const toFixNumber = (num) => {
  // 去除千分位中的‘，’
  if (num) {
    let source = num.toString()
    source = source.replace(/,/gi, '')
    source = Number(source).toFixed(2)
    return Number(source)
  }
  return num
}

export const validEmail = (value) => {
  // 验证邮箱
  const reg =
    /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  return reg.test(value)
}
export const fileToBase64 = (val) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(val, 'UTF-8')
    reader.onload = () => {
      console.log('reader.content', reader.result)
      resolve(reader.result)
    }
  })
}
export const base64toFile = (dataUrl, filename = 'file') => {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const suffix = mime.split('/')[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  })
}
export const imgToBase64 = (url, outputFormat) => {
  return new Promise((resolve, reject) => {
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    var img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      var width = img.width
      var height = img.height

      // 压缩比例 -- 可以自己修改参数。500px宽度以下原尺寸，大于500px比例处理
      var bili = Math.round(width / 500) || 1
      var rate = 1 / bili
      canvas.width = width * rate
      canvas.height = height * rate
      ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate)
      var dataURL = canvas.toDataURL(outputFormat || 'image/jpeg')
      // 去除标头 -- 传递给后台时一般去除头部
      // var reg = new RegExp('^data:image/[^;]+;base64,');
      // dataURL = dataURL.replace(reg, '');
      canvas = null
      resolve(dataURL)
    }
    img.src = url
  })
}
