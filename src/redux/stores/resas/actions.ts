import actionCreatorFactory from 'typescript-fsa'

import axios from 'axios'
import { ResasParams, ResasResult, ResasError } from './types'
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
  try {
    const response = await axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers: { 'X-API-KEY': 'igDIvsWS3g9gQtO43BbUvCs6df4O2mzZy5emV8on' },
    })
    // ？？？？Forbiddなのになんでステータスコードが200で返ってくるんだ！！！！！！？？？？？
    if (!response.data.result) {
      return dispatch(
        changePrefectures.failed({
          params: {},
          error: response.data.message,
        }),
      )
    }

    return dispatch(
      changePrefectures.done({
        params: {},
        result: { prefectures: response.data.result },
      }),
    )
  } catch (error) {
    return dispatch(
      changePrefectures.failed({
        params: {},
        error: error,
      }),
    )
  }
}
