import React from 'react'
import styled from 'styled-components'

const StyledSelect = styled.select`
  display: flex;
  font-size: 16px;
  border-radius: 2px;
  border: 1px solid #a9a9a9;
  padding: 0.5rem 0.5rem;

  &:disabled {
    color: #9ba5ae;
  }
`

type Props = React.SelectHTMLAttributes<HTMLSelectElement>

const Select = ({ ...props }: Props) => {
  return <StyledSelect {...props} />
}

export default Select
