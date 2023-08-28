import { getProjectID } from "./localStorageControl";

const projectsFactory = (title, description, date) => {
  let id = getProjectID();
  let todos = [];
  return {id, title, description, date, todos}
}

export default projectsFactory;