import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  display: flex;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #999;
  padding: 8px 16px;
`

type Props = React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({ ...props }: Props) => {
  return <StyledInput {...props} />
}
