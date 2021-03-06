// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      'axios',
      'vuelidate'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons'
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: true,
    vendor: {
      add: [],
      remove: []
    },
    build: {
      env: ctx.dev
        ? { // so on dev we'll have
          API: JSON.stringify('http://localhost:3005/v1'),
          STATIC_IMG: JSON.stringify('http://localhost:3005/public')
        }
        : { // and on build (production):
          API: JSON.stringify('https://restaurant-review-api.gegeraptor.com/api/v1'),
          STATIC_IMG: JSON.stringify('https://restaurant-review-api.gegeraptor.com/public')
        },
      scopeHoisting: true,
      vueRouterMode: 'history',
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // useNotifier: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QAlert',
        'QLayout',
        'QInput',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QRating',
        'QToolbar',
        'QToolbarTitle',
        'QTooltip',
        'QChip',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QItemTile',
        'QItemSeparator',
        'QTabs',
        'QTab',
        'QRouteTab',
        'QSelect',
        'QSpinnerRings',
        'QTabPane',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions'
      ],
      directives: [
        'Ripple',
        'GoBack',
        'TouchSwipe',
        'CloseOverlay'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Loading'
      ]
    },
    // animations: 'all' --- includes all animations
    animations: [
      'bounceInLeft',
      'bounceOutRight'
    ],
    pwa: {
      cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
      manifest: {
        name: 'Restaurant reviews',
        short_name: 'Resto revues',
        description: 'reviews of restaurants',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/android-icon-36x36.png',
            'sizes': '36x36',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/android-icon-48x48.png',
            'sizes': '48x48',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/android-icon-72x72.png',
            'sizes': '72x72',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/android-icon-96x96.png',
            'sizes': '96x96',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/android-icon-144x144.png',
            'sizes': '144x144',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/android-icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/apple-icon-57x57.png',
            'sizes': '57x57',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/apple-icon-60x60.png',
            'sizes': '60x60',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/apple-icon-72x72.png',
            'sizes': '72x72',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/apple-icon-114x114.png',
            'sizes': '114x114',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/apple-icon-144x144.png',
            'sizes': '144x144',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/apple-icon-180x180.png',
            'sizes': '180x180',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      extendWebpack (cfg) {
        // do something with cfg
      },
      packager: {
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      }
    },

    // leave this here for Quasar CLI
    starterKit: '1.0.2'
  }
}
