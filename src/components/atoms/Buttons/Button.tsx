import React from 'react'
import styled from 'styled-components'
import { Color } from '../../../constants/Styles/Color'

type ButtonProps = {
  readonly label: string
  readonly onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.SFC<ButtonProps> = (props) => {
  const { label, onClick } = props
  return (
    <StyledButton onClick={onClick}>{label}</StyledButton>
  )
}

export default Button

const StyledButton = styled.button`
  padding: 10px;
  margin: 4px;
  width: 150px;
  border: 0;
  background-color: ${Color.GRAY};
`