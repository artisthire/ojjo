// добавляет интерактивную карту на страницу с использованием 2GIS https://2gis.ru/

/* global DG*/
// для загруки кастомной иконки локации на карту
import '../assets/img/map-icon.png';

// контейнер, внутри которого размещается интерактивная карта
// и запасная картинка с картой, которая показывается, если JS не запустится
const mapWrapper = document.querySelector('.js-contact-map-container');

if (mapWrapper) {
  // резервная картинка, которая отображается, если не запустится скрипт
  const fallbackImg = mapWrapper.querySelector('.js-contact-map-fallback-img');
  // контейнер для размещения интерактивной карты
  const mapContainer = mapWrapper.querySelector('.js-contact-map');
  // ссылки в блоке Контактов, при клике на которые выполняется анимационный переход к нужной локации на карте
  const mapMarkerLinks = document.querySelectorAll('a[data-map-marker-id]');

  // координаты
  const coords = {
    center: [59.93073285638871, 30.357258332419047], // центр отображения карты
    marker1: [59.93011361514586, 30.369165267993417], // Главный офис
    marker2: [59.9281604552266, 30.347044810797435], // пр. Загородный, 145
    marker3: [59.92957406100327, 30.369268561806813] // пр. Невский, 142
  };

  // запускаем добавление карты
  DG.then(() => {
    const map = DG.map(mapContainer, {
      'center': coords.center,
      'zoom': 14
    });

    // кастомные иконки на карту
    const myIcon = DG.icon({
      iconUrl: './assets/img/map-icon.png',
      iconSize: [30, 30]
    });

    // добавляем группу адресов магазина
    const marker1 = DG.marker(coords.marker1, {icon: myIcon}).addTo(map)
      .bindLabel('Главный офис');
    const marker2 = DG.marker(coords.marker2, {icon: myIcon}).addTo(map)
      .bindLabel('пр. Загородный, 145');
    const marker3 = DG.marker(coords.marker3, {icon: myIcon}).addTo(map)
      .bindLabel('пр. Невский, 142');

    // объединяем маркеры в группу
    const group = DG.featureGroup([marker1, marker2, marker3]);
    group.addTo(map);
    // единый обработчик клика по группе, который помещает маркер по которому кликнули в центр карты
    group.on('click', (evt) => map.setView([evt.latlng.lat, evt.latlng.lng]));

    // добавляем обработку клика по ссылкам внутри блока Контактов
    if (mapMarkerLinks.length) {
      mapMarkerLinks.forEach((link) => {
        link.addEventListener('click', (evt) => {
          evt.preventDefault();
          // на основе аттрибута data-map-marker-id внутри ссылки получаем id маркера на который нужно перейти на карте
          const coordId = link.dataset.mapMarkerId;
          // выполняем плавный переход на карте к маркеру, id которого записано в ссылке
          // координаты маркера связываются через ID из data-map-marker-id и объекта координат coords
          // устанавливаем zoom = 17
          map.flyTo(coords[coordId], 17);
        });
      });
    }
  })
  .then(() => {
    // если скрипт сработает, нужно скрыть запасную картинку со статичной картой
    fallbackImg.style.display = 'none';
  });
}
