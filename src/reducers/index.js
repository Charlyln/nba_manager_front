import { combineReducers } from 'redux'
import tutorial from './tutorial'
import loading from './loading'
import seasonDate from './seasonDate'

const rootReducer = combineReducers({
  tutorial,
  loading,
  seasonDate
})

export default rootReducer
