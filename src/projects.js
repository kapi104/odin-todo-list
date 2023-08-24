import { getProjectID, increaseProjectID } from "./localStorageControl";

const projectsFactory = (title, description, date) => {
  let id = getProjectID();
  increaseProjectID();
  let todos = [];
  return {id, title, description, date, todos}
}

export default projectsFactory;