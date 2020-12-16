const setTutorial = (tutorialState) => {
  return {
    type: 'SET',
    payload: tutorialState
  }
}

const start = () => {
  return {
    type: 'START'
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

const setHasViewed = () => {
  return {
    type: 'HASVIEWED'
  }
}

export default {
  setTutorial,
  start,
  setGeneralTutoOn,
  setGeneralTutoOff,
  incrementGeneral,
  setGeneralStepZero,
  decrementGeneral,
  setHasViewed
}
