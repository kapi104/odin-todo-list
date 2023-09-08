const removeElement = (element) => {
  const editForm = element.closest('.editForm');
  editForm.remove()
}

const addCloseListener = (element) => {
  element.addEventListener('click', () => removeElement(element))
}



const addUpdateListener = (element) => {
  element.addEventListener('click', getEditFormData)
}

export {addCloseListener}