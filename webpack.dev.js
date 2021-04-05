const chokidar = require('chokidar');
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
      before(_, server) {
        chokidar.watch([
          `${config.externals.paths.src}/pug/**/*.pug`
        ]).on('all', function () {
          server.sockWrite(server.sockets, 'content-changed');
        });
      },
      port: 3000,
      publicPath: '/',
      contentBase: config.externals.paths.dist,
      hot: true
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
