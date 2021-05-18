// -- Меню на мобильном -- //
let navMain = document.querySelector('.main-nav');
let navButtonToggle = document.querySelector('.main-nav__button');
let pageHeader = document.querySelector('.page-header');

// проверка на выключенный javascript
navMain.classList.remove('main-nav--nojs');
pageHeader.classList.remove('page-header--nojs');

// переключатель по клику
navButtonToggle.addEventListener('click', () => {
  navMain.classList.toggle('main-nav--opened');
  navMain.classList.toggle('main-nav--closed');
  pageHeader.classList.toggle('page-header--opened');
  pageHeader.classList.toggle('page-header--closed');
});

// -- Отключает заглушку-карту при загрузке JS -- //
let mapImage = document.getElementById('map__image');
let mapIframe = document.getElementById('map__iframe');
mapImage.classList.remove('map__image--nojs');
mapIframe.classList.remove('map__iframe--nojs');


//-- простой слайдер по клику - переключатель состояния кота -- //

let slimCat = document.getElementById('slimcat');
if (slimCat) {
  let availableScreenWidth = window.screen.availWidth;
  let mediumCat = document.getElementById('medium');
  let fatCat = document.getElementById('fatcat');
  let beforeToggle = document.getElementById('before');
  let afterToggle = document.getElementById('after');
  let circleEl = document.getElementById('circle');

  if (availableScreenWidth > 767) {
    mediumCat.classList.remove('range__picture--noshow');
    mediumCat.classList.add('range__picture--show');
    fatCat.classList.add('range__picture--noshow');
    fatCat.classList.remove('range__picture--show');
  }

  beforeToggle.addEventListener('click', () => {
    afterToggle.classList.remove('range__button--disabled');

    if (fatCat.classList.contains('range__picture--noshow')) {
      if (mediumCat.classList.contains('range__picture--show')) {
        mediumCat.classList.toggle('range__picture--noshow');
        mediumCat.classList.toggle('range__picture--show');
        if (circleEl.classList.contains('range__toggle--medium')) {
          circleEl.classList.add('range__toggle--after');
        }
        circleEl.classList.toggle('range__toggle--medium');
        fatCat.classList.add('range__picture--show');
        fatCat.classList.remove('range__picture--noshow');
      }

      if (slimCat.classList.contains('range__picture--show')) {
        slimCat.classList.add('range__picture--noshow');
        slimCat.classList.remove('range__picture--show');
        if (circleEl.classList.contains('range__toggle--medium')) {
          circleEl.classList.add('range__toggle--after');
        }
        circleEl.classList.toggle('range__toggle--medium');
        mediumCat.classList.toggle('range__picture--show');
        mediumCat.classList.toggle('range__picture--noshow');
      }
    }

    if (fatCat.classList.contains('range__picture--show')) {
      beforeToggle.classList.add('range__button--disabled');
    }

    circleEl.classList.remove('range__toggle--after');
  });

  afterToggle.addEventListener('click', () => {
    beforeToggle.classList.remove('range__button--disabled');

    if (slimCat.classList.contains('range__picture--noshow')) {
      if (mediumCat.classList.contains('range__picture--show')) {
        mediumCat.classList.toggle('range__picture--noshow');
        mediumCat.classList.toggle('range__picture--show');
        if (circleEl.classList.contains('range__toggle--medium')) {
          circleEl.classList.add('range__toggle--after');
        }
        circleEl.classList.toggle('range__toggle--medium');
        slimCat.classList.add('range__picture--show');
        slimCat.classList.remove('range__picture--noshow');
      }

      if (fatCat.classList.contains('range__picture--show')) {
        fatCat.classList.add('range__picture--noshow');
        fatCat.classList.remove('range__picture--show');
        mediumCat.classList.toggle('range__picture--show');
        if (circleEl.classList.contains('range__toggle--medium')) {
          circleEl.classList.add('range__toggle--after');
        }
        circleEl.classList.toggle('range__toggle--medium');
        mediumCat.classList.toggle('range__picture--noshow');
      }
    }
    if (slimCat.classList.contains('range__picture--show')) {
      afterToggle.classList.add('range__button--disabled');
    }
  });
}
