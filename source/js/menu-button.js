let navMain = document.querySelector('.main-nav');
let navButtonToggle = document.querySelector('.main-nav__button');
let pageHeader = document.querySelector(".page-header");

// если выключен javascript
navMain.classList.remove('main-nav--nojs');
pageHeader.classList.remove("page-header--nojs");

// переключатель по клику
navButtonToggle.addEventListener('click', () => {
  navMain.classList.toggle('main-nav--opened');
  navMain.classList.toggle("main-nav--closed");
  pageHeader.classList.toggle("page-header--opened");
  pageHeader.classList.toggle("page-header--closed");
});
