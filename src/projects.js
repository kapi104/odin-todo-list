const projectsFactory = (title, description) => {
  let todos = []
  return {title, description, todos}
}

export default projectsFactory;