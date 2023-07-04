import { createI18n } from 'vue-i18n';
import { DEFAULT_LANG } from '@/constants/index';
import en from '../../src/i18n/english.json';
import kr from '../../src/i18n/korea.json';

export const i18n = createI18n({
    locale: DEFAULT_LANG,
    fallbackLocale: DEFAULT_LANG,
    fallbackRoot: false,
    silentTranslationWarn: true,
    messages: {
        en,
        kr
    },
    missing(key) {
        // TODO
        return key;
    }
});

export function setupAndGetI18n(vueApp) {
    vueApp.use(i18n);
    return i18n;
}
