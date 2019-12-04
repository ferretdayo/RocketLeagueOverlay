import React from 'react'
import styled from 'styled-components'

type TextProps = {
  text: string
}

const StyledText = styled.p`
  font-size: 2em
`

const Text: React.FC<TextProps> = (props) => {
  const { text } = props
  return (
    <StyledText>{text}</StyledText>
  )
}

export default Text
