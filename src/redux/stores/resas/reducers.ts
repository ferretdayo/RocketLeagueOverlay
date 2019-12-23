import { ResasState, ResasActionTypes, FETCH_PREFECTURES } from './types'

const initialState: ResasState = {
  prefectures: []
}

export function resasReducer(
  state = initialState,
  action: ResasActionTypes
): ResasState {
  switch (action.type) {
    case FETCH_PREFECTURES: 
      return {
        prefectures: action.payload
      }
    default: 
      return state
  }
}