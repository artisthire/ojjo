/* global __dirname */

const fs = require('fs');
const path = require('path');
// извлекает код CSS и SCSS в отдельные файлы в итоговой сборке
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// применяется для генерации html файлов на основе шаблонов
const HtmlWebpackPlugin = require('html-webpack-plugin');
// для копирования отдельных файлов, которые не обрабатываются loader-ами
const CopyPlugin = require('copy-webpack-plugin');

// содержит все пути нашей сборки
const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/'
};

// Собирает все файлы PUG для их обработки в HtmlWebpackPlugin
const PAGES_DIR = `${PATHS.src}/pug/pages`; // базовая директория для импорта файлов PUG
const PAGES = fs.readdirSync(PAGES_DIR).filter((fileName) => fileName.endsWith('.pug'));

// argv - используется для передачи параметров компиляции. Например флага production или development
module.exports = (_, argv) => (
  {
    // для доступа к переменным папок из других файлов конфигурации
    externals: {
      paths: PATHS
    },

    // без этой опции не работает Live-reload в текущей версии Webpack
    target: 'web',

    // точки входа
    entry: {
      app: `${PATHS.src}/index.js`
      // module: `${PATHS.src}/your-module.js`,
    },

    // [name] - файл будет называться как точки входа в enrty {}
    // [contenthash] - при каждой пересборке проекта добавляется хэш для защиты от кеширования браузерами
    // publickPath - для webpack-dev-server корневая директория, откуда сервер получает доступ к файлам
    output: {
      filename: `${PATHS.assets}js/[name].js`,
      path: PATHS.dist,
      publicPath: '/'
    },

    module: {
      rules: [
        {
          // JS
          // exclude - папки, которые не проходят через loader-ы, т.е в нашем случае не транспилируются Babel
          test: /\.(js)$/i,
          exclude: /(node_modules|bower_components)/,
          use: [
            'babel-loader'
          ]
        },

        {
          // PUG
          // используется pug-html-loader вместо pug-loader
          // для того, чтобы webpack брал в сборку картинки из PUG-файла
          // без необходимости писать их в формате require()
          test: /\.(pug)$/i,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: false,
                sources: {
                  list: [
                    '...',
                    {
                      tag: 'link', // не обрабатывать ресурсы в фавиконках и шрифтах
                      attribute: 'href',
                      type: 'src',
                      filter: () => false,
                    },
                    {
                      tag: 'meta', // не обрабатывать ресурсы в метатегах
                      attribute: 'content',
                      type: 'src',
                      filter: () => false,
                    },
                  ],
                }
              }
            },
            {
              loader: 'pug-html-loader',
              options: {
                pretty: true
              }
            },
          ]
        },

        {
          // CSS
          // postcss-loader - плагины и конфигурация для этого загрузчика берется из файла postcss.config.js
          test: /\.css$/i,
          use: [
            'style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false
              }
            },
            {
              loader: 'css-loader',
              options: {sourceMap: true}
            },
            {
              loader: 'postcss-loader',
              options: {sourceMap: true}
            }
          ]
        },

        {
          // SCSS
          // resolve-url-loader - используется для исправления путей в папке dist,
          // благодаря ему в исходниках адреса к картинкам можно писать как есть в папке src,
          // далее лоадер поправит как должно быть в dist
          test: /\.scss$/i,
          use: [
            argv.mode === 'development' ? 'style-loader' :
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  esModule: false
                }
              },
            {
              loader: 'css-loader',
              options: {sourceMap: true}
            },
            {
              loader: 'postcss-loader',
              options: {sourceMap: true}
            },
            {
              loader: 'resolve-url-loader',
              options: {sourceMap: true}
            },
            {
              loader: 'sass-loader',
              options: {sourceMap: true}
            }
          ]
        },

        {
          // Images
          // [ext] - сохранит расширение файлов
          test: /\.(gif|png|jpe?g|webp|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: `${PATHS.assets}img/[name][ext]`
          },
          use: [
            {
              loader: 'image-webpack-loader',
              options: {
                disable: argv.mode === 'development',
                mozjpeg: {
                  progressive: true,
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4
                },
                gifsicle: {
                  optimizationLevel: 2,
                  interlaced: true,
                },
                svgo: {
                  plugins: [
                    {removeUselessDefs: false}, // не удаляет symbol-теги в svg-спрайтах
                    {removeHiddenElems: {displayNone: false}}, // не удаляет весь код с display: none в svg-спрайтах
                    {cleanupIDs: {remove: false}}, // не удаляет symbol-теги в svg-спрайтах с неиспользуемым ID
                    {removeViewBox: false}, // не удалят viewbox
                    {removeDimensions: true} // заменяет width/height на viewBox
                  ]
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75
                }
              }
            },
          ],
        },

        {
          // Fonts
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          type: 'asset/resource',
          generator: {
            filename: `${PATHS.assets}fonts/[name][ext]`
          }
        },
      ]
    },

    plugins: [
      // выделяет в отдельные файлы код CSS
      new MiniCssExtractPlugin({
        filename: `${PATHS.assets}css/[name].css`
      }),
      // копирование файлов в папках, на которые могут быть ссылки из HTML-файлов,
      // которые не обрабатываются file-loader, а поэтому могут быть автоматически не скопированы
      new CopyPlugin({
        patterns: [
          {from: `${PATHS.src}/assets/favicons`, to: `${PATHS.assets}/favicons`},
        ]
      }),
      // берет файл из шаблона template и инжектит в него зависимости JS и CSS
      // использована обработка всех файлов PUG из директории исходников
      ...PAGES.map((page) =>
        new HtmlWebpackPlugin({
          minify: false,
          inject: true,
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page.replace(/\.pug/, '.html')}`
        })
      ),
    ],

    // в отдельные файлы 'vendors; выделяются все маломеняющиеся зависимости сторонних библиотек (вендров),
    // которые в выходной директории сохраняются как отдельный файлы vendor.js, vendor.css
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all'
          }
        }
      }
    },

    // добавляются алиасы на папки, которые можно использовать в директивах import внутри любых файлов проекта
    resolve: {
      alias: {
        '~': PATHS.src,
        '@': `${PATHS.src}/js`,
      }
    }
  });

/*
Части кода, которые не используются, но могут пригодиться
 {
          // PUG
          test: /\.(pug)$/i,
          use: [
            'pug-loader'
          ]
        },

{from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img`}

// горячая загрузка CSS без перезагрузки всей страницы
    new webpack.HotModuleReplacementPlugin()
*/
