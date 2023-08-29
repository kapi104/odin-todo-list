if (localStorage.getItem('projectID') === null) {
  localStorage.setItem('projectID', '0');
}

if (localStorage.getItem('todoID') === null) {
  localStorage.setItem('todoID', '0');
}

const getProjectID = () => {
  return localStorage.getItem('projectID')
}

const getTodoID = () => {
  return localStorage.getItem('todoID')
}

const increaseTodoID = () => {
  let tID = Number(getTodoID());
  tID += 1;
  localStorage.setItem('todoID', tID.toString())
}

const setProjectsInStorage = (project) => {
  localStorage.setItem(`project${getProjectID()}`, JSON.stringify(project))
}

const getProjectsFromStorage = () => {
  const pID = getProjectID()
  let projectArray = []
  for (let i = 0; i < pID; i++) {
    if (localStorage.getItem(`project${i}`) != null) {
      projectArray.push(JSON.parse(localStorage.getItem(`project${i}`)))
    }
  }
  return projectArray;
}

const increaseProjectID = () => {
  let pID = Number(localStorage.getItem('projectID'));
  pID += 1;
  localStorage.setItem('projectID', pID.toString())
}

const getProjectByID = (pID) => {
  return JSON.parse(localStorage.getItem(`project${pID}`))
}

const addTodoToProject = (pID, todo) => {
  let project = getProjectByID(pID);

  project.todos.push(todo)

  localStorage.setItem(`project${pID}`, JSON.stringify(project));
}

export {getProjectsFromStorage, setProjectsInStorage, increaseProjectID, getProjectID, addTodoToProject, getTodoID, increaseTodoID, getProjectByID}