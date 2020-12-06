import React, { MouseEvent, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

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

  const { players: {
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
                <Text
                  text={player.name}
                  color={Color.WHITE}
                  style={styles.playerName} />

                <Text
                  text={player.boost.toString()}
                  color={Color.WHITE}
                  style={styles.playerBoost} />
                <div className="player_boost_bg" style={{ width: player.boost + "%" }}></div>
              </div>
            )
          })}
        </div>
        <div className="teamB">
          {blue.map(player => {
            return (
              <div className="player" key={player.id}>
                <Text
                  text={player.name}
                  color={Color.WHITE}
                  style={styles.playerName} />

                <Text
                  text={player.boost.toString()}
                  color={Color.WHITE}
                  style={styles.playerBoost} />
                <div className="player_boost_bg" style={{ width: player.boost + "%" }}></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const styles = {
  playerName: {
    position: 'absolute',
    top: '5px',
    left: '6px',
    fontWeight: 'bold'
  },
  playerBoost: {
    position: 'absolute',
    top: '5px',
    right: '6px'
  }
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
