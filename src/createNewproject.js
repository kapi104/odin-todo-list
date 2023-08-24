import projectsFactory from "./projects";
import addProjectSliderEvent from './transitionsEvents.js'
import {getProjectsFromStorage, setProjectsInStorage} from "./localStorageControl";

import moment from "moment";

const loadProject = (project) => {
  return `<div class="project"><div class="slider sliderHidden"></div><div class="pWrapper"><div class="pTitle">${project.title}</div><div class="pCreationDate">${project.date}</div><div class="pDescription">${project.description}</div></div><div class="pArrowSvg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg></div></div>`
}

const displayNewProject = (project) => {
  let child = document.createElement('div');
    child.innerHTML = loadProject(project)
    child = addProjectSliderEvent(child)
    document.querySelector('.projectsContainer').appendChild(child);
}

const checkForm = (projectTitle) => {
  if (projectTitle != '') {
    let projects = getProjectsFromStorage()

    console.log(projects);

    if (projects.forEach(p => {
      if (p.title == projectTitle) {
        return true;
      }

    })) {
      return false;
    } else {return true};
}
}


const addProject = () => {
  const newProjectTitle = document.querySelector('.nTitle').value;
  const newProjectDescription = document.querySelector('.nDescription').value;
  if (checkForm(newProjectTitle, newProjectDescription)) {
    let date = moment().format('D/MM/YYYY H:m');

    let projects = getProjectsFromStorage();

    const newProject = projectsFactory(newProjectTitle, newProjectDescription, date)

    projects.push(newProject);

    setProjectsInStorage(projects);

    displayNewProject(newProject);
  }
  
}

const addNewProjectListener = () => {
  const addButton = document.querySelector('.addButton');
  addButton.addEventListener('click', addProject, false);
}

export default addNewProjectListener;