import Icon from '@websummit/components/src/atoms/Icon';
import Logo from '@websummit/components/src/atoms/Logo';
import { useEventQuery } from '@websummit/graphql/src/@types/operations';
import React from 'react';
import styled from 'styled-components';

import ROUTES, { Route } from '../constants/routes';
import { useAppContext } from './AppContext';

export const HeaderText = styled.div`
  color: #0c1439;
  font-size: 28px;
  font-weight: 500;
  letter-spacing: -0.5px;
  line-height: 32px;
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

const StyledTextHeader = styled.section`
  display: flex;
  margin: 60px auto;
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
  const { slug, token } = useAppContext();
  const { data } = useEventQuery({
    context: {
      token,
    },
    onError: (e) => console.error(e.message),
    skip: !slug,
    variables: {
      slug,
    },
  });

  const eventExists = !!data?.event;
  const eventName = data?.event?.name;

  const matcher = /^\/conferences\/[a-z0-9-]+\//;
  const match = matcher.exec(window.location.pathname);
  const prefix = match ? match[0] : '/';

  const navElements = ROUTES.map((route: Route) => {
    let childRoutes;
    if (route.children && route.children?.length > 0) {
      childRoutes = route.children?.map((childRoute: Route) => {
        const routeActive =
          childRoute.isActive && (!childRoute.conferenceSpecific || !!slug);
        return (
          <li key={childRoute.path}>
            <a
              className={routeActive ? '' : 'disabled'}
              href={prefix + childRoute.path}
            >
              {childRoute?.meta?.description}
            </a>
          </li>
        );
      });
    }
    const routeActive = route.isActive && (!route.conferenceSpecific || !!slug);
    return (
      <li key={route.path}>
        <a className={routeActive ? '' : 'disabled'} href={prefix + route.path}>
          {route?.meta?.description}
        </a>
        <StyledDropbox className="navigation_submenu">
          {childRoutes}
        </StyledDropbox>
        {route.hasChildren && <Icon>keyboard_arrow_down</Icon>}
      </li>
    );
  });

  return (
    <>
      <StyledMainHeader>
        <Logo />
      </StyledMainHeader>
      <StyledTextHeader>
        {eventExists && <HeaderText>{eventName}</HeaderText>}
      </StyledTextHeader>
      <StyledMainHeader>
        <StyledNavigation>{navElements}</StyledNavigation>
      </StyledMainHeader>
    </>
  );
};

export default MainNavigation;
