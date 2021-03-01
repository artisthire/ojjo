# Сборка проекта

Перед запуском команды установки зависимостей проверить необходимость предустановленных в проекте зависимостей [normalize.css](https://www.npmjs.com/package/normalize.css).

При необходимости откорректировать следующие файлы:

  1. В **package.json** при необходимости удалить соответствующие значения в ключе *dependencies*;
  2. В файле **src/index.js** удалить импорт JS-файла зависимости, либо импорт функции инициализации зависимости из соотвествующего модуля в файле в папке **src/js/**;
  3. В файле **src/assets/scss/utils/_libs.scss** удалить импорт CSS|SCSS файлов со стилями ненужной зависимости

Далее запускаем команду `npm install` для первоначальной установки всех зависимостей для сборки проекта.  
Если нужны дригие зависимости, ставим их через `npm install --save-dev` или `npm install --save` соотвественно, если они нужны только для сборки проекта или если нужны для функционирования готовог проекта.

`npm start` - запускает сборку в режиме Production, файлы помещаются в директорию сборки проекта *dist*

`npm run dev` - запускает сборку в режиме Development, открывает в браузере хостинг стартовой страници с live-reload

`npm run server` - запускает "простой" сервер [http-server](https://www.npmjs.com/package/http-server), который обслуживает файлы из директории сборки проекта *dist*. Позволяет просматривать через браузер результат сборки проекта в режиме Production, но не имеет режима live-reload как призапуске сервера в режиме Development.

# Конфигурационные файлы

## Файлы конфигурации для редактора кода и плагинов

* **.babelrc** - конфиг для транскомпилятора Babel, которым обрабатываются все файлы JS
* **.browserslistrc** - конфиг для postcss плагинов, который устанавливает версии поддерживаемых браузеров
* **.editorconfig** - конфиг для редактора кода (отступы, кодировки...)
* **.eslintrc.yml** - конфиг для ESLinter, который проверяет качество написания кода JS
* **.gitignore** - перечень игнорируемых файлов и папок для загрузки на github
* **.jade-lintrc** - конфиг PUGLinter, который проверяет качество написания кода в PUG-файлах
* **.postcss-sorting.json** - конфиг для сортировки свойств в стилевых файла. Используется плагином редактора "PostCSS Sorting" для ручной сортировки.
* **.stylelintrc** - конфиг для CSSLinter, который проверяет качество написания кода CSS (SCSS)
* **postcss.config.js** - конфиг для автоматической обработки файлов CSS (SCSS) при сборке проекта PostCSS плагинами
* **package.json** - файл конфигурации проекта и списка зависимостей для NPM

## Конфигурационные файлы WEBPACK

* **webpack.common.js** - основной файл конфигурации WEBPACK, который используется совместно с более конкретными файлами для Production/Development. Для объединения файлов применяется [webpack-merge](https://www.npmjs.com/package/webpack-merge).
* **webpack.dev.js** - файл конфига для режима Development. Этот файл объединяется с основым конфигом *webpack.common.js* с помощью "webpack-merge" и запускается на выполнение командой `npm start`.
* **webpack.prod.js** - файл конфига для режима Production. Этот файл объединяется с основым конфигом *webpack.common.js* с помощью "webpack-merge" и запускается на выполнение командой `npm run dev`.
