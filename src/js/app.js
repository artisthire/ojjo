/* eslint-disable no-shadow */
// общий код, который используется для закрытия модальных окон и мобильного меню при нажатии кнопки Escape
// классы для управления и идентификации состоянием открытия мобильного меню и модальных окон
const showMenuClass = 'show-menu';
const showModalClass = 'show-modal';
const hideScrollClass = 'hide-scroll';

// все модальные окна
const modalList = document.querySelectorAll('[id^="modal"]');

document.body.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape') {

    // если показывается только мобильное меню
    if (document.body.classList.contains(showMenuClass) && !document.body.classList.contains(showModalClass)) {
      // убираем меню
      document.body.classList.remove(showMenuClass);
      // разрешаем скроллинг страницы
      document.body.classList.remove(hideScrollClass);
    } else if (document.body.classList.contains(showModalClass)) {
      // если показывается модальное окно
      // скрываем все окна
      modalList.forEach((modal) => {
        modal.style.display = 'none';
      });

      // убираем класс показвающий, что открыто модально окно
      document.body.classList.remove(showModalClass);
      // а также убираем класс запрещающий скроллинг страницы, но только если до этого не показывалось мобильное меню
      // для которого также важен запрет прокручивания страницы
      if (!document.body.classList.contains(showMenuClass)) {
        document.body.classList.remove(hideScrollClass);
      }
    }
  }
});

// динамический импорт скриптов, которые обслуживают компоненты не на главной странице

// импорт компонента фильтра каталога товаров на странице каталога
const catalogFilterForm = document.querySelector('.js-catalog-filter-form');

if (catalogFilterForm) {
  import(/* webpackChunkName: "catalog-filter" */ './catalog-filter').then((module) => {
    const initCatalogFilterForm = module.default;

    initCatalogFilterForm(catalogFilterForm);
  });
}

// импорт компонента контактной геокарты на странице контактов
const mapWrapper = document.querySelector('.js-contact-map-container');

if (mapWrapper) {
  import(/* webpackChunkName: "contact-map" */ './contact-map').then((module) => {
    const initContactMap = module.default;

    initContactMap(mapWrapper);
  });
}

// импорт компонента галереи изображений товара на странице карточки товара
const thumbsGallery = document.querySelector('.js-thumbs-gallery');

if (thumbsGallery) {
  import(/* webpackChunkName: "thumbs-gallery" */ './thumbs-gallery').then((module) => {
    const initThumbsCallery = module.default;

    initThumbsCallery(thumbsGallery);
  });
}

// импорт компонента переключения высоты текстового блока при клике на кнопке "Читать полностью"
const showMoreBtn = document.querySelector('[data-swap-block]');

if (showMoreBtn) {
  import(/* webpackChunkName: "block-height-swap" */ './block-height-swap').then((module) => {
    const initBlockHeighSwap = module.default;

    initBlockHeighSwap(showMoreBtn);
  });
}
