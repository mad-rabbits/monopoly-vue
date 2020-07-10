const path = require('path')

module.exports = {
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  },
  devServer: {
    proxy: 'https://monopoly.local',
    before: app => {
      app.set('etag', 'strong')
      app.use((req, res, next) => {
        res.set('Cache-Control', 'must-revalidate')
        next()
      })
    }
  }
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/main.scss'),
      ],
    })
}