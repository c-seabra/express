import React from 'react'
import styled from 'styled-components'

import { Route, Routes } from '../../constants/routes'

const StyledNavigation = styled.nav`
  display: flex;
  list-style: none;

  > :not(:first-child) {
    margin-left: 1rem;
  }

  a {
    font-weight: 300;
    color: gray;
    text-decoration: none;
    font-size: 1.25rem;
    &.active {
      color: blue;
    }
  }
`

type Props = {
  routes: Routes
}

const MainNavigation = ({ routes }: Props) => {
  return (
    <StyledNavigation>
      {routes &&
        Object.values(routes).map((route: Route) => (
          <li key={route.path}>
            <a>{route?.meta?.description}</a>
          </li>
        ))}
    </StyledNavigation>
  )
}

export default MainNavigation
