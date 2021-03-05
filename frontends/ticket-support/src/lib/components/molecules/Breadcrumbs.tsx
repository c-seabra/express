import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled.nav`
  display: flex;
  list-style: none;

  a {
    color: #7e8496;
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
  }
`;

const SeparatorContainer = styled.span`
  margin: 0 16px;
  color: #7e8496;
`;

type Props = {
  children?: ReactElement;
  routes?: Breadcrumb[];
};

export type Breadcrumb = {
  label?: string;
  redirectUrl?: string;
};

const Breadcrumbs = ({ routes, children }: Props) => {
  return (
    <StyledContainer>
      {routes &&
        routes.map((route: Breadcrumb, index: number) => (
          <li key={`${route.label}-${atob(route.redirectUrl || '/')}`}>
            <NavLink
              activeClassName="active"
              className={route.redirectUrl ? '' : 'disabled'}
              to={route.redirectUrl || '/'}
            >
              {route?.label}
            </NavLink>

            {routes.length - 1 !== index && (
              <SeparatorContainer>/</SeparatorContainer>
            )}
          </li>
        ))}

      {!routes && { children }}
    </StyledContainer>
  );
};

export default Breadcrumbs;
