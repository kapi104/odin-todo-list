const getProjectsFromStorage = () => {
  let item = localStorage.getItem('projects')
  return JSON.parse(item);
}

const setProjectsInStorage = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects))
}

if (localStorage.getItem('projectID') === null) {
  localStorage.setItem('projectID', '0');
}

const increaseProjectID = () => {
  let pID = Number(localStorage.getItem('projectID'));
  pID += 1;
  localStorage.setItem('projectID', pID.toString())
}

const getProjectID = () => {
  return localStorage.getItem('projectID')
}

export {getProjectsFromStorage, setProjectsInStorage, increaseProjectID, getProjectID}