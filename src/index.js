import './style.css'
import {loadMain} from './mainPageLoader'
import addNewProjectListener from './createNewproject'
import { getProjectsFromStorage } from './localStorageControl';


document.addEventListener('DOMContentLoaded', () => {
  loadMain()
  setTimeout(() => {
    addNewProjectListener()
  }, 1);
})