/**
 * //создание буллета пагинации *
 */
const createBullet = (className, text, dataAttribute) => {
  const element = document.createElement('span');
  element.classList.add(className);
  element.textContent = text;
  element.setAttribute('data-bullet-number', dataAttribute);
  return element;
}

export {createBullet}

