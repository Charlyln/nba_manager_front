const tutorial = (state = {}, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'SETOFF':
      return { ...state, is: 'off' }
    case 'SETON':
      return { ...state, is: 'on' }
    case 'START':
      return { is: 'on', step: 0 }
    case 'INCREMENT':
      return { ...state, step: state.step + 1 }
    default:
      return state
  }
}

export default tutorial
