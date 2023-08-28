if (localStorage.getItem('projectID') === null) {
  localStorage.setItem('projectID', '0');
}


const getProjectID = () => {
  return localStorage.getItem('projectID')
}

const setProjectsInStorage = (project) => {
  localStorage.setItem(`project${getProjectID()}`, JSON.stringify(project))
}

const getProjectsFromStorage = () => {
  const pID = getProjectID()
  let projectArray = []
  for (let i = 0; i < pID; i++) {
    if (localStorage.getItem(`project${i}`) != null) {
      projectArray.push(JSON.parse(localStorage.getItem(`project${i}`)))
    }
  }
  return projectArray;
}

const increaseProjectID = () => {
  let pID = Number(localStorage.getItem('projectID'));
  pID += 1;
  localStorage.setItem('projectID', pID.toString())
}

export {getProjectsFromStorage, setProjectsInStorage, increaseProjectID, getProjectID}