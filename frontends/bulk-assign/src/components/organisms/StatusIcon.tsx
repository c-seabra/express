import React from 'react';

import Alert from '../../lib/svgs/Alert';
import CheckMark from '../../lib/svgs/CheckMark';
import { StatusType } from '../assigneeItem/AssigneeItem';
import Tooltip from './Tooltip';
import Loader from '@websummit/components/src/atoms/Loader';

const StatusIcon: React.FC<{ status: StatusType }> = ({
  status: { type, message },
}) => {
  let iconElem = <Loader />;
  if (type === 'ERROR') iconElem = <Alert />;
  if (type === 'SUCCESS') iconElem = <CheckMark />;
  return <Tooltip tooltipText={message}>{iconElem}</Tooltip>;
};

export default StatusIcon;
