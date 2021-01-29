import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Investor } from '../../lib/types'
import { Badge } from '../../lib/components'

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

const Email = styled(ColumnStyles)`
  width: 20%;
  white-space: pre-wrap;
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

const ListHeaderItem = styled(StyledListItem)`
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;

  &:hover {
    background-color: white;
    cursor: initial;
  }
`

const ActiveState = styled(Badge)`
  background-color: #eaf9ea;
  color: #44c242;
  max-height: 32px;
`
const CancelledState = styled(Badge)`
  background-color: #f14d4c;
  color: #d8d8d8;
  max-height: 32px;
`

const BadgeColumn = styled(Column)`
  justify-content: center;

  & > span {
    line-height: 16px;
  }
`

export const InvestorListHeader = () => {
  return (
    <ListHeaderItem>
      <Column>ID</Column>
      <Column>Name</Column>
      <Column>Pending selections</Column>
    </ListHeaderItem>
  )
}

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
