import React, { ReactElement } from 'react';
import styled from 'styled-components';

export const StyledLink = styled.a`
  display: flex;
  align-items: center;
  color: #0067e9;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 20px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 400;
  border: none;
  background-color: transparent;
  outline: none;

  &:hover {
    color: #013d8d;
    background-color: transparent;
  }

  > .material-icons {
    font-size: 14px;
    padding-right: 4px;
  }
`;

type ButtonLinkProps = {
  children?: ReactElement | ReactElement[];
  onClick?: () => void;
};

const ButtonLink = ({ children, onClick }: ButtonLinkProps) => {
  return (
    <StyledLink as="button" onClick={onClick}>
      {children}
    </StyledLink>
  );
};

export default ButtonLink;
