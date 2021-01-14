import React from 'react'
import styled from 'styled-components'

const StyledNavigation = styled.nav`
  display: flex;
  list-style: none;

  > :not(:first-child) {
    margin-left: 1rem;
  }

  a {
    font-weight: 300;
    color: gray;
    font-size: 1.25rem;
    &.active {
      color: blue;
    }
  }
`

const MainNavigation = props => {
  return (
    <StyledNavigation {...props}>
      <li>
        <a href="/tickets">Tickets</a>
      </li>
      <li>
        <a href="/orders">Orders</a>
      </li>
    </StyledNavigation>
  )
}

export default MainNavigation
