/**
 * Main Store
 * 공통으로 사용될 요소
 *
 * @since 2017-12-12
 * @author kdydesign.kim
 */

export const state = () => ({
  locale: 'ko',
  locales: ['ko', 'en']
})

export const mutations = {
  setLang (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      // 언어값 변경
      state.locale = locale

      // 유효성 검사 다국어 변경
      this.app.i18n.locale = locale
      this._vm.$validator.localize(locale)
    }
  }
}

export const getters = {
  getCurrentLocale (state) {
    return state.locale
  }
}

export const strict = false
