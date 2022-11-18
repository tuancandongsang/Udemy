import i18n from './config/i18n';
import constants from './config/constants';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // target: "server",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'MDO - %s',
    title: 'Nền tảng chuyển đổi số doanh nghiệp',
    htmlAttrs: {
      lang: 'vi'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'facebook-domain-verification', content: 'rrcux7rof3mgjvl52xahwspi7b7igl'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'},
      {name: 'title', content: 'MDO - Nền tảng chuyển đổi số doanh nghiệp'},
      {
        name: 'description',
        content: 'MDO là giải pháp chuyển đổi số cho doanh nghiệp, giúp doanh nghiệp trở nên khác biệt trong vận hành, tối ưu nguồn lực và đạt được mục tiêu kinh doanh.'
      },
      {
        name: 'facebook-domain-verification',
        content: 'w48br5j8pryafh07ypm384iic94cmu'
      },
      {
        property: 'og:image',
        content: 'https://mdo.com.vn/_nuxt/img/banner.47a5429.png'
      },
      {
        property: 'twitter:title',
        content: 'Nền tảng chuyển đổi số doanh nghiệp'
      },
      {
        property: 'twitter:image',
        content: 'https://mdo.com.vn/_nuxt/img/banner.47a5429.png'
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image'
      }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400;500;600;700&display=swap'
      },
      {
        rel: 'canonical',
        href: 'https://mdo.com.vn/'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/app.scss',
    {src: 'flag-icon-css/css/flag-icons.css', lang: 'css'}
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/persistedState.client.js',
    '~/plugins/vee-validate',
    '~/plugins/facebook-chat'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'nuxt-animejs',
    [
      '@nuxtjs/i18n',
      {
        vueI18nLoader: true,
        defaultLocale: 'vn',
        vueI18n: i18n
      }
    ]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    // customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#00BCD4',
          secondary: '#011A22',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00'
        }
      }
    }
  },
  axios: {
    // baseURL: "https://mailer-vanphongso.herokuapp.com",
    // baseURL: "http://localhost:3001",
  },
  modules: [
    [
      'nuxt-vuex-localstorage',
      {
        localStorage: ['localStorage']
      }
    ],
    '@nuxtjs/gtm',
    '@nuxtjs/axios',
    '@nuxtjs/markdownit'
  ],
  gtm: {
    id: 'GTM-M4FQLSS',
    enabled: true
  },
  publicRuntimeConfig: {
    gtm: {
      id: 'GTM-M4FQLSS'
    }
  },
  markdownit: {
    preset: 'default',
    linkify: true,
    html: true,
    breaks: true,
    use: ['markdown-it-div', 'markdown-it-attrs'],
    runtime: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  // /^nuxt-gmaps($|\/)/
  build: {
    transpile: ['nuxt-vuex-localstorage', 'vee-validate/dist/rules'],
    postcss: null,
    extend(config, ctx) {
    }
  }
};
