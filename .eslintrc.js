module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'eslint:recommended',
    'plugin:nuxt/recommended'
  ],
  // plugins: [
  //   '@babel'
  // ],
  // add your custom rules here
  rules: {
    'vue/script-indent': ['error', 'tab', { baseIndent: 1 }],
    'vue/html-indent': ['error', 'tab', { baseIndent: 1 }]
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
        'no-tabs': ['error', { allowIndentationTabs: true }]
      }
    }
  ]
}
