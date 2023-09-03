import { resizeTextArea } from "./mainPageLoader";
import { addNewTodoListener } from "./createNewTodo";
import { getProjectByID } from "./localStorageControl";
import addCheckboxEvents from "./checkOperations";
import { addDeleteTodoListener } from "./deleteListeners";

const getParentTodo = (todo) => {
  return todo.parentElement.parentElement.parentElement
}

const generateSingleTodo = (todoObject, project, insertPriority) => {
  const todo = document.createElement('div')
  todo.classList.add('todo');

  const checkboxContainer = document.createElement('label');
  checkboxContainer.classList.add('checkboxContainer');
  const checkMark = document.createElement('input');
  checkMark.setAttribute('type', 'checkbox');
  checkMark.classList.add('checkMark');
  checkMark.setAttribute(`data-ID`, todoObject.id)
  addCheckboxEvents(checkMark, project);
  const checkboxSpan = document.createElement('span');
  checkboxSpan.classList.add('checkboxSpan');
  checkboxSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-bold</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>';

  if (todoObject.checkList == true) {
    checkMark.checked = true;
  }

  const todoWrapper = document.createElement('div');
  todoWrapper.classList.add('todoWrapper');



  const header  = document.createElement('div');
  header.classList.add('header')


  const priority = document.createElement('div');
  priority.classList.add('priority');
  if (todoObject.priority == '0') {
    priority.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star-outline</title><path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" /></svg>';
    priority.classList.add('priority0')
  } else if (todoObject.priority == '1') {
    priority.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>'
    priority.classList.add('priority1')
  } else if (todoObject.priority == '2') {
    priority.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>'
    priority.classList.add('priority2')
  }

  const task = document.createElement('div');
  task.classList.add('task');
  task.innerText = todoObject.task;

  
  const operations = document.createElement('div');
  operations.classList.add('todoOperations');

  const deleteTodo = document.createElement('div');
  deleteTodo.classList.add('deleteTodo');
  addDeleteTodoListener(deleteTodo, project);
  deleteTodo.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-outline</title><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>';

  const editTodo = document.createElement('div');
  editTodo.classList.add('editTodo');
  editTodo.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil-outline</title><path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg>';

  operations.append(editTodo, deleteTodo)
  
  header.append(priority, task, operations)


  const dates = document.createElement('div')
  dates.classList.add('dates');
  dates.innerHTML = `Creation date: ${todoObject.creationDate}   Due date: ${todoObject.dueDate}`



  const description = document.createElement('div');
  description.classList.add('todoDescription')
  description.innerHTML = todoObject.description;


  checkboxContainer.append(checkMark, checkboxSpan)

  todoWrapper.append(header, dates, description)

  todo.append(checkboxContainer, todoWrapper)


  if (insertPriority != undefined) {
    const priorityElements = project.querySelectorAll(`.priority${insertPriority}`);

    if (priorityElements.length != 0) {
      const lastElementWithPrio = priorityElements[priorityElements.length - 1];

    const parentTodo = getParentTodo(lastElementWithPrio)

    parentTodo.insertAdjacentElement('afterend', todo)
    } else {

      if (insertPriority == 2) {
        project.querySelector('.todoList').insertAdjacentElement('afterbegin', todo)
      }else if (insertPriority == 1){
        const prio2Elements = project.querySelectorAll(`.priority2`)
        if (prio2Elements.length == 0) {
          project.querySelector('.todoList').insertAdjacentElement('afterbegin', todo)
        } else {
          const lastPrio2Element = getParentTodo(prio2Elements[prio2Elements.length - 1])

          lastPrio2Element.insertAdjacentElement('afterend', todo)
        }

      } else {
        project.querySelector('.todoList').appendChild(todo)
      }

    }

  } else {
    project.querySelector('.todoList').appendChild(todo)
  }
}

const loadTodoFromLocalStorage = (pID) => {
  const project = getProjectByID(pID);

  const todoArray = project.todos;

  todoArray.sort((a, b) => b.priority - a.priority)


  return todoArray
}

const generateList = (project, projectID) => {
  const todos = loadTodoFromLocalStorage(projectID)

  todos.forEach(t => {
    generateSingleTodo(t, project)
  })
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
    const radioContainer = document.createElement('label')
    radioContainer.classList.add('radioLabel')
    const radio = document.createElement('input');
    if (i === 0) {
      radio.checked = true;
    }
    radio.setAttribute('type', 'radio')
    radio.classList.add('nPriority')
    radio.setAttribute('name', 'priority')
    radio.value = i

    const radioSpan = document.createElement('span')
    radioSpan.classList.add('radioSpan');
    if (i == 0) {
      radioSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star-outline</title><path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" /></svg>'
      radioSpan.classList.add('priorityRadio0')
    } else if (i == 1) {
      radioSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>'
      radioSpan.classList.add('priorityRadio1')
    } else if (i == 2) {
      radioSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>'
      radioSpan.classList.add('priorityRadio2')
    }
    

    priorityContainer.appendChild(radioContainer).append(radio, radioSpan)
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
    newInput('textarea', 'nTaskDescription', false, 200),
    newCaption('Due date:'),
    newInput('text', 'nDueDate', true, '40'),
    newCaption('priority:'),
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

const generateTodoContainer = (project, projectID) => {
  const element = document.createElement('div');
  element.classList.add('todoContainer');

  const todos = document.createElement('div')
  todos.classList.add('todoList')

  project.appendChild(element)

  element.appendChild(todos)

  generateList(project, projectID)

  generateNewTodoForm(element)
  
  showTodoContainer(element)
}

const removeTodoContainer = (project) => {
  project.querySelector('.todoContainer').classList.remove('todoShown');

  project.classList.add('removeListeners');


  project.querySelector('.todoContainer').addEventListener('transitionend', (e) => {
    if (e.propertyName == 'max-height') {
      e.target.remove()
      project.classList.remove('removeListeners')
    }
  })
}

const containerCheck = (project, projectID) => {
  if(project.querySelector('.todoContainer') == null) {
    generateTodoContainer(project, projectID)
  } else {
    removeTodoContainer(project)
  }
}

const createTodoList = (project, projectID) => {
  containerCheck(project, projectID)

  setTimeout(() => {
    addNewTodoListener(project, projectID)
  }, 0);
}

export {createTodoList, generateSingleTodo};