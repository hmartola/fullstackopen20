import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import messageReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'
import logReducer from './reducers/logReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  message: messageReducer,
  blogs: blogReducer,
  login: logReducer,
  user: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))


export default store