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
    winner: "0",
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
  // gameStatus: -1,
  gameStatus: GameStatus.MatchEnded,
  // result: {
  //   teams: {
  //     "0": {
  //       name: "",
  //       score: 0,
  //     },
  //     "1": {
  //       name: "",
  //       score: 0,
  //     },
  //   },
  //   players: {
  //     blue: [],
  //     orange: [],
  //   },
  // }
  result: {
    teams: {
      0: {
        name: "PrimaKamerad",
        score: 4
      },
      1: {
        name: "Megane",
        score: 0
      },
    },
    players: {
      orange: [
        {
          name: "Siolemon77",
          assists: 0,
          attacker: "a",
          boost: 20,
          cartouches: 3,
          goals: 1,
          hasCar: true,
          id: "Siolemon77",
          isDead: false,
          isSonic: false,
          primaryID: 3,
          saves: 0,
          score: 200,
          shots: 2,
          speed: 20,
          team: 0,
          touches: 3
        },
        {
          name: "Suncom666",
          assists: 0,
          attacker: "a",
          boost: 20,
          cartouches: 3,
          goals: 0,
          hasCar: true,
          id: "Suncom666",
          isDead: false,
          isSonic: false,
          primaryID: 2,
          saves: 0,
          score: 210,
          shots: 0,
          speed: 20,
          team: 0,
          touches: 3
        },
        {
          name: "Livinton_Lorand",
          assists: 0,
          attacker: "a",
          boost: 20,
          cartouches: 3,
          goals: 0,
          hasCar: true,
          id: "Livinton_Lorand",
          isDead: false,
          isSonic: false,
          primaryID: 1,
          saves: 0,
          score: 130,
          shots: 3,
          speed: 20,
          team: 0,
          touches: 3
        }
      ],
      blue: [
        {
          name: "Ferretdayo",
          assists: 0,
          attacker: "a",
          boost: 20,
          cartouches: 3,
          goals: 3,
          hasCar: true,
          id: "ferret",
          isDead: false,
          isSonic: false,
          primaryID: 3,
          saves: 1,
          score: 330,
          shots: 5,
          speed: 20,
          team: 0,
          touches: 3
        },
        {
          name: "ReoNy",
          assists: 0,
          attacker: "a",
          boost: 20,
          cartouches: 3,
          goals: 1,
          hasCar: true,
          id: "reony",
          isDead: false,
          isSonic: false,
          primaryID: 2,
          saves: 3,
          score: 230,
          shots: 1,
          speed: 20,
          team: 0,
          touches: 3
        },
        {
          name: "rarumo",
          assists: 0,
          attacker: "a",
          boost: 20,
          cartouches: 3,
          goals: 0,
          hasCar: true,
          id: "rarumo",
          isDead: false,
          isSonic: false,
          primaryID: 1,
          saves: 0,
          score: 150,
          shots: 3,
          speed: 20,
          team: 0,
          touches: 3
        }
      ]
    }
  },
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
