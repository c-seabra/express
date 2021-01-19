import FilterListIcon from '@material-ui/icons/FilterList'
import React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div<{ isOpen?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 36px;

  ${props =>
    props.isOpen &&
    css`
      color: #267dec;
    `}

  & > span {
    margin-left: 4px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`

const FilterButton = ({ isOpen, onClick }: { isOpen?: boolean; onClick: () => void }) => (
  <Container isOpen={isOpen} role="button" onClick={onClick}>
    <FilterListIcon style={{ color: isOpen ? '#267dec' : 'initial' }} /> <span>Filter</span>
  </Container>
)

export default FilterButton
