import React, { MouseEvent, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import styled from 'styled-components'

import * as io from "socket.io-client"
import { WsSubscribers } from "./services/WsSubscriber"
import { UpdateGameType } from "./types/RocketLeagueType"
import './App.css'
import Button from './components/atoms/Buttons/Button'
import Text from './components/atoms/Texts/Text'
import Title from './components/atoms/Texts/TitleText'
import { Color } from './constants/Styles/Color'
import { RootState } from './redux/stores'
import { updateGameState } from './redux/stores/rocketleague/actions'
import { RocketLeagueState } from './redux/stores/rocketleague/types'

type Props = {
  rocketleague: RocketLeagueState
  updateGameState: (gameState: UpdateGameType) => void
}

const App: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    WsSubscribers.init(49322, false, [
      "game:update_tick",
      "cb:heartbeat"
    ])
    const { updateGameState } = props
    WsSubscribers.subscribe("game", "update_state", (data: UpdateGameType) => {
      updateGameState(data)
      console.log(data)
    })
  }, [])

  const { game, players: {
    orange = [],
    blue = [],
  } } = props.rocketleague

  return (
    <div className="App">
      <div className="players_boost">
        <div className="teamA">
          {orange.map(player => {
            return (
              <div className="player" key={player.id}>
                <div className="player_name">{player.name}</div>
                <div className="player_boost">{player.boost}</div>
                <div className="player_boost_bg" style={{ width: player.boost + "%" }}></div>
              </div>
            )
          })}
        </div>
        <div className="teamB">
          {blue.map(player => {
            return (
              <div className="player" key={player.id}>
                <div className="player_name">{player.name}</div>
                <div className="player_boost">{player.boost}</div>
                <div className="player_boost_bg" style={{ width: player.boost + "%" }}></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    rocketleague: state.rocketleague,
  }
}

const mapDispatchToProps = {
  updateGameState
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
