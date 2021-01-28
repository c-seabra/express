import React from 'react'
import styled from 'styled-components'

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 60px;

  & > span {
    margin-bottom: 4px;
  }
`

type TableAccordionProps = React.TableHTMLAttributes<HTMLElement> & {
  details?: []
  headers?: string
  rows?: []
}

const TableAccordion = ({ headers, rows, details, ...props }: TableAccordionProps) => {
  return <InputContainer />
}

export default TableAccordion
