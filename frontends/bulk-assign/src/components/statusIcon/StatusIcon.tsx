import React, { ReactElement } from 'react'
import styled, { keyframes } from 'styled-components'
import { StatusType } from '../assigneeItem/AssigneeItem'

import Alert from '../../lib/svgs/Alert'
import Loading from '../../lib/svgs/Loading'
import Tooltip from '../tooltip/Tooltip'
import CheckMark from '../../lib/svgs/CheckMark'
import Loader from './Loader'


const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Rotate = styled.div`
  animation: ${rotate} 2s linear infinite;
  transform-origin: center center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusIcon = ({
  status: { type, message }
}: {
  status: StatusType
}) => {
  let iconElem = <Loader />
  if(type === 'error') iconElem = <Alert />
  if(type === 'success') iconElem = <CheckMark />
  return (
    <Tooltip tooltipText={message}>
      {iconElem}
    </Tooltip>
  )
}

export default StatusIcon
