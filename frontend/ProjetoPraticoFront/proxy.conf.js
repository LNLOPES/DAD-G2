const PROXY_CONFIG = [
    {
        context:['/api'],
        target: 'http://victorgontijo-001-site1.htempurl.com',
        secure: false,
        changeOrigin: true,
        logLevel: 'debug',
        //pathRewrite: { '^/api': '' }
    }
    

];

module.exports = PROXY_CONFIG;