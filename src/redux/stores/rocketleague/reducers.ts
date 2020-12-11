import { reducerWithInitialState } from 'typescript-fsa-reducers/dist'

import { RocketLeagueState } from './types'
import {
  updateGameState,
  matchCreated,
  initialized,
  playing,
  postCountdownBegin,
  statfeedEvent,
  replayStart,
  replayWillEnd,
  replayEnd,
  matchEnded,
  podiumStart,
  replayCreated
} from './actions'
import { MatchEndType, StatfeedEventType, UpdateGameType } from '../../../types/RocketLeagueType'
import { Team } from '../../../constants/RocketLeague/Team'
import { GameStatus } from '../../../constants/RocketLeague/GameStatus'

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
      "0": {
        name: "",
        score: 0,
      },
      "1": {
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
  goalScored: false,
  statfeedEvent: {
    main_target: {
      id: "",
      name: "",
    },
    secondary_target: {
      id: "",
      name: "",
    },
    type: ""
  },
  isGoal: false,
  hasCreatedReplay: false,
  winnerTeam: -1,
  gameStatus: -1
}

export const rocketleagueReducer = reducerWithInitialState(initialState)
  .case(updateGameState, (state: RocketLeagueState, payload: UpdateGameType): RocketLeagueState => {
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
      ...payload,
      players: { blue: bluePlayers, orange: orangePlayers }
    }
  })
  .case(matchCreated, (state: RocketLeagueState, payload: boolean): RocketLeagueState => {
    return {
      ...state,
      gameStatus: GameStatus.DontPlaying
    }
  })
  .case(initialized, (state: RocketLeagueState, payload: boolean): RocketLeagueState => {
    return {
      ...state,
      gameStatus: GameStatus.Initialize
    }
  })
  .case(playing, (state: RocketLeagueState, payload: boolean): RocketLeagueState => {
    return {
      ...state,
      gameStatus: GameStatus.Playing
    }
  })
  .case(postCountdownBegin, (state: RocketLeagueState, payload: boolean): RocketLeagueState => {
    return {
      ...state,
      gameStatus: GameStatus.CountDown
    }
  })
  .case(statfeedEvent, (state: RocketLeagueState, payload: StatfeedEventType): RocketLeagueState => {
    return {
      ...state,
      statfeedEvent: payload
    }
  })
  .case(replayStart, (state: RocketLeagueState, payload: boolean): RocketLeagueState => {
    return {
      ...state,
      gameStatus: GameStatus.Replaying
    }
  })
  .case(replayWillEnd, (state: RocketLeagueState, payload: boolean): RocketLeagueState => {
    return {
      ...state,
    }
  })
  .case(replayEnd, (state: RocketLeagueState, payload: boolean): RocketLeagueState => {
    return {
      ...state,
      gameStatus: GameStatus.Playing
    }
  })
  .case(matchEnded, (state: RocketLeagueState, payload: MatchEndType): RocketLeagueState => {
    return {
      ...state,
      gameStatus: GameStatus.MatchEnded,
      winnerTeam: payload.winner_team_num
    }
  })
  .case(podiumStart, (state: RocketLeagueState, payload: boolean): RocketLeagueState => {
    return {
      ...state,
      gameStatus: GameStatus.PodiumStarting
    }
  })
  .case(replayCreated, (state: RocketLeagueState, payload: boolean): RocketLeagueState => {
    return {
      ...state,
      hasCreatedReplay: payload
    }
  })
