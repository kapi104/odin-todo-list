import { resizeTextArea } from "./mainPageLoader";

const loadTodoFromLocalStorage = (ID) => {
  
}

const generateList = () => {

}

const newCaption = (text) => {
  const caption = document.createElement('caption');
  caption.innerText = text;
  return caption;
}

const newInput = (type, inputClass, blockEnter, max) => {
  let input = '';
  if (type === 'textarea') {
    input = document.createElement('textarea');
    input.addEventListener('input', resizeTextArea, false);
  } else {
    input = document.createElement('input');
  }
  input.setAttribute('type', type)
  input.classList.add(inputClass);
  if (blockEnter) {
    input.setAttribute('onkeydown', "return event.key != 'Enter';")
  }
  input.setAttribute('maxlength', max)
  return input;
}

const generatePriority = () => {
  const priorityContainer = document.createElement('div');
  priorityContainer.classList.add('priorityContainer');
  
  for(let i = 0; i < 3; i++) {
    const radioContainer = document.createElement('div')
    radioContainer.innerHTML = i

    const radio = document.createElement('input');
    radio.setAttribute('type', 'radio')
    radio.classList.add('nPriority')
    radio.setAttribute('name', 'priority')
    radio.value = i

    priorityContainer.appendChild(radioContainer).appendChild(radio)
  }
  return priorityContainer;
} 

const generateNewTodoForm = (element) => {
  const formContainer = document.createElement('div');
  formContainer.classList.add('newTodoForm')

  const formWrapper = document.createElement('div')
  formWrapper.classList.add('formWrapper')

  const form = document.createElement('form')

  form.append(
    newCaption('Task:'),
    newInput('text', 'nTask', true, 40),
    newCaption('Description:'),
    newInput('textarea', 'nTaskDescription', false, 500),
    newCaption('Due date:'),
    newInput('text', 'nDueDate', true, '40'),
    newCaption('priority'),
    generatePriority()
  )

  formWrapper.appendChild(form)

  formContainer.appendChild(formWrapper)

  const addTodoButton = document.createElement('div');
  addTodoButton.classList.add('addTodoButton');
  addTodoButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>'
  
  formContainer.appendChild(addTodoButton)


  element.appendChild(formContainer)
}

const showTodoContainer = (element) => {
  window.getComputedStyle(element).maxHeight;
  element.classList.add('todoShown')
}

const generateTodoContainer = (project) => {
  const element = document.createElement('div');
  element.classList.add('todoContainer');
  project.appendChild(element)

  generateNewTodoForm(element)
  
  showTodoContainer(element)
}

const removeTodoContainer = (project) => {
  project.querySelector('.todoContainer').addEventListener('transitionend', (e) => {
    if (e.propertyName == 'max-height') {
      e.target.remove()
    }
  })
  project.querySelector('.todoContainer').classList.remove('todoShown');
}

const containerCheck = (project, projectIDID) => {
  if(project.querySelector('.todoContainer') == null) {
    generateTodoContainer(project)
  } else {
    removeTodoContainer(project)
  }
}

const createTodoList = (project, projectID) => {
  containerCheck(project, projectID)
}

export default createTodoList;