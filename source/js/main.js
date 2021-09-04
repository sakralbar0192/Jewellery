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
})

