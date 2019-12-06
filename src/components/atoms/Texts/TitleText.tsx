import React from 'react'
import styled from 'styled-components'
import { Color } from '../../../constants/Styles/Color'

type TitleTextProps = {
  readonly text: string
  readonly color?: Color
}

const TitleText: React.SFC<TitleTextProps> = (props) => {
  const { text, color = Color.WHITE } = props
  return (
    <StyledTitleText color={color}>{text}</StyledTitleText>
  )
}

export default TitleText

type StyledTitleTextProps = {
  readonly color?: Color
}

const StyledTitleText = styled.h1<StyledTitleTextProps>`
  font-size: 2em;
  color: ${props => props.color};
`
