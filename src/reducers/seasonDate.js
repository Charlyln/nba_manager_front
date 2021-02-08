const seasonDate = (state = {}, action) => {
  switch (action.type) {
    case 'SETSEASONDATE':
      return action.payload
    default:
      return state
  }
}

export default seasonDate
