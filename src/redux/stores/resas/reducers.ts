import { reducerWithInitialState } from 'typescript-fsa-reducers/dist'
import { ResasState, ResasParams, ResasResult, ResasError } from './types'
import { changePrefectures } from './actions'
import { Success, Failure } from 'typescript-fsa'

const initialState: ResasState = {
  prefectures: [],
}

export const resasReducer = reducerWithInitialState(initialState)
  .case(changePrefectures.started, (state: ResasState, payload: ResasParams) => {
    return { ...state }
  })
  .case(
    changePrefectures.failed,
    (state: ResasState, payload: Failure<ResasParams, ResasError>) => {
      console.log(payload.error)
      return { error: payload.error, ...state }
    },
  )
  .case(changePrefectures.done, (state: ResasState, payload: Success<ResasParams, ResasResult>) => {
    return { prefectures: payload.result.prefectures }
  })
