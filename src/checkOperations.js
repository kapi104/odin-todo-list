import { getProjectByID } from "./localStorageControl";

const changeCheckedInLocalstorage = (project, tId) => {
  const projectId = project.firstElementChild.dataset.id;

  const projectObj = getProjectByID(projectId)

  const todosArray = projectObj.todos;

  todosArray.forEach(todo => {
    if (todo.id == tId) {
      if (todo.checkList == true) {
        todo.checkList = false;
      } else {
        todo.checkList = true;
      }
      
    }
  });

  projectObj.todos = todosArray;

  localStorage.setItem(`project${projectId}`, JSON.stringify(projectObj))
}

const addCheckboxEvents = (element, project) => {
  element.addEventListener('click', () => {
    
    changeCheckedInLocalstorage(project, element.dataset.id)
  })
}

export default addCheckboxEvents