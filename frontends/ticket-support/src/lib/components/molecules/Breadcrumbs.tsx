import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledContainer = styled.nav`
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

    &.disabled {
      pointer-events: none;
      color: gray;
    }

    &.active {
      color: #0067e9;
      font-weight: 600;
    }
  }

  li {
    display: flex;
    position: relative;

    &:hover {
      > .navigation_submenu {
        display: block;
      }
    }
  }
`

type Props = {
  children?: ReactElement
  routes?: Breadcrumb[]
}

type Breadcrumb = {
  isActive?: boolean
  label?: string
  redirectUrl?: string
}

const testB: Breadcrumb[] = [
  {
    isActive: true,
    label: 'WebSummmit',
    redirectUrl: 'test',
  },

  {
    isActive: true,
    label: 'WebSummmit',
    redirectUrl: 'test',
  },

  {
    isActive: true,
    label: 'WebSummmit',
    redirectUrl: 'test',
  },
]

const Breadcrumbs = ({ routes = testB, children }: Props) => {
  return (
    <StyledContainer>
      {routes &&
        routes.map((route: Breadcrumb, index: number) => (
          <li key={`b_id-${index}`}>
            <NavLink
              activeClassName="active"
              className={route.isActive ? '' : 'disabled'}
              to={route.redirectUrl || '/'}
            >
              {route?.label}
            </NavLink>

            {Object.values(routes).length !== index - 1 && (
              <span className="material-icons">keyboard_arrow_right</span>
            )}
          </li>
        ))}

      {!routes && { children }}
    </StyledContainer>
  )
}

export default Breadcrumbs
