import { combineReducers } from 'redux'
import tutorial from './tutorial'
import loading from './loading'

const rootReducer = combineReducers({
  tutorial,
  loading
})

export default rootReducer
