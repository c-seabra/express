import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Investor } from '../../lib/types'

const ColumnStyles = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  word-break: break-word;
`
const Column = styled(ColumnStyles)`
  width: 15%;
`

const StyledListItem = styled.li`
  font-size: 0.85rem;
  display: flex;
  padding: 0.75rem;
  background-color: #fff;

  binvestor-bottom: 1px solid #dde0e5;

  &:last-child {
    binvestor-bottom: none;
  }

  &:hover {
    background-color: #dde0e5;
    cursor: pointer;
  }
`

const InvestorItem = ({ investor }: { investor: Investor }): ReactElement => {
  const history = useHistory()

  return (
    <StyledListItem onClick={() => history.push(`/investor/${investor.id}`)}>
      <Column>{investor.id}</Column>
      <Column>{investor.name}</Column>
      <Column>{investor.pendingSelectionCount}</Column>
    </StyledListItem>
  )
}

export default InvestorItem
