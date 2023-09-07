const removeElement = (element) => {
  const editForm = element.closest('.editForm');
  editForm.remove()
}

const addCloseListener = (element) => {
  element.addEventListener('click', () => removeElement(element))
}

export {addCloseListener}