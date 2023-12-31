import { getProjectByID, getTodoById } from "./localStorageControl";
import { generatePriority } from "./generateTodo";
import { addCloseListener, addUpdateListener } from "./operateEditForm";

const createLabel = (lText) => {
  const element = document.createElement('label');
  element.innerText = lText;
  return element;
}

const createInput = (iClass, iValue) => {
  let element = document.createElement('input');
  element.classList.add(['e' + iClass.replace(' ', '')]);
  if (iClass == 'priority') {
    element = generatePriority();
    element.querySelector(`input[value="${iValue}"]`).checked = true
    console.log(element);
  } else {
    element.setAttribute('type', 'text');
    element.value = iValue
  }
  return element;
}

const generateEditForm = (inputs, labels, e, checked) => {
  const editContainer = document.createElement('div');
  editContainer.classList.add('editContainer');

  const editForm = document.createElement('div');
  editForm.classList.add('editForm');
  editForm.dataset.id = e.target.dataset.id
  

  if (inputs.length == 2) {
    editForm.classList.add('editProject');
  } else if (inputs.length == 4) {
    editForm.classList.add('editTodo');
    editForm.dataset.checked = checked;
  }

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
  addUpdateListener(confirm);
  confirm.innerText = 'Update';
  editForm.appendChild(confirm);

  const close = document.createElement('button');
  close.classList.add('eClose');
  addCloseListener(close);
  close.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-thick</title><path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>';
  editForm.appendChild(close);

  document.querySelector('.content').appendChild(editContainer).appendChild(editForm);
}

const getCurrentValues = (e, element, isProject) => {
  e.stopPropagation()
  console.log(e);

  let closestProject = element.closest('.projectWrapper').firstChild;
  const projectObject = getProjectByID(closestProject.dataset.id)
  let editValues = []

  if (isProject) {
    editValues.push(projectObject.title, projectObject.description)
    const editLabels = ['Title', 'Description']
    generateEditForm(editValues, editLabels, e)
  } else {
    const todoId = element.closest('.todo').querySelector('.checkMark').dataset.id
    const currentTodo = getTodoById(projectObject, todoId);

    editValues.push(currentTodo.task, currentTodo.description, currentTodo.dueDate, currentTodo.priority);
    const editChecked = currentTodo.checkList;
    const editLabels = ['Task', 'Description', 'Due date', 'priority'] 
    
    generateEditForm(editValues, editLabels, e, editChecked)
  }

}

const addEditListener = (element, isProject) => {
  element.addEventListener('click', (e) => getCurrentValues(e, element, isProject))
}

export {addEditListener}