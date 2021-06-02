import React from 'react';
import styled, { css } from 'styled-components';

type Props = React.BaseHTMLAttributes<HTMLSpanElement> & {
  color?: string;
  size?: string;
};

export const IconWrapper = styled.div<Props>`
  height: ${(props) => (props.size ? props.size : '40px')};
  > .material-icons {
    font-size: ${(props) => (props.size ? props.size : '40px')};
    color: ${(props) => (props.color ? props.color : '#0067e9')};
  }
`;

const StyledIcon = styled.span<Props>`  cursor: pointer;

  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}

  ${(props) =>
    props.size &&
    css`
      font-size: ${props.size} !important; // Need to override material-icons defaults
    `}
`;

const Icon = ({ color, size, children, ...props }: Props) => {
  return (
    <StyledIcon className="material-icons" color={color} size={size} {...props}>
      {children}
    </StyledIcon>
  );
};

export default Icon;
