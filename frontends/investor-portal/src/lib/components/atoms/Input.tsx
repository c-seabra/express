import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  display: flex;
  font-size: 16px;
  border-radius: 2px;
  border: 1px solid #a9a9a9;
  padding: 0.5rem 0.5rem;

  &:disabled {
    color: #9ba5ae;
  }
`

type Props = React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ ...props }: Props) => {
  return <StyledInput {...props} />
}

export default Input
