import React, { ReactElement } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  width: 100%;
`

const ColorBar = styled.div<{ color?: string }>`
  width: 100%;
  height: 25px;
  margin: 0;
  background-color: ${props => props.color};
  border-radius: 4px 4px 0 0;
  border: 1px solid ${props => props.color};
`

const Card = styled.div`
  width: 100%;
  border: 1px solid #dde0e5;
  border-radius: 0 0 4px 4px;
  border-top: none;
  background-color: #ffffff;
`

const Title = styled.div`
  color: #0c1439;
  font-family: 'azo-sans-web';
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.5px;
  line-height: 32px;

  // TODO PP: spacing needs to be evaluated as modifier to box
  margin-bottom: 40px;
`

const ChildrenWrapper = styled.div`
  padding: 1rem 1.8rem 1.8rem;
`

type ContainerCardProps = {
  children?: ReactElement | ReactElement[]
  className?: string
  color?: string
  title?: string
}

const ContainerCard = ({ children, color, className, title }: ContainerCardProps): ReactElement => {
  return (
    <Container className={className}>
      <ColorBar color={color} />
      <Card>
        <ChildrenWrapper>
          {title && <Title>{title}</Title>}
          {children}
        </ChildrenWrapper>
      </Card>
    </Container>
  )
}

export default ContainerCard
