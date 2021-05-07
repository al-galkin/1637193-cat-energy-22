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

//-- Ползунок-переключатель состояния кота -- //

//получаем координаты ползунка
function getCoords(elem) {
  // (1)
  let box = elem.getBoundingClientRect();

  let body = document.body;
  let docEl = document.documentElement;

  // (2)
  let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  // (3)
  let clientTop = docEl.clientTop || body.clientTop || 0;
  let clientLeft = docEl.clientLeft || body.clientLeft || 0;

  // (4)
  let top = box.top + scrollTop - clientTop;
  let left = box.left + scrollLeft - clientLeft;

  return {
    top: top,
    left: left
  };
}

// меняем местоположение ползунка
const availableScreenWidth = window.screen.availWidth;
let circleEl = document.getElementById('circle');
let parent = document.getElementById('circle_parent');
let parentParams = getCoords(parent);
let slimCat = document.getElementById('slimcat');
let fatCat = document.getElementById('fatcat');
let beforeToggle = document.getElementById('before');
let afterToggle = document.getElementById('after');

let listener = function(e) {
  let offset = 0;
  let circlePosition =  e.screenX;
  let circleWidth =  circleEl.offsetWidth/2;
  let sliderWidth = parent.offsetWidth;
  let minPoint = parentParams.left;
  let maxPoint = parentParams.left + sliderWidth;

  if(circlePosition > minPoint){
    offset = ((circlePosition - minPoint)/sliderWidth ) * 100;
  }

  if(circlePosition > maxPoint ){
    offset = 100;
  }

  offset = Math.round(offset);
  fatCat.style.width = offset+"%";
  slimCat.style.width = (100-offset)+"%";

  circleEl.style.left = "calc("+offset + "% - "+ circleWidth +"px";
};

if (availableScreenWidth > 768) { // на таблет и пк - бегунок по мыши
  circle.addEventListener('mousedown', e => {
    document.addEventListener('mousemove', listener);
  });

  document.addEventListener('mouseup', e => {
    document.removeEventListener('mousemove', listener);
  });
} else { //только на мобильном - простой слайдер по клику
  beforeToggle.addEventListener('touchend', () => {
    slimCat.classList.remove('range__slimcat--show');
    slimCat.classList.add('range__slimcat--noshow');
    fatCat.classList.remove('range__fatcat--noshow');
    fatCat.classList.add('range__fatcat--show');
    circleEl.classList.remove('range__toggle--after');
  });

  afterToggle.addEventListener('touchend', () => {
    slimCat.classList.remove('range__slimcat--noshow');
    slimCat.classList.add('range__slimcat--show');
    fatCat.classList.remove('range__fatcat--show');
    fatCat.classList.add('range__fatcat--noshow');
    circleEl.classList.add('range__toggle--after');
  });
}
