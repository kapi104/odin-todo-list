import createTodoList from './generateTodo.js'

const slideIn = (e) => {
  e.target.querySelector('.slider').classList.remove('sliderHidden');
  e.target.querySelector('.slider').classList.add('sliderShown');
}

const slideOut = (e) => {
  e.target.querySelector('.slider').classList.remove('sliderShown');
  e.target.querySelector('.slider').classList.add('sliderHidden');
}

const rotateArrow = (e) => {
  e.target.querySelector('.pArrowSvg').classList.toggle('rotated');
} 

const showTodo = (e) => {
  createTodoList(e.target.parentElement, e.target.dataset.id)
}

const addProjectsEvent = (element) => {
  element.addEventListener('mouseenter', slideIn)

  element.addEventListener('mouseleave', slideOut)

  element.addEventListener('click', rotateArrow)
  
  element.addEventListener('click', showTodo)


  return element
}

export {addProjectsEvent, slideIn, slideOut, rotateArrow, showTodo}; 

