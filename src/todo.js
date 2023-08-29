import moment from "moment"
import { getTodoID,increaseTodoID } from "./localStorageControl";

const todoFactory = (task, description, dueDate, priority, checkList) => {
  let creationDate = moment().format('D/MM/YYYY HH:mm');
  const id = getTodoID()
  increaseTodoID()

  return {id, task, description, dueDate, priority, checkList, creationDate}
}

export default todoFactory