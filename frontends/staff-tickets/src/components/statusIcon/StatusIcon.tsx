import Loader from '@websummit/components/src/atoms/Loader';
import React from 'react';

import { StatusType } from '../../lib/extract/createOrder';
import Alert from '../../lib/svgs/Alert';
import CheckMark from '../../lib/svgs/CheckMark';
import Tooltip from '../tooltip/Tooltip';

const StatusIcon: React.FC<{ status: StatusType }> = ({
  status: { type, message },
}) => {
  let iconElem = <Loader />;
  if (type === 'ERROR') iconElem = <Alert />;
  if (type === 'SUCCESS') iconElem = <CheckMark />;
  if (type === 'QUEUED') iconElem = <span>⌛</span>;
  return <Tooltip tooltipText={message}>{iconElem}</Tooltip>;
};

export default StatusIcon;
