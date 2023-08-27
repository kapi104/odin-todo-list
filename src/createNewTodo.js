import todoFactory from "./todo";
import { generateSingleTodo } from "./generateTodo";

const clearForm = (project) => {
  project.querySelector('.nTask').value = '';
  project.querySelector('.nTaskDescription').value = '';
  project.querySelector('.nDueDate').value = '';
  const prio = project.querySelectorAll('[name="priority"]');

  prio[0].checked = true
  prio[1].checked = false
  prio[2].checked = false
}

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
  const prio = project.querySelectorAll('[name="priority"]')
  prio.forEach(prio => {
    if (prio.checked == true) priority = prio.value;
  });

  clearForm(project)

  return checkForm(task, description, dueDate, priority)
  
}

const addNewTodoListener = (project, projectID) => {
  project.querySelector('.addTodoButton').addEventListener('click', () => {
    const newTodo = getNewTodoFormData(project, projectID) 

    if (newTodo != undefined) {
      console.log(newTodo);
      generateSingleTodo(newTodo, project)
    }

  })
}

export {addNewTodoListener}