export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
<<<<<<< HEAD
    title: "闲云旅游网", // 修改title
=======
    title: '世界上最大的旅游网站 - 闲云旅游',
>>>>>>> 57f94a562f4db958f3f4cc411e2516e4e461832d
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
<<<<<<< HEAD
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//at.alicdn.com/t/font_1168872_ehvuah8v57g.css'
      } // 新增全局字体样式
    ]
=======
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }, {
      rel: 'stylesheet',
      type: 'text/css',
      href: '//at.alicdn.com/t/font_1168872_ehvuah8v57g.css'
    }]
>>>>>>> 57f94a562f4db958f3f4cc411e2516e4e461832d
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
<<<<<<< HEAD
    'assets/main.css' // 新增自定义的页面过渡样式
=======
    'assets/main.css'
>>>>>>> 57f94a562f4db958f3f4cc411e2516e4e461832d
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
<<<<<<< HEAD
    '@/plugins/element-ui'
=======
    '@/plugins/element-ui',
    '@/plugins/axios', {
      src: '@/plugins/localStorage',
      ssr: false
    }
>>>>>>> 57f94a562f4db958f3f4cc411e2516e4e461832d
  ],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
<<<<<<< HEAD
    baseURL: "http://127.0.0.1:1337" // 新增axios默认请求路径
=======
    baseURL: "http://127.0.0.1:1337"
>>>>>>> 57f94a562f4db958f3f4cc411e2516e4e461832d
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
