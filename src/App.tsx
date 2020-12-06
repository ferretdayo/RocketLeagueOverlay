import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import styled from 'styled-components'
import { WsSubscribers } from "./services/WsSubscriber"
import { UpdateGameType } from "./types/RocketLeagueType"
import './App.css'
import { Color } from './constants/Styles/Color'
import { RootState } from './redux/stores'
import { updateGameState } from './redux/stores/rocketleague/actions'
import { RocketLeagueState } from './redux/stores/rocketleague/types'
import PlayersBoost from './components/organisms/PlayersBoost'

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
  updateGameState
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
