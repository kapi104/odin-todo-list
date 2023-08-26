const todoFactory = (task, description, dueDate, priority, checkList) => {
  return {task, description, dueDate, priority, checkList, creationDate}
}

export default todoFactory