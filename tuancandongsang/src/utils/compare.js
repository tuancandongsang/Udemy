const compareObject = function (original, target) {
  if (original === target) return true
  if (!(original instanceof Object) || !(target instanceof Object)) return false
  if (original.constructor !== target.constructor) return false

  for (const key in original) {
    if (!original.hasOwnProperty(key)) continue
    if (!target.hasOwnProperty(key)) return false
    if (original[key] === target[key]) continue
    if (typeof original[key] !== 'object') return false
    // this. 제거. Table Data compareObject 시 에러 보완.
    if (!compareObject(original[key], target[key])) return false
  }

  for (const key2 in target) {
    if (target.hasOwnProperty(key2) && !original.hasOwnProperty(key2)) return false
  }

  return true
}

export default compareObject
