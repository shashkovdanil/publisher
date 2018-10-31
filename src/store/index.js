import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const enhancers = composeWithDevTools(applyMiddleware(thunk))

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancers)
}
