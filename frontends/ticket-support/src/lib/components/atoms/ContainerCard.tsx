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
`

const Title = styled.div`
  font-size: 1.2rem;
  padding: 1rem;
`

const ChildrenWrapper = styled.div`
  padding: 1rem 1.8rem 1.8rem;
`

type ContainerCardProps = {
  children?: ReactElement
  className?: string
  color?: string
  title?: string
}

const ContainerCard = ({
  children,
  color,
  className,
  title,
}: ContainerCardProps): ReactElement => {
  return (
    <Container className={className}>
      <ColorBar color={color} />
      <Card>
        {title && <Title>{title}</Title>}
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </Card>
    </Container>
  )
}

export default ContainerCard