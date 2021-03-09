import React from 'react';
import styled, { css } from 'styled-components';

type Props = React.BaseHTMLAttributes<HTMLSpanElement> & {
  columnCount?: number;
};

export const ColumnStyles = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  word-break: break-word;
`;

const ListColumn = styled(ColumnStyles)<Props>`
  ${(props) =>
    props.columnCount &&
    css`
      width: ${Math.round(100 / props.columnCount)}%;
    `}
`;

export default ListColumn;
