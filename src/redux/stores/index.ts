import { counterReducer } from './counter/reducers'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  counter: counterReducer,
})

export type RootState = ReturnType<typeof rootReducer>