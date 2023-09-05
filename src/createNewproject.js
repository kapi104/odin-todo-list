import projectsFactory from "./projects";
import { addProjectsEvent } from './eventHandlers.js'
import { loadProjects } from "./mainPageLoader";
import {setProjectsInStorage, increaseProjectID } from "./localStorageControl";
import { addDeleteProjectListener } from './deleteListeners.js';

import moment from "moment";

const displayNewProject = (project) => {
  let projectWrapper = document.createElement('div');
    projectWrapper.classList.add('projectWrapper');
    document.querySelector('.projectsContainer').appendChild(projectWrapper)
    let child = document.createElement('div');
    child.classList.add('project');
    child.setAttribute(`data-ID`, project.id)
    child.innerHTML = loadProjects(project)
    addProjectsEvent(child)
    addDeleteProjectListener(child.querySelector('.pDeleteSvg'));
    projectWrapper.appendChild(child)
}

const checkForm = (projectTitle) => {
  if (projectTitle != '') {return true}
}

const clearForm = (...input) => {
 input.forEach(i => i.value = '')
}

const addProject = () => {
  const newProjectTitle = document.querySelector('.nTitle');
  const newProjectDescription = document.querySelector('.nDescription');
  if (checkForm(newProjectTitle.value)) {
    let date = moment().format('D/MM/YYYY HH:mm');

    const newProject = projectsFactory(newProjectTitle.value, newProjectDescription.value, date)

    setProjectsInStorage(newProject);

    increaseProjectID()

    clearForm(newProjectTitle, newProjectDescription)

    displayNewProject(newProject);
  }
}

const addNewProjectListener = () => {
  const addButton = document.querySelector('.addButton');
  addButton.addEventListener('click', addProject, false);
}

export default addNewProjectListener;