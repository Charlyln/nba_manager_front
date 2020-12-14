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

export default {
  setTutorial,
  setOff,
  setOn,
  increment,
  start
}
