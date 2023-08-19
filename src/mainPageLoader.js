const loadTitle = () => {
  let element = document.createElement('h1');
  element.innerText = 'choose project';
  document.querySelector('.content').appendChild(element);
}

const loadProjects = (project) => {
  return `<div class="project"><div class="pWrapper"><div class="pTitle">${project.title}</div><div class="pDescription">${project.description}</div></div><div class="pArrowSvg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg></div></div>`
}

const loadProjectsScreen = (projects) => {
  console.log(projects);
  let element = document.createElement('div');
  for (let i = 0; i < projects.length; i ++) {
    let child = document.createElement('div');
    child.innerHTML = loadProjects(projects[i])
    element.appendChild(child)
  }
  document.querySelector('.content').appendChild(element);
}

const loadMain = (projects) => {
  loadTitle();
  loadProjectsScreen(projects);
}

export default loadMain;