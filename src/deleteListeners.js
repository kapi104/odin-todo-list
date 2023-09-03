import { deleteTodoFromLocalstorage } from "./localStorageControl";

const deleteTodoFromDOM = (element, project) => {
  const todo = element.parentElement.parentElement.parentElement.parentElement;
  const todoId = todo.querySelector('.checkMark').dataset.id;
  
  deleteTodoFromLocalstorage(todoId, project.firstChild.dataset.id);
  todo.remove();
}

const addDeleteTodoListener = (element, project) => {
  element.addEventListener('click', () => deleteTodoFromDOM(element, project))
} 

export {addDeleteTodoListener}