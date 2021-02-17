import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  width: 100%;
`;

const ColorBar = styled.div<{ color?: string }>`
  width: 100%;
  height: 25px;
  margin: 0;
  border-radius: 4px 4px 0 0;
  border: 1px solid #dde0e5;
  border-bottom: none;

  ${(props) =>
    props.color &&
    css`
      background-color: ${props.color};
      border: 1px solid ${props.color};
    `}
`;

const Card = styled.div<{ isColorBar: boolean }>`
  width: 100%;
  border: 1px solid #dde0e5;
  background-color: #ffffff;
  ${(props) =>
    props.isColorBar
      ? css`
          border-radius: 0 0 4px 4px;
          border-top: none;
        `
      : css`
          border-radius: 4px;
        `}
`;

const Title = styled.div<{ noPadding?: boolean }>`
  color: #0c1439;
  font-family: 'azo-sans-web';
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.5px;
  line-height: 32px;
  ${(props) =>
    props.noPadding &&
    css`
      padding: 1rem 1.8rem 0;
    `}

  // TODO PP: spacing needs to be evaluated as modifier to box
  margin-bottom: 40px;
`;

const ChildrenWrapper = styled.div<{ noPadding?: boolean }>`
  padding: 1rem 1.8rem 1.8rem;

  ${(props) =>
    props.noPadding &&
    css`
      padding: 0;
    `}
`;

type ContainerCardProps = {
  children?: ReactElement | ReactElement[];
  className?: string;
  color?: string;
  noPadding?: boolean;
  title?: string;
};

const ContainerCard = ({
  children,
  color,
  noPadding,
  className,
  title,
}: ContainerCardProps): ReactElement => {
  return (
    <Container className={className}>
      {color && <ColorBar color={color} />}
      <Card isColorBar={!!color}>
        <ChildrenWrapper noPadding={noPadding}>
          {title && <Title noPadding={noPadding}>{title}</Title>}
          {children}
        </ChildrenWrapper>
      </Card>
    </Container>
  );
};

export default ContainerCard;
