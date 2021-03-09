import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  width: 100%;
`;

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  margin: 0;
  border-radius: 4px 4px 0 0;
  background-color: #f8f8f8;
  border: 1px solid #dde0e5;
  color: #0c1439;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  padding: 0.8rem 1.5rem 0.5rem 1.5rem;
  border-bottom: none;
  box-sizing: border-box;
`;

const Card = styled.div<{ hasTitle: boolean }>`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #dde0e5;
  background-color: #ffffff;
  ${(props) =>
    props.hasTitle
      ? css`
          border-radius: 0 0 4px 4px;
          border-top: none;
        `
      : css`
          border-radius: 4px;
        `}
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
  noPadding?: boolean;
  renderActions?: () => ReactElement;
  title?: string;
};

const ContainerCard = ({
  children,
  noPadding,
  className,
  title,
  renderActions,
}: ContainerCardProps): ReactElement => {
  return (
    <Container className={className}>
      {title && (
        <HeaderBar>
          {title}
          {renderActions && renderActions()}
        </HeaderBar>
      )}
      <Card hasTitle={!!title}>
        <ChildrenWrapper noPadding={noPadding}>{children}</ChildrenWrapper>
      </Card>
    </Container>
  );
};

export default ContainerCard;
