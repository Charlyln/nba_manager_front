const loading = (state = true, action) => {
  switch (action.type) {
    case 'SETFALSE':
      return false
    case 'SETTRUE':
      return true
    default:
      return state
  }
}

export default loading
