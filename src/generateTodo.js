const loadTodoFromLocalStorage = (ID) => {
  
}

const generateList = () => {

}

const newCaption = (text) => {
  let caption = document.createElement('caption');
  caption.innerText = text;
  return caption;
}

const newInput = (type, inputClass, blockEnter, max) => {
  let input = document.createElement('input');
  input.setAttribute('type', type)
  input.classList.add(inputClass);
  if (blockEnter) {
    input.setAttribute('onkeydown', "return event.key != 'Enter';")
  }
  input.setAttribute('maxlength', max)
}

const generateNewTodoForm = (element) => {
  const formContainer = document.createElement('div');
  formContainer.classList.add('newTodoForm')

  const form = document.createElement('form')

  form.append(
    newCaption('Task:'),
    newInput('text', 'nTask', true, 40),
    newCaption('Description:'),
    newInput('textarea', 'ndescription', false, 500),
    newCaption('Due date:'),
    newInput('date', 'nDueDate', true, ''),
  )

  formContainer.appendChild(form)

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
      console.log(e.propertyName);
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