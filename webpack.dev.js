const webpack = require('webpack');
const {merge} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.common.js');

module.exports = (env, argv) => {
  argv.mode = 'development';
  const config = baseWebpackConfig(env, argv);

  return merge(config, {
    mode: argv.mode,
    // тип геренируемого файла маппинга на исходники
    devtool: 'inline-source-map',

    devServer: {
      port: 3000,
      hot: true,
      contentBase: config.externals.paths.dist,
    },

    plugins: [
      // горячая загрузка CSS без перезагрузки всей страницы
      new webpack.HotModuleReplacementPlugin(),
    ]
  });
};

/*
  hot: true,
  watchContentBase: true
*/
