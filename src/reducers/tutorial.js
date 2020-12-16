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
    case 'SETGENERALTUTOON':
      return { ...state, generalTutoIs: 'on', generalStep: 0 }
    case 'SETGENERALTUTOOFF':
      return { ...state, generalTutoIs: 'off', generalStep: 0 }
    case 'INCREMENTGENERAL':
      return { ...state, generalStep: state.generalStep + 1 }
    case 'DECREMENTGENERAL':
      return { ...state, generalStep: state.generalStep - 1 }
    case 'SETGENERALSTEPZERO':
      return { ...state, generalStep: 0 }
    default:
      return state
  }
}

export default tutorial
