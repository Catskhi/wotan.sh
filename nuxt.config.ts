// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
  ],

  css: ['~/assets/css/main.css'],

  googleFonts: {
    families: {
      'JetBrains Mono': [400, 500, 600, 700],
    },
    display: 'swap',
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
      { code: 'pt-BR', language: 'pt-BR', file: 'pt-BR.json', name: 'Portugues' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: '../i18n/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  content: {
    highlight: {
      theme: 'vitesse-dark',
      langs: ['javascript', 'typescript', 'python', 'bash', 'json', 'yaml', 'java', 'go', 'rust', 'sql', 'html', 'css', 'vue', 'dockerfile'],
    },
  },

  nitro: {
    prerender: {
      failOnError: false,
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: '0xw0tan',
      meta: [
        { name: 'description', content: 'Personal site and tech blog by 0xw0tan — backend engineering, security, and software craft.' },
        { name: 'theme-color', content: '#050505' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/wotan/skull_transparent.png' },
        { rel: 'alternate', type: 'application/rss+xml', title: '0xw0tan RSS Feed', href: '/rss.xml' },
      ],
      script: [
        {
          innerHTML: `(function(){try{var t=localStorage.getItem('theme');if(t&&t!=='catppuccin'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})()`,
          type: 'text/javascript',
          tagPosition: 'head',
        },
      ],
    },
  },
})
