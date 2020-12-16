const setTutorial = (tutorialState) => {
  return {
    type: 'SET',
    payload: tutorialState
  }
}

const setOff = () => {
  return {
    type: 'SETOFF'
  }
}

const setOn = () => {
  return {
    type: 'SETON'
  }
}

const start = () => {
  return {
    type: 'START'
  }
}

const increment = () => {
  return {
    type: 'INCREMENT'
  }
}

const setGeneralTutoOn = () => {
  return {
    type: 'SETGENERALTUTOON'
  }
}

const setGeneralTutoOff = () => {
  return {
    type: 'SETGENERALTUTOOFF'
  }
}

const incrementGeneral = () => {
  return {
    type: 'INCREMENTGENERAL'
  }
}

const decrementGeneral = () => {
  return {
    type: 'DECREMENTGENERAL'
  }
}

const setGeneralStepZero = () => {
  return {
    type: 'SETGENERALSTEPZERO'
  }
}

export default {
  setTutorial,
  setOff,
  setOn,
  increment,
  start,
  setGeneralTutoOn,
  setGeneralTutoOff,
  incrementGeneral,
  setGeneralStepZero,
  decrementGeneral
}
