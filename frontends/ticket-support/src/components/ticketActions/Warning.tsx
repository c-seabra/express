import React, { ReactElement } from 'react'
import styled from 'styled-components'

const StyledWarning = styled.div`
  font-style: italic;
  font-size: 0.8em;
  margin-bottom: .5rem;
  span {
    background: #ed1846;
    padding: .25rem;
    line-height: 1.25rem;
    color: #fff;
  }
`

const Warning = ({ children } : { children: ReactElement | string }) => {
  return (
    <StyledWarning>
      <span>{children}</span>
    </StyledWarning>
  )
}

export default Warning
