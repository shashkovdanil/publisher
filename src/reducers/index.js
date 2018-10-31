import { combineReducers } from 'redux'
import data from './data'
import loading from './loading'
import error from './error'
import ui from './ui'

export default combineReducers({
  data,
  loading,
  error,
  ui,
})
