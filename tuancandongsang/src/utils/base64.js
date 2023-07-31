/**
 * Base64 encode/decode utils
 *
 * @since 2018-07-17
 * @author kdydesign.kim
 */

const _KEYSTR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

/**
 * base64 encode
 *
 * @param value
 * @returns {string}
 */
export function base64Encode (value) {
  let
    t = '',
    n, r, i, s, o, u, a,
    f = 0

  value = base64UTF8Encode(value)

  while (f < value.length) {
    n = value.charCodeAt(f++)
    r = value.charCodeAt(f++)
    i = value.charCodeAt(f++)
    s = n >> 2
    o = (n & 3) << 4 | r >> 4
    u = (r & 15) << 2 | i >> 6
    a = i & 63

    if (isNaN(r)) {
      u = a = 64
    } else if (isNaN(i)) {
      a = 64
    }

    t = t + _KEYSTR.charAt(s) + _KEYSTR.charAt(o) + _KEYSTR.charAt(u) + _KEYSTR.charAt(a)
  }

  return t
}

/**
 * base64 decode
 *
 * @param value
 * @returns {*|string}
 */
export function base64Decode (value) {
  let
    t = '',
    n, r, i,
    s, o, u, a,
    f = 0

  value = value.replace(/[^A-Za-z0-9\\+\\/\\=]/g, '')

  while (f < value.length) {
    s = _KEYSTR.indexOf(value.charAt(f++))
    o = _KEYSTR.indexOf(value.charAt(f++))
    u = _KEYSTR.indexOf(value.charAt(f++))
    a = _KEYSTR.indexOf(value.charAt(f++))
    n = s << 2 | o >> 4
    r = (o & 15) << 4 | u >> 2
    i = (u & 3) << 6 | a
    t = t + String.fromCharCode(n)

    if (u !== 64) {
      t = t + String.fromCharCode(r)
    }

    if (a !== 64) {
      t = t + String.fromCharCode(i)
    }
  }

  t = base64UTF8Decode(t)

  return t
}

/**
 * base64 base64 utf8 encode
 *
 * @param value
 * @returns {string}
 */
export function base64UTF8Encode (value) {
  value = value.replace(/\r\n/g, '\n')

  let t = ''

  for (let n = 0; n < value.length; n++) {
    let r = value.charCodeAt(n)
    if (r < 128) {
      t += String.fromCharCode(r)
    } else if (r > 127 && r < 2048) {
      t += String.fromCharCode(r >> 6 | 192)
      t += String.fromCharCode(r & 63 | 128)
    } else {
      t += String.fromCharCode(r >> 12 | 224)
      t += String.fromCharCode(r >> 6 & 63 | 128)
      t += String.fromCharCode(r & 63 | 128)
    }
  }

  return t
}

/**
 * base64 base64 utf8 decode
 *
 * @param value
 * @returns {string}
 */
export function base64UTF8Decode (value) {
  let
    t = '',
    n = 0, r = 0, c2 = 0, c3 = 0

  while (n < value.length) {
    r = value.charCodeAt(n)
    if (r < 128) {
      t += String.fromCharCode(r)
      n++
    } else if (r > 191 && r < 224) {
      c2 = value.charCodeAt(n + 1)
      t += String.fromCharCode((r & 31) << 6 | c2 & 63)
      n += 2
    } else {
      c2 = value.charCodeAt(n + 1)
      c3 = value.charCodeAt(n + 2)
      t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63)
      n += 3
    }
  }

  return t
}
