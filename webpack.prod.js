const webpack = require('webpack');
const {merge} = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const baseWebpackConfig = require('./webpack.common.js');

module.exports = (env, argv) => {
  argv.mode = 'production';
  const config = baseWebpackConfig(env, argv);

  return merge(config, {
    mode: argv.mode,
    // CleanWebpackPlugin - по умолчанию очищает папку с итогами сборки
    // указанную в опции output:path конфигурационного файла webpack
    plugins: [
      new CleanWebpackPlugin(),
      // выводит в консоль прогресс сборки проекта
      new webpack.ProgressPlugin({
        activeModules: false,
        entries: true,
        handler(percentage, message) {
          console.info(`${Math.trunc(percentage * 100)}%`, message);
        },
        modules: true,
        modulesCount: 5000,
        profile: false,
        dependencies: true,
        dependenciesCount: 10000,
        percentBy: null
      })
    ]
  });
};
