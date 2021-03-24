const catalogFilterForm = document.querySelector('.js-catalog-filter-form');
const currentPageInput = document.querySelector('.js-catalog-current-page');
const nexPageBtn = document.querySelector('.js-catalog-more-btn');

if (catalogFilterForm && currentPageInput) {
  // получение данных при подтверждении формы
  catalogFilterForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    getData(evt.target);
  });

  // получение данных при изменении параметров фильтра каталога
  catalogFilterForm.addEventListener('change', (evt) => {
    currentPageInput.value = '0';
    getData(evt.currentTarget);
  });
}

if (catalogFilterForm && nexPageBtn && currentPageInput) {
  nexPageBtn.addEventListener('click', (evt) => {
    evt.preventDefault();

    currentPageInput.value = parseInt(currentPageInput.value, 10) + 1;
    nexPageBtn.classList.add('pending');
    nexPageBtn.setAttribute('disabled', 'true');
    getData(catalogFilterForm)
      .then(() => {
        nexPageBtn.classList.remove('pending');
        nexPageBtn.removeAttribute('disabled');
      });
  });
}

// временная заглушка для отправки данных формы
function getData(form) {
  return fetch('https://httpbin.org/delay/5', {method: 'POST', body: new FormData(form)})
    .then((response) => response.json())
    .then((result) => console.log(result.form));
}
