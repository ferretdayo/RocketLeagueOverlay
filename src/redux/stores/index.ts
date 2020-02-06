import { counterReducer } from './counter/reducers'
import { resasReducer } from './resas/reducers'
import { CounterActionTypes } from './counter/actions'
import { ResasActionTypes } from './resas/actions'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  counter: counterReducer,
  resas: resasReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type RootActions = CounterActionTypes | ResasActionTypes
