import actionCreatorFactory from 'typescript-fsa'
import { MatchEndType, StatfeedEventType, UpdateGameType } from '../../../types/RocketLeagueType'

export enum RocketLeagueActionTypes {
  UPDATE_GAME_STATE = 'rocketleague/UPDATE_GAME_STATE',
  MATCH_CREATED = 'rocketleague/MATCH_CREATED',
  INITIALIZED = 'rocketleague/INITIALIZED',
  PLAYING = 'rocketleague/PLAYING',
  POST_COUNTDOWN_BEGIN = 'rocketleague/POST_COUNTDOWN_BEGIN',
  STATFEED_EVENT = 'rocketleague/STATFEED_EVENT',
  REPLAY_START = 'rocketleague/REPLAY_START',
  REPLAY_WILL_END = 'rocketleague/REPLAY_WILL_END',
  REPLAY_END = 'rocketleague/REPLAY_END',
  MATCH_ENDED = 'rocketleague/MATCH_ENDED',
  PODIUM_START = 'rocketleague/PODIUM_START',
  REPLAY_CREATED = 'rocketleague/REPLAY_CREATED',
}
const actionCreator = actionCreatorFactory()

export const updateGameState = actionCreator<UpdateGameType>(RocketLeagueActionTypes.UPDATE_GAME_STATE)
export const matchCreated = actionCreator<boolean>(RocketLeagueActionTypes.MATCH_CREATED)
export const initialized = actionCreator<boolean>(RocketLeagueActionTypes.INITIALIZED)
export const playing = actionCreator<boolean>(RocketLeagueActionTypes.PLAYING)
export const postCountdownBegin = actionCreator<boolean>(RocketLeagueActionTypes.POST_COUNTDOWN_BEGIN)
export const statfeedEvent = actionCreator<StatfeedEventType>(RocketLeagueActionTypes.STATFEED_EVENT)
export const replayStart = actionCreator<boolean>(RocketLeagueActionTypes.REPLAY_START)
export const replayWillEnd = actionCreator<boolean>(RocketLeagueActionTypes.REPLAY_WILL_END)
export const replayEnd = actionCreator<boolean>(RocketLeagueActionTypes.REPLAY_END)
export const matchEnded = actionCreator<MatchEndType>(RocketLeagueActionTypes.MATCH_ENDED)
export const podiumStart = actionCreator<boolean>(RocketLeagueActionTypes.PODIUM_START)
export const replayCreated = actionCreator<boolean>(RocketLeagueActionTypes.REPLAY_CREATED)
