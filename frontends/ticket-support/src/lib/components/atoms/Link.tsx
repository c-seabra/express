import React, { ReactElement } from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  color: #0067e9;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 20px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 400;

  &:hover {
    color: #013d8d;
  }

  > .material-icons {
    font-size: 14px;
    padding-right: 4px;
  }
`;

type LinkProps = {
  children?: ReactElement | ReactElement[];
  onClick?: () => void;
};

const Link = ({ children }: LinkProps) => {
  return <StyledLink>{children}</StyledLink>;
};

export default Link;
