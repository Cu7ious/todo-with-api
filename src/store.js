import { createStore, applyMiddleware } from 'redux'
import reducer, { editTask } from './reducers/tasks'
import thunk from 'redux-thunk'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)
export default store

if (process.env.NODE_ENV !== 'production') {
  window.editTask = editTask
  window.store = store
}
