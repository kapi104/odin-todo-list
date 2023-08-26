import projectsFactory from "./projects";
import { addProjectsEvent } from './eventHandlers.js'
import { loadProjects } from "./mainPageLoader";
import { getProjectsFromStorage, setProjectsInStorage } from "./localStorageControl";

import moment from "moment";

const displayNewProject = (project) => {
  let projectWrapper = document.createElement('div');
    projectWrapper.classList.add('projectWrapper');
  let child = document.createElement('div');
    child.classList.add('project');
    child.innerHTML = loadProjects(project)
    child = addProjectsEvent(child)

    document.querySelector('.projectsContainer').appendChild(projectWrapper).appendChild(child);
}

const checkForm = (projectTitle) => {
  if (projectTitle != '') {
    let projects = getProjectsFromStorage()

    if (projects.forEach(p => {
      if (p.title == projectTitle) {
        return true;
      }

    })) {
      return false;
    } else {return true};
}
}

const clearForm = (...input) => {
 input.forEach(i => i.value = '')
}

const addProject = () => {
  const newProjectTitle = document.querySelector('.nTitle');
  const newProjectDescription = document.querySelector('.nDescription');
  if (checkForm(newProjectTitle, newProjectDescription)) {
    let date = moment().format('D/MM/YYYY H:m');

    let projects = getProjectsFromStorage();

    const newProject = projectsFactory(newProjectTitle.value, newProjectDescription.value, date)

    projects.push(newProject);

    setProjectsInStorage(projects);

    clearForm(newProjectTitle, newProjectDescription)

    displayNewProject(newProject);
  }
}

const addNewProjectListener = () => {
  const addButton = document.querySelector('.addButton');
  addButton.addEventListener('click', addProject, false);
}

export default addNewProjectListener;