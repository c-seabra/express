import React from 'react';
import styled from 'styled-components';

type CSSProps = {
  background?: string;
  color?: string;
};
type Props = React.BaseHTMLAttributes<HTMLSpanElement> & CSSProps;

export const StyledBadge = styled.span<CSSProps>`
  font-size: 14px;
  font-weight: 300;
  line-height: 24px;
  padding: 4px 8px;
  color: ${(props) => (props.color ? props.color : '#fff')};
  background-color: ${(props) =>
    props.background ? props.background : '#000'};
  border-radius: 4px;
  min-width: 75px;
  text-align: center;
`;

const Badge = ({ color, background, children, ...props }: Props) => {
  return (
    <StyledBadge background={background} color={color} {...props}>
      {children}
    </StyledBadge>
  );
};

export default Badge;
