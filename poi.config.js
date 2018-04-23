module.exports = {
  chainWebpack (config, { command = 'development' }) {
    config.module.rule('csv')
      .test(/\.csv$/)
      .use('raw')
        .loader('raw-loader')
  }
};
