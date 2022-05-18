module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://juansilva-001-site1.btempurl.com',
          pathRewrite: {'^/api' : ''}
        }
      }
    }
  }