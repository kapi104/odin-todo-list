import {addProjectsEvent} from './eventHandlers.js'
import { getProjectID, getProjectsFromStorage } from './localStorageControl.js';

const loadTitle = () => {
  let element = document.createElement('h1');
  element.innerText = 'Choose project';
  document.querySelector('.content').appendChild(element);
}

const loadProjects = (project) => {
  return `<div class="slider sliderHidden"></div><div class="pWrapper"><div class="pTitle">${project.title}</div><div class="pCreationDate">${project.date}</div><div class="pDescription">${project.description}</div></div><div class="pArrowSvg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg></div>`
}

const loadProjectsScreen = (projects) => {
  let element = document.querySelector('.projectsContainer');
  
  for (let i = 0; i < projects.length; i ++) {
    let projectWrapper = document.createElement('div');
    projectWrapper.classList.add('projectWrapper');
    element.appendChild(projectWrapper)
    let child = document.createElement('div');
    child.classList.add('project');
    child.setAttribute(`data-ID`, projects[i].id)
    child.innerHTML = loadProjects(projects[i])
    addProjectsEvent(child)
    projectWrapper.appendChild(child)
  }
  
  document.querySelector('.content').appendChild(element);
}

const resizeTextArea = (e) => {
  e.target.style.height = 'auto';
  e.target.style.height = e.target.scrollHeight + 'px';
}

const generateForm = (parent) => {
  let titleCaption = document.createElement('caption');
  titleCaption.innerText = 'Title:';
  parent.appendChild(titleCaption);

  let title = document.createElement('input');
  title.classList.add('nTitle');
  title.setAttribute('onkeydown', "return event.key != 'Enter';")
  title.setAttribute('maxlength', 40)
  parent.appendChild(title);

  let descriotionCaption = document.createElement('caption');
  descriotionCaption.innerText = 'Description:';
  parent.appendChild(descriotionCaption);

  let description = document.createElement('textarea');
  description.classList.add('nDescription');
  description.setAttribute('maxlength', 500);
  description.addEventListener('input', resizeTextArea, false);
  parent.appendChild(description);
}

const generateAddButton = () => {
  let addButton = document.createElement('div');
  addButton.classList.add('addButton');
  addButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>'

  return addButton;
}

const newProjectForm = () => {
  let element = document.createElement('div');
  element.classList.add('project', 'newProjectForm');

  let wrapper = document.createElement('form');
  wrapper.classList.add('formWrapper');

  generateForm(wrapper)
  element.appendChild(wrapper)

  element.appendChild(generateAddButton())

  document.querySelector('.content').appendChild(element);
}

const loadMain = () => {
  loadTitle();
  loadProjectsScreen(getProjectsFromStorage());
  newProjectForm()
}

export {loadMain, loadProjects, resizeTextArea};