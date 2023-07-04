/**
 * Locale Utils
 *
 * @since 2018-04-11
 * @author kdydesign.kim
 */

/**
 * get locales file
 * @param locales
 */
export function getLocaleMsg (locales) {
  let msgSet = {}

  _.forEach(locales, (locale) => {
    let localesMsg = {}

    try {
      localesMsg[locale] = {
        msg: require(`~/static/locales/${locale}/messages_${locale}.json`),
        cmn: require(`~/static/locales/${locale}/common_${locale}.json`),
        sm: require(`~/static/locales/${locale}/system_${locale}.json`),
        an: require(`~/static/locales/${locale}/analysis_${locale}.json`),
        da: require(`~/static/locales/${locale}/dashboard_${locale}.json`),
        lr: require(`~/static/locales/${locale}/logReport_${locale}.json`),
        op: require(`~/static/locales/${locale}/objectSecProfile_${locale}.json`),
        po: require(`~/static/locales/${locale}/securityPolicy_${locale}.json`),
        vp: require(`~/static/locales/${locale}/vpn_${locale}.json`),
        dash: require(`~/static/locales/${locale}/dashboard_${locale}.json`),
        vs: require(`~/static/locales/${locale}/virtualSystem_${locale}.json`),
        vl: require(`~/static/locales/${locale}/validate_${locale}.js`).default,
        proc: require(`~/static/locales/${locale}/process_${locale}.json`),
        billing: require(`~/static/locales/${locale}/billing_${locale}.json`),
        support: require(`~/static/locales/${locale}/support_${locale}.json`),
        ads: require(`~/static/locales/${locale}/admin_setting_${locale}.json`),
        opr: require(`~/static/locales/${locale}/operation_report_${locale}.json`),
        ses: require(`~/static/locales/${locale}/service_status_${locale}.json`),
        upm: require(`~/static/locales/${locale}/update_management_${locale}.json`),
        app: require(`~/static/locales/${locale}/application_processing_${locale}.json`),
        rpw: require(`~/static/locales/${locale}/reset_password_${locale}.json`),
        mn: require(`~/static/locales/${locale}/menu_${locale}.json`),
        lg: require(`~/static/locales/${locale}/login_${locale}.json`)
      }

      msgSet = _.assign(msgSet, localesMsg)
    } catch (err) {
      console.error('locales not found..')
    }
  })

  return msgSet
}
