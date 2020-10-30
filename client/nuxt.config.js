export default {
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: 'server',
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width,initial-scale=1,maximum-scale=2,minimum-scale=1'
            },
            {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge,chrome=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            },
            {
                rel: 'stylesheet',
                type: 'text/css',
                href: 'http://cdn.repository.webfont.com/webfonts/nomal/141631/19673/5f9b7ebff629d842f4358334.css'
            }
        ],
        script: [
            {
                src: 'http://at.alicdn.com/t/font_1925326_gnkn61atjn.js'
            }
        ]
    },
    /*
     ** Global CSS
     */
    css: [
        'element-ui/lib/theme-chalk/index.css',
        'element-ui/lib/theme-chalk/reset.css',
        '@/assets/scss/reset.scss'
    ],
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: [
        '@/plugins/element-ui',
        '@/plugins/axios',
        '@/plugins/navigation-guard',
        '@/plugins/tui_editor.client.js',
        '@/plugins/tui_viewer.client.js'
    ],
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: true,
    /**
     * 进度条样式
     */
    loading: '@/components/loading',
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios'
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        proxy: true,
        prefix: '/api',
        credentials: true
    },
    proxy: {
        '/api/': {
            target: 'http://127.0.0.1:8000',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/api'
            }
        }
    },
    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */
    build: {
        transpile: [/^element-ui/]
    },
    /**
     * set the port and the host
     */
    server: {
        port: 1919,
        host: '0.0.0.0'
    }
};
