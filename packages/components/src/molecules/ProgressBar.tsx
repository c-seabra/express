import React from 'react';
import styled from 'styled-components';

type CSSProps = {
  background?: string;
  progress?: number;
  progressBackground?: string;
};
type Props = React.BaseHTMLAttributes<HTMLSpanElement> & CSSProps;

export const StyledProgressBar = styled.span<CSSProps>`
  display: flex;
  background-color: ${(props) =>
    props.background ? props.background : '#E9E9E9'};
  border-radius: 3.5px;
  width: 100%;
  min-height: 4px;
`;

export const StyledProgress = styled.span<CSSProps>`
  display: flex;
  width: ${(props) => (props.progress ? `${props.progress}%` : '0%')};
  background-color: ${(props) =>
    props.background ? props.background : '#0067E9'};
  // Fallback for 100%
  background-color: ${(props) => props.progress === 100 && '#3BB273'};
  border-radius: 3.5px;
  min-height: 4px;
`;

const ProgressBar = ({
  background,
  progress,
  progressBackground,
  ...props
}: Props) => {
  return (
    <StyledProgressBar background={background} {...props}>
      <StyledProgress
        progress={progress}
        progressBackground={progressBackground}
      />
    </StyledProgressBar>
  );
};

export default ProgressBar;
