import { rocketleagueReducer } from './rocketleague/reducers'
import { RocketLeagueActionTypes } from './rocketleague/actions'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  rocketleague: rocketleagueReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type RootActions = RocketLeagueActionTypes
