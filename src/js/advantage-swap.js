// обработка раскрытия на полную текстового описания в блоке преимуществ магазина

// кнопка управления раскрытием/сокрытием блока текстового описания
const ctrBtn = document.querySelector('[data-swap-block]');
// класс, который добавляется к текстовому блоку для его раскрытия на полную
const showDescriptionClass = 'show';

if (ctrBtn) {
  // текстовый блок которым управляет кнопка ищется по data-атрибуту этой кнопки
  const swapContainer = document.querySelector(`.${ctrBtn.dataset.swapBlock}`);

  // сбрасываем фиксированную высоту контейнера после его распахивания на полную высоту в "auto"
  // для того, чтобы расспахнутый элемент при изменении разрешения экрана элемент автоматически изменял высоту
  // и кнопка переключения высоты элемента не "зависала" намного ниже текста
  swapContainer.addEventListener('transitionend', () => {
    if (swapContainer.classList.contains(showDescriptionClass)) {
      swapContainer.style.height = 'auto';
    }
  });

  ctrBtn.addEventListener('click', (evt) => {
    evt.preventDefault();

    // временное отключение ограничения высоты элемента для получения полной величины высоты
    // до которого будет расспахнут блок описания
    swapContainer.style.height = 'auto';
    const fullHeight = swapContainer.offsetHeight;
    swapContainer.style.height = '';

    // если текст уже расскрыт на полную, сворачиваем его до исходного значения
    if (swapContainer.classList.contains(showDescriptionClass)) {
      swapContainer.style.height = '';
      swapContainer.classList.remove(showDescriptionClass);
      ctrBtn.textContent = 'Читать полностью';
    } else {
      // иначе расскрываем текстовое поле на полную
      // значение высоты устанавливаем в inline-style в пикселях, а не в классе в CSS
      // чтобы работала анимация плавного увеличения высоты элемента
      swapContainer.style.height = `${fullHeight}px`;
      swapContainer.classList.add(showDescriptionClass);
      // меняем текстовое содержание кнопки управления
      // чтобы текст внутри нее соотвествовал действию, которое выполнится при повторном клике
      ctrBtn.textContent = 'Скрыть';
    }
  });
}
