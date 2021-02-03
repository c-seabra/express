import React from 'react'
import styled from 'styled-components'

import ListItem from '../../lib/components/atoms/ListItem.styled'

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

const ListHeaderItem = styled(ListItem)`
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;

  &:hover {
    background-color: white;
    cursor: initial;
  }
`

const InvestorListHeader = () => {
  return (
    <ListHeaderItem>
      <Column>ID</Column>
      <Column>Name</Column>
      <Column>Pending selections</Column>
    </ListHeaderItem>
  )
}

export default InvestorListHeader
