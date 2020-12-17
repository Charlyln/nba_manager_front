const setLoadingFalse = (loadingState) => {
  return {
    type: 'SETFALSE',
    payload: loadingState
  }
}

const setLoadingTrue = (loadingState) => {
  return {
    type: 'SETTRUE',
    payload: loadingState
  }
}

export default {
  setLoadingFalse,
  setLoadingTrue
}
