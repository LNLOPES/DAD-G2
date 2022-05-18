const PROXY_CONFIG = [
    {
        context:['/api'],
        target: 'http://juansilva-001-site1.btempurl.com',
        secure: false,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '' }
    }
    

];

module.exports = PROXY_CONFIG;