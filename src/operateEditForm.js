import todoFactory from "./todo";

const removeElement = (element) => {
  const editForm = element.closest('.editContainer');
  editForm.remove()
}

const addCloseListener = (element) => {
  element.addEventListener('click', () => removeElement(element))
}

const createNewProject = (values) => {

}

const createNewTodo = (values) => {
  const newTodoObj = todoFactory(...values, Boolean(document.querySelector('.editForm').dataset.checked));
  console.log(newTodoObj.checkList);
}

const replaceDivWithNewOne = (values, element) => {
  if (element.closest('.editForm').classList.contains('editProject')) {
    const editedProject = createNewProject(values)
  } else {
    createNewTodo(values)
  }
}

const getEditFormData = (element) => {
  const editForm = element.parentElement;

  const inputs = editForm.querySelectorAll('input[type="text"]');

  let inputsValue = [];

  inputs.forEach(i => {
    inputsValue.push(i.value);
  })

  const priority = editForm.querySelectorAll('input[type="radio"]');

  priority.forEach(p => {
    if (p.checked) {
      inputsValue.push(p.value)
    }
  })

  if (inputsValue[0] != '') {
    return inputsValue;
  }
}

const editElement = (element) => {
  const editValues = getEditFormData(element);

  replaceDivWithNewOne(editValues, element);
}

const addUpdateListener = (element) => {
  element.addEventListener('click', () => editElement(element))
}

export {addCloseListener, addUpdateListener}