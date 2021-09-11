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
* Slider
*/
{
  //Константы
  const TABLET_BREAK_POINT = 1024; //максимальная ширина десктопных экранов
  const DISPLAYED_SLIDE_CLASS = 'slider__slide--shown' //класс отображаеиых слайдов
  const BULLET_CLASS = 'slider__bullet';//класс неактивных буллетов пагинации
  const BULLET_TAG = 'span'; //тэг буллета пагинации
  const BULLET__ATTRIBUTE_NAME = 'data-bullet-number';//название дата атрибута буллета пагинации
  const ACTIVE_BULLET_CLASS = 'slider__bullet--active';//класс активного буллета пагинации
  const SLIDE_PER_VIEW_DESKTOP = 4; //количество слайдов на десктопной ширине
  const SLIDE_PER_VIEW_TABLET = 2;//количество слайдов на ширинах мобильных устройств(планшет и смартфон)
  const START_SLIDES_PAGE = 1;

  //DOM-элементы
  const buttonPrev = document.querySelector('#button-prev');//кнопка переключения на предыдущую страницу слайдов
  const buttonNext = document.querySelector('#button-next');//кнопка переключения на следующую страницу слайдов
  const paginationContainer = document.querySelector('#pagination');//контейнер для буллетов пагинации
  const slides = Array.from(document.querySelector('#slider').children);//массив слайдов в слайдере

  //функции
  //функция переключающая класс у элемента
  const toggleClass = (element, className) => {
    element.classList.toggle(className);
  }

  //подсчет страниц слайдов
  const determineTheNumberOfSlidePages = (slidesArray,requiredSlidesPerView) => {
    let pagesNumber = 0;
    if (slidesArray.length % requiredSlidesPerView != 0) {
      pagesNumber = Math.floor(slidesArray.length / requiredSlidesPerView) + 1
    } else {
      pagesNumber = slidesArray.length / requiredSlidesPerView;
    }
    return pagesNumber
  }

  //создание буллета пагинации
  const createBullet = (tagName, className, text, attrubuteName, dataAttribute) => {
    const element = document.createElement(tagName);
    element.classList.add(className);
    element.textContent = text;
    element.setAttribute(attrubuteName, dataAttribute);
    return element;
  }

  //наполнение контейнера пагинации буллетами
  const createPagination = (numberOfSlidePages, paginationContainer, currentPage, activePageClass) => {
    for (let i=1; i<=numberOfSlidePages; i++) {
      const bullet = createBullet(BULLET_TAG, BULLET_CLASS, String(i), BULLET__ATTRIBUTE_NAME, String(i));
      if (i === currentPage) {
        toggleClass(bullet, activePageClass)
      }
      paginationContainer.appendChild(bullet);
    }
  }

  //проверка ширины экрана
  const determineRequiredNumberSlidesPerView = (slidesPerViewDesktop, breakpoin, slidesPerViewTablet) => {
    let requiredSlides =  slidesPerViewDesktop;
    if (window.innerWidth <= breakpoin) {
      requiredSlides = slidesPerViewTablet;
    }
    return requiredSlides;
  };


  document.addEventListener('DOMContentLoaded', () => {
    //определим количество страниц и количество слайдов для отображения
    let slidesPerView = determineRequiredNumberSlidesPerView(SLIDE_PER_VIEW_DESKTOP, TABLET_BREAK_POINT, SLIDE_PER_VIEW_TABLET);
    let numberOfSlidePages = determineTheNumberOfSlidePages(slides, slidesPerView);

    //определим стартовую активную страницу и массив слайдов для отображения
    let activePage = START_SLIDES_PAGE;
    let displayedSlides = slides.slice(slidesPerView*(activePage-1),slidesPerView*(activePage-1)+slidesPerView)

    //выведем на экран слайды с активной страницы и пагинацию
    displayedSlides.forEach(element => {
      toggleClass(element, DISPLAYED_SLIDE_CLASS);
    })
    createPagination(numberOfSlidePages, paginationContainer, activePage, ACTIVE_BULLET_CLASS)

    //сохраним текущие буллеты в массив
    let bullets = Array.from(paginationContainer.children);

    //настроим работу буллетов пагинации
    bullets.forEach(bullet => {
      bullet.addEventListener('click', (e) => {
        //уберем класс активного буллета с буллета текущей страницы
        toggleClass(bullets[activePage-1], ACTIVE_BULLET_CLASS);
        //считаем с буллета, на котором был пойман клик значение номера страницы и присвоем его переменной, хранящей номер активной страницы
        activePage = parseInt(e.target.getAttribute(BULLET__ATTRIBUTE_NAME));
        //добавим класс активного буллета странице с номером активной страницы
        toggleClass(bullets[activePage-1], ACTIVE_BULLET_CLASS);
        //скроем ранее показанные слайды
        displayedSlides.forEach(element => {
          toggleClass(element, DISPLAYED_SLIDE_CLASS);
        })
        //переопределим слайды, которые необходимо рендерить
        displayedSlides = slides.slice(slidesPerView*(activePage-1),slidesPerView*(activePage-1)+slidesPerView);
        //отрендерим новые слайды
        displayedSlides.forEach(element => {
          toggleClass(element, DISPLAYED_SLIDE_CLASS);
        })
      })
    })

    //настроим работу кнопок навигации
    //слайд вперед
    buttonNext.addEventListener('click', () => {
      //убирает класс активного булета с булета текущей страницы
      toggleClass(bullets[activePage-1], ACTIVE_BULLET_CLASS)
      //увеличим значение текущей страницы на 1
      activePage++;
      //проверим не является ли текущая страница последней
      if (activePage > numberOfSlidePages) {
        activePage = numberOfSlidePages
      }
      //добавляем буллету следующей страницы класс активного буллета
      toggleClass(bullets[activePage-1], ACTIVE_BULLET_CLASS)
      //скроем показанные слайды с текущей страницы
      displayedSlides.forEach(element => {
        toggleClass(element, DISPLAYED_SLIDE_CLASS);
      })
      //переназначим текущие слайды слайдами со следующей страницы
      displayedSlides = slides.slice(slidesPerView*(activePage-1),slidesPerView*(activePage-1)+slidesPerView);

      //отрендерим новые слайды, добавив им соответствующие классы
      displayedSlides.forEach(element => {
        toggleClass(element, DISPLAYED_SLIDE_CLASS);
      });
    });

    //слайд назад
    buttonPrev.addEventListener('click', () => {
      //убирает класс активного булета с булета текущей страницы
      toggleClass(bullets[activePage-1], ACTIVE_BULLET_CLASS)
      //уменьшим значение текущей страницы на 1
      activePage--;
      //проверим не является ли текущая страница первой
      if (activePage < 1) {
        activePage = 1
      }
      //добавляем буллету предыдущей страницы класс активного буллета
      toggleClass(bullets[activePage-1], ACTIVE_BULLET_CLASS)
      //скроем показанные слайды с текущей страницы
      displayedSlides.forEach(element => {
        toggleClass(element, DISPLAYED_SLIDE_CLASS);
      })
      //переназначим текущие слайды слайдами с предыдущей страницы
      displayedSlides = slides.slice(slidesPerView*(activePage-1),slidesPerView*(activePage-1)+slidesPerView);

      //отрендерим новые слайды, добавив им соответствующие классы
      displayedSlides.forEach(element => {
        toggleClass(element, DISPLAYED_SLIDE_CLASS);
      });
    });

    //обработаем поведение слайдера при ресайзе окна браузера
    window.addEventListener('resize', () => {
      //узнаем сколько слайдов необходимо рендерить на странице при текущей ширине экрана
      const requiredSlides = determineRequiredNumberSlidesPerView(SLIDE_PER_VIEW_DESKTOP, TABLET_BREAK_POINT, SLIDE_PER_VIEW_TABLET);
      //сравним необходимое и текущее количество слайдов, изменим текущеее если оно не равно необходимому и отрендерим новое количество слайдов
      if (requiredSlides != slidesPerView) {
        //запомним текущее значение количества слайдов на странице
        const prevSlidesPerView = slidesPerView;
        //сделаем текущее количество слайдов на странице равным необходимому
        slidesPerView = requiredSlides;
        //узнаем новое количество страниц слайдов
        numberOfSlidePages = determineTheNumberOfSlidePages(slides, slidesPerView);
        //уберем класс активности с буллета текущей страницы
        toggleClass(bullets[activePage-1], ACTIVE_BULLET_CLASS)
        //запомним предыдущий номер активной страницы
        const prevActivePage = activePage;
        //подсчитаем новый номер активной страницы
        if (prevSlidesPerView > slidesPerView) {
          activePage = Math.floor(prevSlidesPerView / slidesPerView * prevActivePage) - 1;
        } else {
          activePage = Math.ceil(prevSlidesPerView / slidesPerView * prevActivePage);
        }
        //очистим и заполним пагинацию новыми буллетами
        paginationContainer.innerHTML = '';
        createPagination(numberOfSlidePages, paginationContainer, activePage, ACTIVE_BULLET_CLASS);
        //обновим буллеты в массиве
        bullets = Array.from(paginationContainer.children);
        //настроим работу буллетов пагинации
        bullets.forEach(bullet => {
          bullet.addEventListener('click', (e) => {
            //уберем класс активного буллета с буллета текущей страницы
            toggleClass(bullets[activePage-1], ACTIVE_BULLET_CLASS);
            //считаем с буллета, на котором был пойман клик значение номера страницы и присвоем его переменной, хранящей номер активной страницы
            activePage = parseInt(e.target.getAttribute(BULLET__ATTRIBUTE_NAME));
            //добавим класс активного буллета странице с номером активной страницы
            toggleClass(bullets[activePage-1], ACTIVE_BULLET_CLASS);
            //скроем ранее показанные слайды
            displayedSlides.forEach(element => {
              toggleClass(element, DISPLAYED_SLIDE_CLASS);
            })
            //переопределим слайды, которые необходимо рендерить
            displayedSlides = slides.slice(slidesPerView*(activePage-1),slidesPerView*(activePage-1)+slidesPerView);
            //отрендерим новые слайды
            displayedSlides.forEach(element => {
              toggleClass(element, DISPLAYED_SLIDE_CLASS);
            })
          })
        })
        //скроем показанные ранее слайды
        displayedSlides.forEach(element => {
          toggleClass(element, DISPLAYED_SLIDE_CLASS);
        })
        //переназначим текущие слайды
        displayedSlides = slides.slice(slidesPerView*(activePage-1),slidesPerView*(activePage-1)+slidesPerView);

        //отрендерим новые слайды, добавив им соответствующие классы
        displayedSlides.forEach(element => {
          toggleClass(element, DISPLAYED_SLIDE_CLASS);
        });
      }
    });
  });
}

/**
 * Dropout
*/
{
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
