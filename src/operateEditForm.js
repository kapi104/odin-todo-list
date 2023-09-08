const removeElement = (element) => {
  const editForm = element.closest('.editContainer');
  editForm.remove()
}

const addCloseListener = (element) => {
  element.addEventListener('click', () => removeElement(element))
}


const getEditFormData = (element) => {
  const editForm = element.parentElement;

  const inputs = editForm.querySelectorAll('input')
}

const addUpdateListener = (element) => {
  element.addEventListener('click', () => getEditFormData(element))
}

export {addCloseListener, addUpdateListener}