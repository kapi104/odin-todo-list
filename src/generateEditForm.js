import { getProjectByID, getTodoById } from "./localStorageControl";
import { generatePriority } from "./generateTodo";
import { addCloseListener } from "./operateEditForm";

const createLabel = (lText) => {
  const element = document.createElement('label');
  element.innerText = lText;
  return element;
}

const createInput = (iClass, iValue) => {
  let element = document.createElement('input');
  element.classList.add(['e' + iClass.replace(' ', '')]);
  if (iClass == 'Description') {
    element.setAttribute('type', 'textarea');
    element.value = iValue
  } else if (iClass == 'priority') {
    element = generatePriority()
  } else {
    element.setAttribute('type', 'text');
    element.value = iValue
  }
  return element;
}

const generateEditForm = (inputs, labels) => {
  const editForm = document.createElement('div');
  editForm.classList.add('editForm');

  const editHeader = document.createElement('h2');
  editHeader.innerText = 'Editing'
  editForm.appendChild(editHeader)

  for (let i = 0; i < inputs.length; i++) {
    
    editForm.append(
      createLabel(labels[i]),
      createInput(labels[i], inputs[i])
    )
    
  }

  const confirm = document.createElement('button');
  confirm.classList.add('eConfirm');
  confirm.innerText = 'Update'
  editForm.appendChild(confirm)

  const close = document.createElement('button');
  close.classList.add('eClose');
  addCloseListener(close)
  close.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-thick</title><path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>';
  editForm.appendChild(close);

  document.querySelector('.content').appendChild(editForm);
}

const getCurrentValues = (e, element, isProject) => {
  e.stopPropagation()

  let closestProject = element.closest('.projectWrapper').firstChild;
  const projectObject = getProjectByID(closestProject.dataset.id)
  let editValues = []

  if (isProject) {
    editValues.push(projectObject.title, projectObject.description)
    const editLabels = ['Title', 'Description']
    generateEditForm(editValues, editLabels)
  } else {
    const todoId = element.closest('.todo').querySelector('.checkMark').dataset.id
    const currentTodo = getTodoById(projectObject, todoId);

    editValues.push(currentTodo.task, currentTodo.description, currentTodo.dueDate, currentTodo.priority)
    const editLabels = ['Task', 'Description', 'Due date', 'priority'] 
    
    generateEditForm(editValues, editLabels)
  }

}

const addEditListener = (element, isProject) => {
  element.addEventListener('click', (e) => getCurrentValues(e, element, isProject))
}

export {addEditListener}