export default {
  ssr: false,
  target: 'static',
  head: {
    title: 'Ben Wnuk - Portfolio',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Profesional Portfolio of Web Designer and Developer Ben Wnuk' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  googleFonts: {
    families: {
      OpenSans: true
    }
  },
  googleAnalytics: {
    id: 'UA-44676867-1'
  },
  css: [
    // 'normalize.css/normalize.css'
  ],
  plugins: [
    '~/plugins/mdi-icons.js'
  ],
  eslint: {
    cache: false
  },
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/google-analytics'
  ],
  modules: [
    '@nuxt/content'
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['mdi-vue']
  }
}
