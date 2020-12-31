import React from 'react'
import styled from 'styled-components'
import { Team } from '../../../constants/RocketLeague/Team'
import { Color } from '../../../constants/Styles/Color'
import { TeamsType } from '../../../redux/stores/rocketleague/types'
import ScoreBackgroundImage from '../../../assets/images/title.png'
import _ from 'lodash'


type Props = {
  readonly teams: TeamsType
  readonly time: number
}

const ScoreHeader: React.FC<Props> = ({ teams, time }: Props) => {
  return (
    <StyledDiv>
      <StyledTeamDiv color={Color.BLUE} style={{padding: '8px 0 0 16px'}}>
        {teams[Team.BLUE].score}
      </StyledTeamDiv>
      <StyledTimerDiv>
        {(_.toInteger(time / 60) + "").padStart(2, '0')}:{(_.toInteger(Math.ceil(time) % 60) + "").padStart(2, '0')}
      </StyledTimerDiv>
      <StyledTeamDiv color={Color.ORANGE} style={{padding: '8px 16px 0 0'}}>
        {teams[Team.ORANGE].score}
      </StyledTeamDiv>
    </StyledDiv>
  )
}

export default ScoreHeader

type StyledDivProps = {
}

type StyleTeamDivProps = {
  readonly color: Color
  readonly style: object
}

type StyledTimerDivProps = {
}

const StyledDiv = styled.div<StyledDivProps>`
  display: flex;
  height: 64px;
  justify-content: center;
  background-image: url(${ScoreBackgroundImage});
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 6px;
`

const StyledTeamDiv = styled.div<StyleTeamDivProps>`
  font-size: 38px;
  font-weight: bold;
  color: ${props => props.color};
  ${props => ({ ...props.style })};
`

const StyledTimerDiv = styled.div<StyledTimerDivProps>`
  font-size: 34px;
  text-align: center;
  width: 160px;
  font-weight: bold;
  letter-spacing: 2px;
  color: ${Color.BASE};
  padding: 10px 10px 0;
`