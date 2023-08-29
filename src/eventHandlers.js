import {createTodoList} from './generateTodo.js'

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

const changeBg = (e) => {
  e.target.classList.toggle('openProjectBg')
}

const showTodo = (e) => {
  createTodoList(e.target.parentElement, e.target.dataset.id)
}

const removeProjectsEvents = (element) => {
  element.removeEventListener('mouseenter', slideIn)

  element.removeEventListener('mouseleave', slideOut)

  element.removeEventListener('click', rotateArrow)
  
  element.removeEventListener('click', showTodo)

  element.removeEventListener('click', changeBg)
}

const addProjectsEvent = (element) => {
  element.addEventListener('mouseenter', slideIn)

  element.addEventListener('mouseleave', slideOut)

  element.addEventListener('click', rotateArrow)
  
  element.addEventListener('click', showTodo)

  element.addEventListener('click', changeBg)
}


export {addProjectsEvent, removeProjectsEvents}; 

