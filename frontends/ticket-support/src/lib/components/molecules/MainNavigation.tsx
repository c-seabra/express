import React from 'react'
import styled from 'styled-components'

import { Route, Routes } from '../../constants/routes'

const StyledNavigation = styled.nav`
  display: flex;
  list-style: none;

  > :not(:first-child) {
    margin-left: 2rem;
  }

  a {
    color: #0c1439;
    font-size: 14px;
    letter-spacing: 0;
    line-height: 24px;
    font-weight: 300;
    text-decoration: none;

    &.active {
      color: #0067e9;
      font-weight: 600;
    }
  }

  li {
    display: flex;
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
            {route.hasChildren && <span className="material-icons">keyboard_arrow_down</span>}
          </li>
        ))}
    </StyledNavigation>
  )
}

export default MainNavigation
