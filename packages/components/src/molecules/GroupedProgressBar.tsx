import React from 'react';
import styled from 'styled-components';

import Tooltip from '../atoms/Tooltip';

function stringToColor(string: string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  // eslint-disable-next-line no-bitwise
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();

  return `#${'00000'.substring(0, 6 - c.length) + c}`;
}

const ProgressBarContainer = styled.div`
  display: flex;
  border-radius: 4px;
  height: 32px;
  width: 100%;
`;

const BarStack = styled.div<{ color?: string; value?: number }>`
  height: 100%;

  background-color: ${(props) => props.color};
  flex-grow: ${(props) => props.value || 0};

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const TooltipContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export type BarStackItem = {
  color?: string;
  label: string;
  value: number;
};

type GroupedProgressBarProps = {
  barStacks?: BarStackItem[];
  className?: string;
};

const GroupedProgressBar = ({
  barStacks = [],
  className,
}: GroupedProgressBarProps) => {
  return (
    <ProgressBarContainer className={className}>
      {barStacks?.map((item) => (
        <BarStack
          key={item.label}
          color={item.color || stringToColor(item.label)}
          value={item.value}
        >
          <Tooltip content={item.label}>
            <TooltipContainer />
          </Tooltip>
        </BarStack>
      ))}
    </ProgressBarContainer>
  );
};

export default GroupedProgressBar;
