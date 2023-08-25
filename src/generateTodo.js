import { rotateArrow } from "./eventHandlers";

const loadTodoFromLocalStorage = (ID) => {
  
}

const generateList = () => {

}

const generateNewTodoForm = () => {
  
}

const removeEventListeners = (element) => {
  element.replaceWith(element.cloneNode(true));
}

const generateTodoContainer = (project, projectID) => {
  if(project.querySelector('.todoContainer') == null) {
    const element = document.createElement('div');
    element.classList.add('todoContainer', 'todoHidden');
    project.appendChild(element)
    removeEventListeners(project.querySelector('.todoContainer'))
  } else {
    project.querySelector('.todoContainer').remove();
  }
}

const createTodoList = (project, projectID) => {
  generateTodoContainer(project, projectID)
}

export default createTodoList;