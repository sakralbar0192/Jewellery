import Swiper from '../../node_modules/swiper/swiper-bundle.min.js';

/**
 * Swiper
 */
//Слайдер на главной странице
if (document.querySelector('.slider')) {
  new Swiper ('.swiper', {
    slidesPerView: 2,
    slidesPerGroup: 2,
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
const NON_SCROLLING_BLOCK_CLASS = 'non-scrolling-block';
const burgerMenu = document.querySelector('.burger-menu');
const burgerToggle = burgerMenu.querySelector('.burger-menu__toggle');
const pageBody = document.querySelector('#page-body');
const burgerFocusElement = burgerMenu.querySelector('#burger-focus-   element');

burgerMenu.classList.add(CLOSE_CLASS);

burgerToggle.addEventListener('click', () => {
  pageBody.classList.toggle(NON_SCROLLING_BLOCK_CLASS);
  burgerMenu.classList.toggle(CLOSE_CLASS);
  burgerMenu.classList.toggle(OPEN__CLASS);
  if (burgerMenu.classList.contains(OPEN__CLASS)) {
    pageBody.classList.add(NON_SCROLLING_BLOCK_CLASS);

    window.addEventListener('keyup', (e) => {
      e.preventDefault();
      if ((e.code === 'Tab') && (!(burgerMenu.contains(document.activeElement)))){
        e.preventDefault();
        burgerFocusElement.focus();
      }
    })
  }else {
    pageBody.classList.remove(NON_SCROLLING_BLOCK_CLASS);
    window.removeEventListener('keyup', (e) => {
      e.preventDefault();
      if ((e.code === 'Tab') && (!(burgerMenu.contains(document.activeElement)))){
        e.preventDefault();
        burgerFocusElement.focus();
      }
    })
  }
});



/**
 * Dropout на главной
*/
if (document.querySelector('.dropout')) {
  const DROPOUT_DATA_ATTRIBUTE_NAME = 'data-dropout-number'
  const CLOSED_DROPOUT_CLASS = 'faq__item--closed';//класс закрытой выпадушки
  const START_ACTIVE_DROPOUT = 1; //выпадушка, активная после загрзки страницы
  //сохраним все выпадушки в массив и прономеруем их
  const dropouts = document.querySelectorAll('.dropout');
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
  //по клику
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
  //по нажатию enter
  dropouts.forEach(dropout => {
    dropout.addEventListener('keyup', (e) => {
      if (e.code === 'Enter') {
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
      }
    })
  })
}

/**
 * dropouts на странице каталога
 */

if (document.querySelector('.filter-dropout')) {
  const CLOSED_DROPOUT_CLASS = 'filter__form-block--close';//класс закрытой выпадушки
  const START_ACTIVE_DROPOUTS = [1,4]; //выпадушка, активная после загрзки страницы
  //сохраним все выпадушки в массив и прономеруем их
  const dropouts = document.querySelectorAll('.filter-dropout');
  //закроем все выпадушки
  dropouts.forEach(dropout => {
    dropout.classList.toggle(CLOSED_DROPOUT_CLASS);
  })

  //откроем активные выпадушку
  dropouts[START_ACTIVE_DROPOUTS[0]-1].classList.toggle(CLOSED_DROPOUT_CLASS);
  dropouts[START_ACTIVE_DROPOUTS[1]-1].classList.toggle(CLOSED_DROPOUT_CLASS);
  //установим обработчики событий на все выпадушки
  dropouts.forEach(dropout => {
    const dropoutToggle = dropout.querySelector('.filter-dropout-toggle')
    dropoutToggle.addEventListener('click', () => {
      dropout.classList.toggle(CLOSED_DROPOUT_CLASS);
    });
    dropoutToggle.addEventListener('keyup', (e) => {
      if (e.code === 'Enter') {
        dropout.classList.toggle(CLOSED_DROPOUT_CLASS);
      }
    });
  })
}

/**
 * Фильтр выпадушка
 */

if (document.querySelector('#filter')) {
  const CLOSED_FORM_FILTER_CLASS = 'filter--form-closed';
  const OPENED_FORM_FILTER_CLASS = 'filter--form-opened';
  const ESCAPE_KEY_CODE = 27;
  const filter = document.querySelector('#filter');
  const overlay = document.querySelector('#filter-overlay');
  const filterToggle = filter.querySelector('#filter-toggle');
  const filterCloseButton = filter.querySelector('#form-close-button');

  filter.classList.toggle(CLOSED_FORM_FILTER_CLASS);

  filterCloseButton.addEventListener('click', () => {
    if (filter.classList.contains(OPENED_FORM_FILTER_CLASS)) {
      filter.classList.remove(OPENED_FORM_FILTER_CLASS)
      filter.classList.add(CLOSED_FORM_FILTER_CLASS);
      pageBody.classList.remove(NON_SCROLLING_BLOCK_CLASS);
    }
  })

  filterToggle.addEventListener('click', () => {
    filter.classList.remove(CLOSED_FORM_FILTER_CLASS);
    filter.classList.add(OPENED_FORM_FILTER_CLASS);
    pageBody.classList.add(NON_SCROLLING_BLOCK_CLASS);


    window.addEventListener('keydown',(evt) => {
      if (evt.keyCode === ESCAPE_KEY_CODE){
        filter.classList.remove(OPENED_FORM_FILTER_CLASS);
        pageBody.classList.remove(NON_SCROLLING_BLOCK_CLASS);
        filter.classList.add(CLOSED_FORM_FILTER_CLASS);
      }
    }, {once: true});

  })

  overlay.addEventListener('click', () => {
    filter.classList.remove(OPENED_FORM_FILTER_CLASS);
    pageBody.classList.remove(NON_SCROLLING_BLOCK_CLASS);
    filter.classList.add(CLOSED_FORM_FILTER_CLASS);
  })
}

/**
* Сохранение в localStorage
*/

const saveFormDataInLocalStorage = () => {
  const form = document.querySelector('#login-form');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const emailField = form.querySelector('input[type="email"]')

    if (window.localStorage) {
      localStorage.setItem(emailField.name, emailField.value);
    }
  })
}

/**
 * Модальное окно
 */
if (document.querySelector('#modal-view-button')) {
  const OPEN_MODAL_CLASS = '_open';
  const ESCAPE_KEY_CODE = 27;
  const modal = document.querySelector('#modal');
  const focusField = modal.querySelector('input');
  const overlay = document.querySelector('#modal-overlay');
  const closeButton = document.querySelector('#close-modal-button');
  const modalViewButton = document.querySelector('#modal-view-button');

  modalViewButton.addEventListener('click', (e) => {
    e.preventDefault();
    saveFormDataInLocalStorage();
    modal.classList.add(OPEN_MODAL_CLASS);
    pageBody.classList.add(NON_SCROLLING_BLOCK_CLASS);
    focusField.focus();

    window.removeEventListener('keyup', (e) => {
      e.preventDefault();
      if ((e.code === 'Tab') && (!(burgerMenu.contains(document.activeElement)))){
        e.preventDefault();
        burgerFocusElement.focus();
      }
    })

    window.addEventListener('keydown',(evt) => {
      if (evt.keyCode === ESCAPE_KEY_CODE){
        modal.classList.remove(OPEN_MODAL_CLASS);
        pageBody.classList.remove(NON_SCROLLING_BLOCK_CLASS);
      }
    }, {once: true});

    window.addEventListener('keyup', (e) => {
      if ((e.code === 'Tab') && (!(modal.contains(document.activeElement)))){
        focusField.focus();
      }
    })

    overlay.addEventListener('click', () => {
      modal.classList.remove(OPEN_MODAL_CLASS)
      pageBody.classList.remove(NON_SCROLLING_BLOCK_CLASS);
    })

    closeButton.addEventListener('click', () => {
      modal.classList.remove(OPEN_MODAL_CLASS)
      pageBody.classList.remove(NON_SCROLLING_BLOCK_CLASS);
    })
  });
}
