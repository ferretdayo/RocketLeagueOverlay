import actionCreatorFactory from 'typescript-fsa'
import { UpdateGameType } from '../../../types/RocketLeagueType'

export enum RocketLeagueActionTypes {
  UPDATE_GAME_STATE = 'rocketleague/UPDATE_GAME_STATE',
  MATCH_CREATED = 'rocketleague/MATCH_CREATED',
  INITIALIZED = 'rocketleague/INITIALIZED',
  PRE_COUNTDOWN_BEGIN = 'rocketleague/PRE_COUNTDOWN_BEGIN',
  POST_COUNTDOWN_BEGIN = 'rocketleague/POST_COUNTDOWN_BEGIN',
  STATFEED_EVENT = 'rocketleague/STATFEED_EVENT',
  GOAL_SCORED = 'rocketleague/GOAL_SCORED',
  REPLAY_START = 'rocketleague/REPLAY_START',
  REPLAY_WILL_END = 'rocketleague/REPLAY_WILL_END',
  REPLAY_END = 'rocketleague/REPLAY_END',
  MATCH_ENDED = 'rocketleague/MATCH_ENDED',
  PODIUM_START = 'rocketleague/PODIUM_START',
  REPLAY_CREATED = 'rocketleague/REPLAY_CREATED',
}
const actionCreator = actionCreatorFactory()

export const updateGameState = actionCreator<UpdateGameType>(RocketLeagueActionTypes.UPDATE_GAME_STATE)
export const matchCreated = actionCreator<number>(RocketLeagueActionTypes.MATCH_CREATED)
export const initialized = actionCreator<number>(RocketLeagueActionTypes.INITIALIZED)
export const preCountdownBegin = actionCreator<number>(RocketLeagueActionTypes.PRE_COUNTDOWN_BEGIN)
export const postCountdownBegin = actionCreator<number>(RocketLeagueActionTypes.POST_COUNTDOWN_BEGIN)
export const statfeedEvent = actionCreator<number>(RocketLeagueActionTypes.STATFEED_EVENT)
export const goalScored = actionCreator<number>(RocketLeagueActionTypes.GOAL_SCORED)
export const replayStart = actionCreator<number>(RocketLeagueActionTypes.REPLAY_START)
export const replayWillEnd = actionCreator<number>(RocketLeagueActionTypes.REPLAY_WILL_END)
export const replayEnd = actionCreator<number>(RocketLeagueActionTypes.REPLAY_END)
export const matchEnded = actionCreator<number>(RocketLeagueActionTypes.MATCH_ENDED)
export const podiumStart = actionCreator<number>(RocketLeagueActionTypes.PODIUM_START)
export const replayCreated = actionCreator<number>(RocketLeagueActionTypes.REPLAY_CREATED)
