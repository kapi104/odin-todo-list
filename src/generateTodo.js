const loadTodoFromLocalStorage = (ID) => {
  
}

const generateList = () => {

}

const generateNewTodoForm = () => {
  
}

const generateTodoContainer = (project) => {
  
  const element = document.createElement('div');
  element.classList.add('todoContainer');
  project.appendChild(element)
  window.getComputedStyle(element).maxHeight;
  element.classList.add('todoShown')
  
    
  
}

const removeTodoContainer = (project) => {
  project.querySelector('.todoContainer').addEventListener('transitionend', (e) => {e.target.remove()})
    
  project.querySelector('.todoContainer').classList.remove('todoShown');
}

const containerCheck = (project, projectIDID) => {
  if(project.querySelector('.todoContainer') == null) {
    generateTodoContainer(project)
  } else {
    removeTodoContainer(project)
  }
}

const createTodoList = (project, projectID) => {
  containerCheck(project, projectID)
}

export default createTodoList;