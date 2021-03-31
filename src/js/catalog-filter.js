import {swapPendingStatusBtn} from './utils';

const containerClass = 'js-field-container';
const fieldClass = 'js-field-swap-block';
const swapFieldBtnClass = 'js-field-show-btn';
const submitBtnClass = 'js-field-btn-submit';
const resetBtnClass = 'js-field-btn-reset';
const hideSwapFieldClass = 'collapsed';
// css-переменная, используемая для динамического изменения положения декоративного треугольника
// у выпадающего поля фильтра товаров.
// Нужна для изменения позиции декоративного треугольника если поле фильтрации выходит за границы окна
const arrowFieldCssProp = '--left-shift';

const catalogFilterForm = document.querySelector('.js-catalog-filter-form');
const fieldContainers = document.querySelectorAll(`.${containerClass}`);
const currentPageInput = document.querySelector('.js-catalog-current-page');
const nextPageBtn = document.querySelector('.js-catalog-more-btn');

// переменная, хранящая статус отправки данных на сервер
// используется для отмены повторной отправки пока отправляются предыдущие данные
let isSendingData = false;

if (catalogFilterForm) {
  // получение данных при подтверждении формы
  catalogFilterForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    isSendingData = true;
    getData(new FormData(evt.target))
      .finally(() => {
        isSendingData = false;
      });
  });

  // обработка отправки формы нажатием клавишы Enter
  catalogFilterForm.addEventListener('keydown', (evt) => {
    if (evt.code === 'Enter') {
      // находим открытое поле (которое не содержит класс 'collapsed')
      const activeField = document.querySelector(`.${fieldClass}:not(.${hideSwapFieldClass})`);

      if (activeField && !isSendingData) {
        // предотвращаем отправку формы через Enter
        evt.preventDefault();
        // находим кнопку подтверждения в активном поле и делаем клик на ней (для типизации обработки отправки)
        const submitBtn = activeField.querySelector(`.${submitBtnClass}`);
        submitBtn.click();
      }
    }
  });

  // устанавливается один обработчик на каждом контейнере фильтра товаров
  // и обрабатывает клик на всех кнопках управления внутри контейнера (делегирование)
  fieldContainers.forEach((container) => {
    container.addEventListener('click', (evt) => {
      // переменные элементов управления
      // переопределяются относительно контейнера внутри которого произошел клик
      const swapField = container.querySelector(`.${fieldClass}`);
      const swapBtn = container.querySelector(`.${swapFieldBtnClass}`);
      const resetBtn = container.querySelector(`.${resetBtnClass}`);
      const submitBtn = container.querySelector(`.${submitBtnClass}`);

      // если клик на кнопке показа блока фильтра
      if (swapBtn.contains(evt.target) && !isSendingData) {
        evt.preventDefault();
        const target = evt.target;
        // ищем открытое поле фильтрации товаров (не содержащее класс 'collapsed')
        const showedFild = document.querySelector(`.${fieldClass}:not(.${hideSwapFieldClass})`);
        // если есть открытое поле
        if (showedFild) {
          const showedFildContainer = showedFild.parentElement;

          // но мы пытаемся открыть другое (кликаем вне контейнера уже открытого)
          if (!showedFildContainer.contains(target)) {
            // скрываем предыдущее открытое поле
            hideSwapField(showedFildContainer.querySelector(`.${swapFieldBtnClass}`), showedFild);
          }
        }

        // показать/скрыть текущее поле, которым управляет кнопка
        if (swapField.classList.contains(hideSwapFieldClass)) {
          showSwapField(target, swapField);
        } else {
          hideSwapField(target, swapField);
        }
      }

      // если клик на кнопке сброса значений input
      if (resetBtn.contains(evt.target)) {
        evt.preventDefault();
        // если данные формы сейчас не отправляются
        if (!isSendingData) {
          // сбрасываем значения input-ов в открытом поле фильтрации
          resetInputs(swapField);
        }
      }

      // если клик на кнопке подтверждения отравки формы
      if (submitBtn.contains(evt.target) && !isSendingData) {
        evt.preventDefault();
        const target = evt.target;
        isSendingData = true;

        // при каждом подтверждении фильтрации товаров сбрасываем значение номера отображаемой страницы товаров
        // делается, чтобы при изменении фильтров отображение товаров начиналось с первого соответствующего фильтру
        if (currentPageInput) {
          currentPageInput.value = 0;
        }

        // временно отключаем возможность переключения следующей страницы отображаемого фильтра товаров
        if (nextPageBtn) {
          nextPageBtn.setAttribute('disabled', 'disabled');
        }

        const formData = new FormData(catalogFilterForm);
        // временно отключаем возможность изменения полей формы до того как она будет оправлена на сервер
        container.setAttribute('disabled', 'disabled');

        // анимация "ожидания" кнопки подтверждения отправки формы
        swapPendingStatusBtn(target, {isPending: true});

        // отправяем форму с новым фильтром
        getData(formData)
          .finally(() => {
            // убираем ожидающий статус
            swapPendingStatusBtn(target, {isPending: false});
            // скрываем поле фильтра
            hideSwapField(swapBtn, swapField);
            // включаем возможность изменения полей формы после отправки данных на сервер
            container.removeAttribute('disabled');

            // включаем возможность переключения следующей страницы после отправки текущих данных
            if (nextPageBtn) {
              nextPageBtn.removeAttribute('disabled');
            }

            // сбрасываем статус отправки данных формы
            isSendingData = false;
          });
      }
    });
  });
}

if (catalogFilterForm && nextPageBtn && currentPageInput) {
  // обработка клика по кнопке переключения на "следующую страницу"
  nextPageBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    // увеличиваем номер текущий страницы выбора товаров
    // сохраняем это значение в скрытом поле формы выбора товаров
    currentPageInput.value = parseInt(currentPageInput.value, 10) + 1;
    swapPendingStatusBtn(nextPageBtn, {isPending: true});
    isSendingData = true;
    // отправляем запрос на сервер с новым значением номера страницы выбора товаров
    getData(new FormData(catalogFilterForm))
      .finally(() => {
        swapPendingStatusBtn(nextPageBtn, {isPending: false});
        isSendingData = false;
      });
  });
}

// функция сброса значений input-ов внутри поля фильтрации товаров
// при клике на кнопке "Сброс"
function resetInputs(field) {
  // получаем все элементы полей ввода
  const inputs = field.querySelectorAll('input');

  inputs.forEach((input) => {
    // для чекбоксов и радиокнопок сбрасываем флажок
    if (['radio', 'checkbox'].includes(input.type)) {
      input.checked = false;
    // для других "текстовых" полей удаляем введенные значения
    } else if (['text', 'email', 'number', 'range', 'search'].includes(input.type)) {
      input.value = '';
    }
  });
}

// функция показа поля фильтра товаров
function showSwapField(btn, swapField) {
  // для показа поля убирается класс 'collapsed'
  swapField.classList.remove(hideSwapFieldClass);
  // проверяем выходит ли поле за границы окна браузера (появляется ли горизонтальная прокрутка)
  const windowOverflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
  // если поле выходит за границы
  if (windowOverflow > 1) {
    // сдвигаем поле так, чтобы правая граница касалась края экрана
    swapField.style.left = `-${windowOverflow}px`;
    // также сдвигается положение псевдоэлемента (декоративного треугольника сверху поля)
    // положение псевдоэлемента задается через css-переменную
    swapField.style.setProperty(`${arrowFieldCssProp}`,
        parseInt(getComputedStyle(swapField).getPropertyValue(`${arrowFieldCssProp}`), 10) + windowOverflow + 'px'
    );
  }

  // меняем значения aria-атрибута
  btn.setAttribute('aria-expanded', true);
  // добавляем обработчик клика вне поля фильтрации
  document.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onBodyKeydown);
}

// функция сокрытия поля фильтра товаров
function hideSwapField(btn, swapField) {
  // для сокрытия поля добавляется класс 'collapsed'
  swapField.classList.add(hideSwapFieldClass);
  // возвращаем значения сдвига в исходное положение
  // сдвиг мог поменятся при открытии, чтобы границы поля не выходили за пределы окна браузера
  swapField.style.left = '';
  swapField.style.setProperty(`${arrowFieldCssProp}`, '');
  // устанавливаем arai-атрибут
  btn.setAttribute('aria-expanded', false);
  // убираем обработчик клика вне поля
  document.removeEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onBodyKeydown);
}

// обработка клика вне поля формы
function onBodyClick(evt) {
  if (!evt.target.closest(`.${containerClass}`) && !isSendingData) {
    // находим открытое поле (которое не содержит класс 'collapsed')
    const activeField = document.querySelector(`.${fieldClass}:not(.${hideSwapFieldClass})`);
    const container = activeField.parentElement;
    const swapBtn = container.querySelector(`.${swapFieldBtnClass}`);

    // скрываем активное поле
    hideSwapField(swapBtn, activeField);
  }
}

// обработка закрытия поля фильтрации товаров при нажатии кнопки Escape
function onBodyKeydown(evt) {
  if (evt.code === 'Escape') {
    // находим открытое поле (которое не содержит класс 'collapsed')
    const activeField = document.querySelector(`.${fieldClass}:not(.${hideSwapFieldClass})`);

    // если есть открыто поле фильтрации и данные уже не отправляются
    if (activeField && !isSendingData) {
      const container = activeField.parentElement;
      const swapBtn = container.querySelector(`.${swapFieldBtnClass}`);

      // скрываем активное поле
      hideSwapField(swapBtn, activeField);
    }
  }
}

// временная заглушка для отправки данных формы
function getData(formData) {
  return fetch('https://httpbin.org/delay/3', {method: 'POST', body: formData})
    .then((response) => response.json())
    .then((result) => console.log(result.form))
    .catch((error) => console.log(error.message));
}
