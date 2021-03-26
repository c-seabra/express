import Icon from '@websummit/components/src/atoms/Icon';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled, { createGlobalStyle } from 'styled-components';

import Logo from '../../../../packages/components/src/atoms/Logo';
import ROUTES, { Route } from '../constants/routes';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
  }
  body, input, textarea, select {
    font-family: 'Inter', sans-serif;
  }
`;

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
`;

const StyledMainHeader = styled.section`
  display: flex;
  margin: 20px auto;
  max-width: 1440px;
`;

const StyledDropbox = styled.div`
  display: none;
  position: absolute;
  top: 24px;
  border: 1px solid #dbdfe6;
  background-color: white;
  border-radius: 2px;
  z-index: 10;

  a {
    padding: 4px 30px 4px 10px;
    width: 100%;

    &.active-dropdown {
      background-color: #f2f3f6;
      font-weight: 600;
      color: #0c1439;
    }

    &.disabled {
      pointer-events: none;
      color: gray;
    }
  }

  li {
    &:hover {
      background-color: #f2f3f6;
      font-size: 14px;
      letter-spacing: 0;
      line-height: 30px;
      cursor: pointer;
    }
  }
`;

const MainNavigation = () => {
  const matcher = /^\/conferences\/[a-z0-9-]+\//;
  const match = matcher.exec(window.location.pathname);
  const prefix = match ? match[0] : '/';

  const navElements = ROUTES.map((route: Route) => (
    <li key={route.path}>
      <a
        className={route.isActive ? '' : 'disabled'}
        href={prefix + route.path}
      >
        {route?.meta?.description}
      </a>
      <StyledDropbox className="navigation_submenu">
        {route.children &&
          route.children?.length > 0 &&
          route.children?.map((childRoute: Route) => (
            <li key={childRoute.path}>
              <a
                className={childRoute.isActive ? '' : 'disabled'}
                href={prefix + childRoute.path}
              >
                {childRoute?.meta?.description}
              </a>
            </li>
          ))}
      </StyledDropbox>
      {route.hasChildren && <Icon>keyboard_arrow_down</Icon>}
    </li>
  ));

  return (
    <>
      <Helmet>
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://use.typekit.net/vst7xer.css" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyle />
      <StyledMainHeader>
        <Logo />
      </StyledMainHeader>
      <StyledMainHeader>
        <StyledNavigation>{navElements}</StyledNavigation>
      </StyledMainHeader>
    </>
  );
};

export default MainNavigation;
