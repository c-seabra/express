import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import ListItem from '../../lib/components/atoms/ListItem.styled'
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

const InvestorItem = ({ investor }: { investor: Investor }): ReactElement => {
  const history = useHistory()

  return (
    <ListItem onClick={() => history.push(`/investor/${investor.id}`)}>
      <Column>{investor.id}</Column>
      <Column>{investor.name}</Column>
      <Column>{investor.pendingSelectionCount}</Column>
    </ListItem>
  )
}

export default InvestorItem
