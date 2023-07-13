/**
 * Date Utils
 *
 * @since 2018-03-29
 * @author kdydesign.kim
 */

import Moment from 'moment'
import {i18n} from '../plugins/i18n'

/**
 * Moment format 변경
 * @param val
 * @returns {string}
 */
function getLocalFormat (val) {
  let localFormat = 'YYYYMMDDHHmmss'
  let localDateStr = val.replace(/[/\s:-]/g, '')

  if (localDateStr.length === 4) {
    localFormat = 'YYYY'
  }

  if (localDateStr.length === 6) {
    localFormat = 'YYYYMM'
  }

  if (localDateStr.length === 8) {
    localFormat = 'YYYYMMDD'
  }

  if (localDateStr.length === 10) {
    localFormat = 'YYYYMMDDHH'
  }

  if (localDateStr.length === 12) {
    localFormat = 'YYYYMMDDHHmm'
  }

  return localFormat
}

/**
 * Client 기준 현재 시간 조회
 *
 * @param format
 * @returns {string}
 * @constructor
 */
export function clientDate (format = 'YYYY-MM-DD HH:mm:ss') {
  return Moment().format(format)
}

/**
 * 날짜 형식 변경
 *
 * @param val
 * @param format
 * @returns {string}
 */
export function formatDate (val, format = 'YYYY-MM-DD HH:mm:ss', localFormat = false) {
  let value = val

  if (val === void 0 || val === 'undefined') {
    value = Moment().format(format)
  }

  if (localFormat) {
    return Moment(value, getLocalFormat(value)).format(format)
  } else {
    return Moment(value).format(format)
  }
}

/**
 * 특정 날짜 구하기
 *
 * @param val
 * @param format
 * @returns {string}
 */
export function getStepDate (val, format = 'YYYY-MM-DD HH:mm:ss', step = 0, type = 'days') {
  return Moment(val).add(step, type).format(format)
}

/**
 * Quasar DateTimePicker format
 * 퀘이사 DateTimePicker의 형태로 변경
 *
 * @param value
 * @returns {string}
 */
export function quasarBuildFormat (value) {
  return Moment().set(value).toISOString()
}

/**
 * 1일 ~ 31일 데이터 생성
 *
 * @returns {Array}
 */
export function getAllDays () {
  let resultDays = []

  for (let i = 1; i <= 31; i++) {
    resultDays.push(`${i}${i18n.t('cmn.day')}`)
  }

  return resultDays
}

/**
 * 1월 ~ 12월 데이터 생성
 *
 * @returns {Array}
 */
export function getAllMonth () {
  let resultMonth = []

  for (let i = 1; i <= 12; i++) {
    resultMonth.push(`${i}${i18n.tc('cmn.month', 0)}`)
  }

  return resultMonth
}

/**
 * 날짜 비교
 * curr > target
 *
 * @param curr
 * @param target
 * @returns {boolean}
 */
export function compareIsAfter (curr, target, format = 'YYYY-MM-DD') {
  return Moment(curr).isAfter(formatDate(String(target), format))
}

/**
 * 날짜 비교
 * prevTarget < curr < nextTarget
 *
 * @param curr
 * @param target
 * @returns {boolean}
 */
export function compareIsBeetween (curr, prevTarget, nextTarget, format = 'YYYY-MM-DD') {
  return Moment(curr).isBetween(formatDate(String(prevTarget), format), formatDate(String(nextTarget), format))
}

/**
 * 시간 차이
 *
 * @param startDateTime
 * @param startDateTime
 * @param type
 * @returns {number}
 */
export function dateTimeGap (startDateTime, endDateTime, type = 'seconds') {
  let diff = Moment.duration(Moment(startDateTime).diff(endDateTime))

  if (type === 'years') {
    return diff.asYears()
  }

  if (type === 'months') {
    return diff.asMonths()
  }

  if (type === 'days') {
    return diff.asDays()
  }

  if (type === 'weeks') {
    return diff.asWeeks()
  }

  if (type === 'hours') {
    return diff.asHours()
  }

  if (type === 'minutes') {
    return diff.asMinutes()
  }

  if (type === 'seconds') {
    return diff.asSeconds()
  }
}

// 남은 시간 표현
export function getRemainTimeStr (gap) {
  gap = gap / 1000
  const d = Math.floor(gap / 86400)
  const h = Math.floor((gap - d * 86400) / 3600 % 3600)
  const m = Math.floor((gap - h * 3600) / 60 % 60)
  const s = Math.floor((gap - m * 60) % 60)

  if (d !== 0) {
    return `${d}${i18n.t('cmn.day')} ${i18n.tc('cmn.timeParams', 0, {time: h})} ${i18n.tc('cmn.timeParams', 1, {time: m})} ${i18n.tc('cmn.timeParams', 2, {time: s})}`
  } else if (h !== 0) {
    return `${i18n.tc('cmn.timeParams', 0, {time: h})} ${i18n.tc('cmn.timeParams', 1, {time: m})} ${i18n.tc('cmn.timeParams', 2, {time: s})}`
  } else if (m !== 0) {
    return `${i18n.tc('cmn.timeParams', 1, {time: m})} ${i18n.tc('cmn.timeParams', 2, {time: s})}`
  }
  return `${i18n.tc('cmn.timeParams', 2, {time: s})}`
}
