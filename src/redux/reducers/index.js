import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { todos } from './todoReducer.js'
import { userInfo } from './userInfo.js'
import { article } from './article.js'
import { waiting } from './waiting.js'

const rootReducer = combineReducers({
  waiting,
  todos,
  userInfo,
  article,
  routing: routerReducer,
})


export default rootReducer
