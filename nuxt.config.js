import colors from 'vuetify/es5/util/colors'
require('events').EventEmitter.defaultMaxListeners = 10

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - wise-notes',
    title: 'wise-notes',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/api.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  /*
  ** Server Middleware
  */
  serverMiddleware: {
    // '/api': '~/api'
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://www.npmjs.com/package/@nuxtjs/markdownit
    '@nuxtjs/markdownit',
    // Doc: https://http.nuxtjs.org
    '@nuxt/http',
  ],
  // for inject markdown-it with call $md
  markdownit: {
    injected: true,
    preset: 'default',
    linkify: true,
    breaks: true,
    use: [
      'markdown-it-div',
      'markdown-it-attrs',
      'markdown-it-abbr',
      'markdown-it-container',
      'markdown-it-deflist',
      'markdown-it-emoji',
      'markdown-it-footnote',
      'markdown-it-for-inline',
      'markdown-it-ins',
      'markdown-it-mark',
      'markdown-it-sub',
      'markdown-it-sup',
    ]
  },

  env: {
    API_HOST: process.env.DEV_HOST,
    // API_HOST: process.env.PROD_HOST,
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
