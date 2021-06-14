import { Spacing } from '@websummit/components/src/templates/Spacing';
import React from 'react';
import styled from 'styled-components';

type Position = 'Vertical' | 'Horizontal';
type LegendProps = {
  labels: {
    color: string;
    label: string;
  }[];
  position: Position;
};

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledList = styled(Flex)<{ position?: Position }>`
  display: flex;
  margin-right: ${(props) => (props.position === 'Vertical' ? '0' : '2rem')};
`;

const BoxNode = styled.div<{ position?: Position }>`
  display: flex;
  flex-direction: ${(props) =>
    props.position === 'Vertical' ? 'column' : 'row'};
  align-items: center;
  // margin-right: ${(props) => (props.position === 'Vertical' ? '2rem' : '0')};
`;

const LabelBox = styled(Spacing)<{ color?: string }>`
  display: flex;
  justify-content: center;
  width: 16px;
  height: 16px;
  background-color: ${(props) => (props.color ? props.color : '#ccc')};
`;

const StyledMessage = styled.div`
  color: #07143e;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 26px;
  margin-left: 1rem;
`;

const Legend = ({ position = 'Horizontal', labels }: LegendProps) => {
  return (
    <BoxNode position={position}>
      {labels.map((label) => (
        <StyledList key={label.label}>
          <LabelBox color={label.color} />
          <StyledMessage>{label.label}</StyledMessage>
        </StyledList>
      ))}
    </BoxNode>
  );
};

export default Legend;
