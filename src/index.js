import './style.css'
import {loadMain} from './mainPageLoader'
import addNewProjectListener from './createNewproject'
import { getProjectsFromStorage } from './localStorageControl';



if(localStorage.getItem('projects') === null) {
  localStorage.setItem('projects', '[]');
} 

let projects = getProjectsFromStorage()

document.addEventListener('DOMContentLoaded', () => {
  loadMain(projects)
  setTimeout(() => {
    addNewProjectListener()
  }, 1);
})