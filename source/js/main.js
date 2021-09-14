import Swiper from '../../node_modules/swiper/swiper-bundle.min.js';

/**
 * Swiper
 */
//Слайдер на главной странице
if (document.querySelector('.slider')) {
  new Swiper ('.swiper', {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 30,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      320: {
        slidesPerView: 2,
        slidesPerGroup: 2,

        pagination: {
          clickable: false,
          type: 'fraction',
          renderFraction: function (currentClass, totalClass) {
            return  '<span class="' + currentClass + '"></span>' +
                    ' of ' + '&nbsp;' +
                    '<span class="' + totalClass + '"></span>';
          },
        },
      },

      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,

        pagination: {
          clickable: true,
          type: 'bullets',
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        },
      },

      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
    },
  })
}

/**
 * Burger-menu
*/

const CLOSE_CLASS = '_close';
const OPEN__CLASS = '_open';
const burgerMenu = document.querySelector('.burger-menu');
const burgerToggle = burgerMenu.querySelector('.burger-menu__toggle');

burgerMenu.classList.add(CLOSE_CLASS);

burgerToggle.addEventListener('click', () => {
  burgerMenu.classList.toggle(CLOSE_CLASS);
  burgerMenu.classList.toggle(OPEN__CLASS);
});

/**
 * Dropout на главной
*/
if (document.querySelector('#dropout')) {
  const DROPOUT_DATA_ATTRIBUTE_NAME = 'data-dropout-number'
  const CLOSED_DROPOUT_CLASS = 'faq__item--closed';//класс закрытой выпадушки
  const START_ACTIVE_DROPOUT = 1; //выпадушка, активная после загрзки страницы
  //сохраним все выпадушки в массив и прономеруем их
  const dropouts = document.querySelectorAll('#dropout');
  for (let i=1;i<=dropouts.length; i++) {
    dropouts.forEach((dropout, index) => {
      dropout.setAttribute(DROPOUT_DATA_ATTRIBUTE_NAME, index+1)
    })
  }
  //закроем все выпадушки
  dropouts.forEach(dropout => {
    dropout.classList.toggle(CLOSED_DROPOUT_CLASS);
  })
  //определим номер открытой выпадушки
  let activeDropout = START_ACTIVE_DROPOUT;
  //откроем активную выпадушку
  dropouts[activeDropout-1].classList.toggle(CLOSED_DROPOUT_CLASS);
  //установим обработчики событий на все выпадушки, чтобы закрывать предыдущую выпадушки и открывать новую
  dropouts.forEach(dropout => {
    dropout.addEventListener('click', () => {
      //проверим является ли кликнутая выпадушка закрытой
      if (dropout.classList.contains(CLOSED_DROPOUT_CLASS)) {
        //откроем ее
        dropout.classList.remove(CLOSED_DROPOUT_CLASS)
        //проверим есть ли на данный момент другая открытая выпадушка(если клик происходит впервые после загрузки страницы - то такая выпадушка будет)
        if (activeDropout) {
          //закроем предыдущую открытую выпадушку
          dropouts[activeDropout-1].classList.toggle(CLOSED_DROPOUT_CLASS);
        }
        //сменим номер активной страницы на номер текущей
        activeDropout = dropout.getAttribute(DROPOUT_DATA_ATTRIBUTE_NAME)
      } else {
        //закроем выпадушку и присвоим значение null переменной хранящей номер активной страницы
        dropout.classList.add(CLOSED_DROPOUT_CLASS);
        activeDropout = null
      }
    })
  })
}

/**
 * dropouts на странице каталога
 */

if (document.querySelector('#filter-dropout')) {
  const CLOSED_DROPOUT_CLASS = 'filter__form-block--close';//класс закрытой выпадушки
  const START_ACTIVE_DROPOUTS = [1,4]; //выпадушка, активная после загрзки страницы
  //сохраним все выпадушки в массив и прономеруем их
  const dropouts = document.querySelectorAll('#filter-dropout');
  //закроем все выпадушки
  dropouts.forEach(dropout => {
    dropout.classList.toggle(CLOSED_DROPOUT_CLASS);
  })

  //откроем активные выпадушку
  dropouts[START_ACTIVE_DROPOUTS[0]-1].classList.toggle(CLOSED_DROPOUT_CLASS);
  dropouts[START_ACTIVE_DROPOUTS[1]-1].classList.toggle(CLOSED_DROPOUT_CLASS);
  //установим обработчики событий на все выпадушки
  dropouts.forEach(dropout => {
    dropout.addEventListener('click', () => {
      dropout.classList.toggle(CLOSED_DROPOUT_CLASS)
    })
  })
}

/**
 * Фильтр выпадушка
 */

if (document.querySelector('#filter')) {
  const CLOSED_FORM_FILTER_CLASS = 'filter--form-closed';
  const filter = document.querySelector('#filter');
  const filterToggle = filter.querySelector('#filter-toggle');

  filter.classList.toggle(CLOSED_FORM_FILTER_CLASS);

  filterToggle.addEventListener('click', () => {
    filter.classList.toggle(CLOSED_FORM_FILTER_CLASS);
  })


}

