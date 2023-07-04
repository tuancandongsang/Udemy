/**
 * Black-Swan i18n
 *
 * @since: 2017-11-23
 * @author: kdydesign.kim
 * @수정이력:
 * - 2018.04.04 ms1124.kim : Vue-validate config merge
 */

import {getLocaleMsg} from 'utils'

const i18nInstance = (VueI18n, locale, locales) => {
  return new VueI18n({
    locale: locale,
    fallbackLocale: 'en',
    messages: getLocaleMsg(locales),
    silentTranslationWarn: true
  })
}

export default i18nInstance
