import axios from 'axios'
import { FETCH_PREFECTURES, ResasActionTypes, Prefecture } from './types'
import { Dispatch } from 'react'

export const syncChangePrefectures = () => {
    console.log("aaaa")
    return async (
        dispatch: Dispatch<ResasActionTypes>
    ) => {
        console.log("aaaa")
        const response = await axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
            headers: {'X-API-KEY': 'igDIvsWS3g9gQtO43BbUvCs6df4O2mzZy5emV8on'}
        })
        console.log(response)
        if (response.data.result) {
            return dispatch(changePrefectures(response.data.result))
        }
        return dispatch(changePrefectures([]))
    }
}

export const changePrefectures = (prefectures: [Prefecture?]): ResasActionTypes => {
    return {
        type: FETCH_PREFECTURES,
        payload: prefectures,
    }
}

export function fetchPrefectures(): ResasActionTypes {
    return changePrefectures([])
}
