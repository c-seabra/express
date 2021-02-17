import React from 'react';
import { StatusType } from '../assigneeItem/AssigneeItem';

import Alert from '../../lib/svgs/Alert';
import Tooltip from '../tooltip/Tooltip';
import CheckMark from '../../lib/svgs/CheckMark';
import Loader from './Loader';

const StatusIcon: React.FC<{ status: StatusType }> = ({
  status: { type, message },
}) => {
  let iconElem = <Loader />;
  if (type === 'ERROR') iconElem = <Alert />;
  if (type === 'SUCCESS') iconElem = <CheckMark />;
  return <Tooltip tooltipText={message}>{iconElem}</Tooltip>;
};

export default StatusIcon;
