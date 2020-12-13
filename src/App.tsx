import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import styled from 'styled-components'
import { WsSubscribers } from "./services/WsSubscriber"
import { MatchEndType, StatfeedEventType, UpdateGameType } from "./types/RocketLeagueType"
import './App.css'
import { Color } from './constants/Styles/Color'
import { RootState } from './redux/stores'
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
} from './redux/stores/rocketleague/actions'
import { PlayerStatus, RocketLeagueState } from './redux/stores/rocketleague/types'
import PlayersBoost from './components/organisms/PlayersBoost'
import { GameStatus } from './constants/RocketLeague/GameStatus'
import { Team } from './constants/RocketLeague/Team'
import { url } from 'inspector'

type Props = {
  rocketleague: RocketLeagueState
  updateGameState: (gameState: UpdateGameType) => void
  matchCreated: (hasCreatedMatch: boolean) => void
  initialized: (initialized: boolean) => void
  playing: (isPlaying: boolean) => void
  postCountdownBegin: (isPostCountdownBegin: boolean) => void
  statfeedEvent: (statfeedEvent: StatfeedEventType) => void
  replayStart: (isReplayStart: boolean) => void
  replayWillEnd: (isReplayWillEnd: boolean) => void
  replayEnd: (isReplayEnd: boolean) => void
  matchEnded: (matchResult: MatchEndType) => void
  podiumStart: (isPodiumStart: boolean) => void
  replayCreated: (hasCreadReplay: boolean) => void
}

const App: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    WsSubscribers.init(49322, false, [
      "game:update_tick",
      "cb:heartbeat"
    ])
    const {
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
      replayCreated } = props
    WsSubscribers.subscribe("game", "update_state", (data: UpdateGameType) => {
      updateGameState(data)
      console.log(data)
    })
    WsSubscribers.subscribe("game", "match_created", (data: string) => {
      matchCreated(true)
      console.log("match_created", data)
    })
    WsSubscribers.subscribe("game", "initialized", (data: string) => {
      initialized(true)
      console.log("initialized", data)
    })
    WsSubscribers.subscribe("game", "post_countdown_begin", (data: string) => {
      postCountdownBegin(true)
      setTimeout(() => {
        playing(true)
      }, 3000)
      console.log("post_countdown_begin", data)
    })
    WsSubscribers.subscribe("game", "statfeed_event", (data: StatfeedEventType) => {
      statfeedEvent(data)
      console.log("statfeed_event", data)
    })
    WsSubscribers.subscribe("game", "replay_start", (data: string) => {
      replayStart(true)
      console.log("replay_start", data)
    })
    WsSubscribers.subscribe("game", "replay_will_end", (data: string) => {
      replayWillEnd(true)
      console.log("replay_will_end", data)
    })
    WsSubscribers.subscribe("game", "replay_end", (data: string) => {
      replayEnd(true)
      console.log("replay_end", data)
    })
    WsSubscribers.subscribe("game", "match_ended", (matchResult: MatchEndType) => {
      matchEnded(matchResult)
      console.log("match_ended", matchResult)
    })
    WsSubscribers.subscribe("game", "podium_start", (data: string) => {
      podiumStart(true)
      console.log("podium_start", data)
    })
    WsSubscribers.subscribe("game", "replay_created", (data: string) => {
      replayCreated(true)
      console.log("replay_created", data)
    })
  }, [])

  const {
    game: {
      target = '',
      teams = {},
      time = 0,
    },
    players: {
      orange = [],
      blue = [],
    },
    gameStatus = GameStatus.DontPlaying
  }: RocketLeagueState = props.rocketleague

  const targetPlayer = [...orange, ...blue].find((player: PlayerStatus) => player.id === target)
  const targetPlayerNameColor = targetPlayer?.team === Team.BLUE ? Color.LIGHT_BLUE : Color.ORANGE

  return (
    <div className="App">
      {![GameStatus.MatchEnded, GameStatus.PodiumStarting, GameStatus.Initialize, GameStatus.DontPlaying].includes(gameStatus) && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', backgroundImage: "url('./images/title.png')", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', marginTop: '6px' }}>
            <div style={{ fontSize: '38px', fontWeight: 'bold', color: Color.LIGHT_BLUE, padding: '2px 6px 0 16px' }}>
              {teams[Team.BLUE].score}
            </div>
            <div style={{ fontSize: '38px', fontWeight: 'bold', letterSpacing: '2px', color: Color.BASE, padding: '2px 10px 0' }}>
              {(_.toInteger(time / 60) + "").padStart(2, '0')}:{(_.toInteger(Math.ceil(time) % 60) + "").padStart(2, '0')}
            </div>
            <div style={{ fontSize: '38px', fontWeight: 'bold', color: Color.ORANGE, padding: '2px 16px 0 6px' }}>
              {teams[Team.ORANGE].score}
            </div>
          </div>
          <StyledPlayersBoostDiv>
            <StyledTeamA>
              <PlayersBoost players={blue} targetPlayer={target} teamColor={Color.BLUE} />
            </StyledTeamA>
            <StyledTeamB>
              <PlayersBoost players={orange} targetPlayer={target} teamColor={Color.ORANGE} />
            </StyledTeamB>
          </StyledPlayersBoostDiv>
          {targetPlayer && (
            <div style={{ width: '400px', borderRadius: '6px', padding: '4px 8px', backgroundColor: "#24242490", position: 'absolute', bottom: '10px', left: 0, right: 0, margin: 'auto' }}>
              <div style={{ fontWeight: 'bold', fontSize: '24px', textAlign: 'center', color: targetPlayerNameColor }}>{targetPlayer?.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', color: 'white' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>SCORE</div>
                  <div style={{ fontSize: '16px' }}>{targetPlayer.score}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>GOALS</div>
                  <div style={{ fontSize: '16px' }}>{targetPlayer.goals}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>SHOTS</div>
                  <div style={{ fontSize: '16px' }}>{targetPlayer.shots}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>ASSISTS</div>
                  <div style={{ fontSize: '16px' }}>{targetPlayer.assists}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>SAVES</div>
                  <div style={{ fontSize: '16px' }}>{targetPlayer.saves}</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

type StyledDivProps = {
}

const StyledTeamA = styled.div<StyledDivProps>`
  position: absolute;
  width: 160px;
  left: 6px;
  top: 60vh;
  bottom: 10px;
`

const StyledTeamB = styled.div<StyledDivProps>`
  position: absolute;
  width: 160px;
  right: 6px;
  top: 60vh;
`

const StyledPlayersBoostDiv = styled.div<StyledDivProps>`
  position: relative;
`

const mapStateToProps = (state: RootState) => {
  return {
    rocketleague: state.rocketleague,
  }
}

const mapDispatchToProps = {
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
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
