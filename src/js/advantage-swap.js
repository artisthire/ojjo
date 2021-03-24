const ctrBtn = document.querySelector('[data-swap-block]');
const swapClass = 'show';

if (ctrBtn) {
  const swapContainer = document.querySelector(`.${ctrBtn.dataset.swapBlock}`);

  // сбрасываем фиксированную высоту контейнера после его распахивания на полную высоту в "auto"
  // для того, чтобы расспахнутый элемент при изменении разрешения экрана элемент автоматически изменял высоту
  // и кнопка переключения высоты элемента не "зависала" намного ниже текста
  swapContainer.addEventListener('transitionend', () => {
    if (swapContainer.classList.contains(swapClass)) {
      swapContainer.style.height = 'auto';
    }
  });

  ctrBtn.addEventListener('click', (evt) => {
    evt.preventDefault();

    // временное отключение ограничения высоты элемента для получения реального значения до которого нужно распахнуть
    swapContainer.style.height = 'auto';
    const fullHeight = swapContainer.offsetHeight;
    swapContainer.style.height = '';

    if (swapContainer.classList.contains(swapClass)) {
      swapContainer.style.height = '';
      swapContainer.classList.remove(swapClass);
      ctrBtn.textContent = 'Читать полностью';
    } else {
      // значение высоты устанавливаем inline-style, чтобы работала анимация элемента
      swapContainer.style.height = `${fullHeight}px`;
      swapContainer.classList.add(swapClass);
      ctrBtn.textContent = 'Скрыть';
    }
  });
}
