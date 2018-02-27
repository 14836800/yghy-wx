var path = require('path')
module.exports = {
    devServer: {
        open: process.platform === 'darwin',
        host: '127.0.0.1',
        port: 8080,
        https: false,
        disableHostCheck: true,
        hotOnly: false,
        // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
        proxy: null, // string | Object
        before: app => { }
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
}