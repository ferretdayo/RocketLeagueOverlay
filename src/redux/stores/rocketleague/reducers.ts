import moment from 'moment'
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist'

import { RocketLeagueState, PlayerStatus } from './types'
import {
  updateGameState,
  matchCreated,
  initialized,
  preCountdownBegin,
  postCountdownBegin,
  statfeedEvent,
  goalScored,
  replayStart,
  replayWillEnd,
  replayEnd,
  matchEnded,
  podiumStart,
  replayCreated
} from './actions'
import { UpdateGameType } from '../../../types/RocketLeagueType'
import { platform } from 'os'
import { Team } from '../../../constants/RocketLeague/Team'

export const initialState: RocketLeagueState = {
  event: "",
  game: {
    ballSpeed: 0,
    ballTeam: 0,
    hasTarget: false,
    hasWinner: false,
    isOT: false,
    isReplay: false,
    target: "",
    teams: {
      blue: {
        name: "",
        score: 0,
      },
      orange: {
        name: "",
        score: 0,
      },
    },
    time: 0,
    winner: "",
  },
  hasGame: false,
  players: {
    blue: [],
    orange: [],
  },
}

export const rocketleagueReducer = reducerWithInitialState(initialState)
  .case(updateGameState, (state: RocketLeagueState, payload: UpdateGameType): RocketLeagueState => {
    const blue = payload.game.teams[Team.BLUE]
    const orange = payload.game.teams[Team.ORANGE]

    const bluePlayers = []
    const orangePlayers = []
    for (let player in payload.players) {
      if (payload.players[player].team === Team.BLUE) {
        bluePlayers.push(payload.players[player])
      } else if (payload.players[player].team === Team.ORANGE) {
        orangePlayers.push(payload.players[player])
      }
    }

    return {
      ...state,
      ...payload, game: {
        ...payload.game,
        teams: { blue, orange }
      },
      players: { blue: bluePlayers, orange: orangePlayers }
    }
  })
