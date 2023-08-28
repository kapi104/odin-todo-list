import moment from "moment"

const todoFactory = (task, description, dueDate, priority, checkList) => {
  let creationDate = moment().format('D/MM/YYYY HH:mm');

  return {task, description, dueDate, priority, checkList, creationDate}
}

export default todoFactory