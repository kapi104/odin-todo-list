import {addProjectsEvent} from './eventHandlers.js'
import { getProjectsFromStorage } from './localStorageControl.js';
import { addDeleteProjectListener } from './deleteListeners.js';
import { addEditListener } from './generateEditForm.js';

const loadTitle = () => {
  let element = document.createElement('h1');
  element.innerText = 'Choose project';
  document.querySelector('.content').appendChild(element);
}

const loadProjects = (project) => {
  return `<div class="slider sliderHidden"></div><div class="pWrapper"><div class="pTitle editValue">${project.title}</div><div class="pCreationDate">${project.date}</div><div class="pDescription editValue">${project.description}</div></div><div class="pEditSvg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil-outline</title><path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg></div><div class="pDeleteSvg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-outline</title><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg></div><div class="pArrowSvg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg></div>`
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
    child.querySelector('.pEditSvg').setAttribute(`data-ID`, projects[i].id);
    addProjectsEvent(child)
    projectWrapper.appendChild(child)
  }

  document.querySelector('.content').appendChild(element);
  
  document.querySelectorAll('.pDeleteSvg').forEach(element => addDeleteProjectListener(element));
  document.querySelectorAll('.pEditSvg').forEach(element => addEditListener(element, true))
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