import { reducerWithInitialState } from 'typescript-fsa-reducers/dist'
import { ResasState, ResasParams, ResasResult } from './types'
import { changePrefectures } from './actions'
import { Success } from 'typescript-fsa'

const initialState: ResasState = {
  prefectures: [],
}

export const resasReducer = reducerWithInitialState(initialState)
  .case(changePrefectures.started, (state: ResasState, payload: any) => {
    return { ...state }
  })
  .case(changePrefectures.failed, (state: ResasState, payload: any) => {
    return { ...state }
  })
  .case(changePrefectures.done, (state: ResasState, payload: Success<ResasParams, ResasResult>) => {
    return { prefectures: payload }
  })
