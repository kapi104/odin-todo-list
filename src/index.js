import './style.css'
import loadMain from './mainPageLoader'
import projectsFactory from './projects'

let projects = []

projects.push(projectsFactory('test', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam quaerat quos voluptate amet consequuntur non praesentium provident, eveniet sequi autem consequatur reprehenderit? Fugit, numquam commodi unde omnis sequi dolores perspiciatis.'))
projects.push(projectsFactory('test2', 'testowy projekt2'))

document.addEventListener('DOMContentLoaded', () => loadMain(projects))

