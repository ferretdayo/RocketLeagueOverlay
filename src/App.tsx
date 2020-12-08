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
import { RocketLeagueState } from './redux/stores/rocketleague/types'
import PlayersBoost from './components/organisms/PlayersBoost'

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

  const { players: {
    orange = [],
    blue = [],
  } } = props.rocketleague

  return (
    <div className="App">
      <StyledPlayersBoostDiv>
        <StyledTeamA>
          <PlayersBoost players={orange} teamColor={Color.ORANGE} />
        </StyledTeamA>
        <StyledTeamB>
          <PlayersBoost players={blue} teamColor={Color.BLUE} />
        </StyledTeamB>
      </StyledPlayersBoostDiv>
    </div>
  )
}

type StyledDivProps = {
}

const StyledTeamA = styled.div<StyledDivProps>`
  position: absolute;
  width: 160px;
  left: 6px;
  top: 40vh;
`

const StyledTeamB = styled.div<StyledDivProps>`
  position: absolute;
  width: 160px;
  right: 6px;
  top: 40vh;
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
