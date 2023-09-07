import { deleteTodoFromLocalstorage, deleteProjectFromLocalstorage } from "./localStorageControl";

const deleteTodoFromDOM = (element, project) => {
  const todo = element.parentElement.parentElement.parentElement.parentElement;
  const todoId = todo.querySelector('.checkMark').dataset.id;
  
  deleteTodoFromLocalstorage(todoId, project.firstChild.dataset.id);
  todo.remove();
}

const addDeleteTodoListener = (element, project) => {
  element.addEventListener('click', () => deleteTodoFromDOM(element, project))
} 

const deleteProjectFromDOM = (element, e) => {
  e.stopPropagation();

  const elementParentProject = element.closest('.project')

  deleteProjectFromLocalstorage(elementParentProject.dataset.id);
  elementParentProject.remove()
}

const addDeleteProjectListener = (element) => {
  element.addEventListener('click', (e) => deleteProjectFromDOM(element, e))
}

export {addDeleteTodoListener, addDeleteProjectListener}