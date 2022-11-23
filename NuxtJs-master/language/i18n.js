import enMessage from './en.json'
import vnMessage from './vn.json'
// import { createI18n } from 'vue-i18n'

const messages ={
    vn:vnMessage,
    en:enMessage
}

// const i18n = createI18n({
//   locale: 'en',
//   allowComposition: true, // you need to specify that!
//   messages,
//   fallbackLocale:'vn'
// })
const i18n ={
  locale: 'en',
  allowComposition: true, // you need to specify that!
  messages,
  fallbackLocale:'en'
}

export default i18n
