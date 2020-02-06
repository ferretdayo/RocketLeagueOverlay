import actionCreatorFactory, { Success, Failure } from 'typescript-fsa'

import axios from 'axios'
import { Prefecture, ResasParams, ResasResult, ResasError } from './types'
import { Dispatch } from 'react'

export enum ResasActionTypes {
  FETCH_PREFECTURES = 'resas/FETCH_PREFECTURES',
}
const actionCreator = actionCreatorFactory()

export const changePrefectures = actionCreator.async<ResasParams, ResasResult, ResasError>(
  ResasActionTypes.FETCH_PREFECTURES,
)

export const syncChangePrefectures = () => async (dispatch: Dispatch<any>) => {
  dispatch(changePrefectures.started({ params: {} }))
  const response = await axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
    headers: { 'X-API-KEY': 'igDIvsWS3g9gQtO43BbUvCs6df4O2mzZy5emV8on' },
  })

  console.log(response.data.result)
  if (response.data.result) {
    return dispatch(
      changePrefectures.done({
        params: {},
        result: { prefectures: response.data.result },
      }),
    )
  }
  return dispatch(
    changePrefectures.done({
      params: {},
      result: { prefectures: response.data.result },
    }),
  )
}
