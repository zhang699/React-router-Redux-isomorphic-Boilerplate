import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { todos } from './todoReducer.js'
import { userInfo } from './userInfo.js'

const rootReducer = combineReducers({
  todos,
  userInfo,
  routing: routerReducer,
})


export default rootReducer
