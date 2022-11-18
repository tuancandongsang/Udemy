import AuthLogo from './extensions/mdo-logo.png'
import MenuLogo from './extensions/menu-logo.png'
import favicon from './extensions/favicon.ico'
export default {
  config: {
    auth: {
      logo: AuthLogo
    },
    head: {
      favicon: favicon
    },
    menu: {
      logo: MenuLogo
    },
    locales: [
      'es',
      'vi'
    ],
  },
  bootstrap(app) {
    console.log(app)
  }
}
