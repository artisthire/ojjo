// обработка переключения изображений в галерее карточки товара

const fullImgContainerClass = 'js-thumbs-img-container';
const thumbLinkClass = 'js-thumbs-img-link';
const activeClass = 'show';

// общий контейнер галереи
const thumbsGallery = document.querySelector('.js-thumbs-gallery');
// значение используется для предотвращения смены большой картинки
// если не был изменен фокус на другую картинку в миниатюрах
let prevSrc = null;

if (thumbsGallery) {
  // контейнер для больших картинок
  const imgContainer = document.querySelector(`.${fullImgContainerClass}`);
  const fullImg = imgContainer.querySelector('img');
  // для анимации смены картинок создается клон исходной большой картинки
  const cloneFullImg = fullImg.cloneNode();
  // у клона убирается класс показа
  cloneFullImg.classList.remove(`${activeClass}`);
  // и он добавляется в общий контейнер
  imgContainer.append(cloneFullImg);

  // для всех ссылок предотвращается переход
  thumbsGallery.addEventListener('click', (evt) => {
    if (evt.target.closest(`.${thumbLinkClass}`)) {
      evt.preventDefault();
    }
  });

  // при наведении на ссылку с миниатюрой меняется "большое изображение"
  thumbsGallery.addEventListener('mouseover', (evt) => {
    const imgLink = evt.target.closest(`.${thumbLinkClass}`);

    if (imgLink) {
      setImgSrc(imgLink, fullImg, cloneFullImg);
    }
  });

  // также при фокуссировке с клавиатуры меняется "большое изображение"
  thumbsGallery.addEventListener('focusin', (evt) => {
    const imgLink = evt.target.closest(`.${thumbLinkClass}`);

    if (imgLink) {
      setImgSrc(imgLink, fullImg, cloneFullImg);
    }
  });
}

// функция смены изображения "большой картинки" при фокусировке на миниатюре
// imgLink - элемент с миниатюрой, который попал в фокус
// firstImg - первое изображение в блоке с "большими" изображениями
// secondImg - второе изображение в блоке с "большими" изображениями
// два изображения используются для анимированного перехода между ними
function setImgSrc(imgLink, firstImg, secondImg) {
  // значение нового src для "большой" картинки берется из аттрибута href ссылки миниатюры
  const currentSrc = imgLink.getAttribute('href');

  // предотвращает анимацию смены "большой картинки", если выполнен фокус на той же миниатюре, что и до этого
  if (currentSrc === prevSrc) {
    return;
  }

  // сохраняем значение src для дальнейшего контроля был ли фокус на новой миниатюре
  prevSrc = currentSrc;

  // если сейчас отображается первая картинка в блоке "больших изображений"
  // скрываем ее и показываем вторую, установив соответствующее значение src, взяное из ссылки на миниатюру
  if (firstImg.classList.contains(`${activeClass}`)) {
    firstImg.classList.remove(`${activeClass}`);
    secondImg.setAttribute('src', currentSrc);
    secondImg.classList.add(`${activeClass}`);
  // иначе наоборот, срываем вторую, а показываем первую картинку
  } else {
    secondImg.classList.remove(`${activeClass}`);
    firstImg.setAttribute('src', currentSrc);
    firstImg.classList.add(`${activeClass}`);
  }
}

