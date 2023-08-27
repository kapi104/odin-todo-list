import todoFactory from "./todo";

const checkForm = (task, description, dueDate, priority) => {
  if (task != '') {
    if (dueDate == '') {
      dueDate = '-'
    }

    return todoFactory(task, description, dueDate, priority, false)
  }
}

const getNewTodoFormData = (project) => {
  const task = project.querySelector('.nTask').value;
  const description = project.querySelector('.nTaskDescription').value;
  const dueDate = project.querySelector('.nDueDate').value;
  let priority
  const prio = project.querySelectorAll('[name="priority"]').forEach(prio => {
    if (prio.checked == true) priority = prio.value;
  });

  return checkForm(task, description, dueDate, priority)
  
}

const addNewTodoListener = (project, projectID) => {
  project.querySelector('.addTodoButton').addEventListener('click', () => {
    const newTodo = getNewTodoFormData(project, projectID) 

    console.log(newTodo);
  })
}

export {addNewTodoListener}