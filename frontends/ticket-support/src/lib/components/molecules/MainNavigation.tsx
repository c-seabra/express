import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
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
    cursor: pointer;

    &:hover {
      color: #2269bf;
      transition: all 0.3s ease-out;
    }

    &.active {
      color: #0067e9;
      font-weight: 600;
    }

    &.inactive {
      color: gray;
      font-weight: 600;
    }
  }

  li {
    display: flex;

    &:hover {
      > .navigation_submenu {
        display: block;
      }
    }
  }
`
const StyledDropbox = styled.div`
  display: none;
  position: absolute;
  top: 45px;
  border: 1px solid #dbdfe6;
  background-color: white;
  border-radius: 2px;

  li {
    padding: 4px 30px 4px 10px;

    &:hover {
      background-color: #f2f3f6;
      color: #0c1439;
      font-size: 14px;
      letter-spacing: 0;
      line-height: 30px;
      cursor: pointer;
    }
  }
`

type Props = {
  children?: ReactElement
  routes?: Routes
}

const MainNavigation = ({ routes, children }: Props) => {
  return (
    <StyledNavigation>
      {routes &&
        Object.values(routes).map((route: Route) => (
          <li key={route.path}>
            <a>{route?.meta?.description}</a>
            <StyledDropbox className="navigation_submenu">
              {route.children &&
                route.children?.length > 0 &&
                route.children?.map((childRoute: Route) => (
                  <li key={childRoute.path}>
                    <NavLink activeClassName="active" to={childRoute.path}>
                      {childRoute?.meta?.description}
                    </NavLink>
                  </li>
                ))}
            </StyledDropbox>
            {route.hasChildren && <span className="material-icons">keyboard_arrow_down</span>}
          </li>
        ))}

      {!routes && { children }}
    </StyledNavigation>
  )
}

export default MainNavigation
