import BulkOperationCSV from '@websummit/glue/src/lib/operations/BulkOperationCSV';
import BulkOperationSummary, {
  StatusMapping,
} from '@websummit/glue/src/lib/operations/BulkOperationSummary';
import React from 'react';

import {
  CreateDiscountWorkUnit,
  StatusType,
} from '../lib/bulkOperation/workUnit';

function transform(elem: CreateDiscountWorkUnit) {
  return {
    Code: elem.code || 'N/A',
    'Preparation Status': elem.prepareStatus?.message || 'N/A',
    'Processing Status': 'Still Preparing',
  };
}

const AssigneeList: React.FC<{ list: CreateDiscountWorkUnit[] }> = ({
  list,
}) => {
  const mapping: StatusMapping<StatusType> = {
    ERROR: {
      color: '#E15554',
      label: 'Validation Error',
    },
    PENDING: {
      color: '#78abef',
      label: 'Preparing',
    },
    QUEUED: {
      color: '#a8a8a8',
      label: 'Queued',
    },
    SUCCESS: {
      color: '#3BB273',
      label: 'Ready to Start',
    },
  };
  const order: StatusType[] = ['SUCCESS', 'ERROR', 'PENDING', 'QUEUED'];
  const statusList = list.map((elem) => elem.prepareStatus);
  return (
    <>
      <BulkOperationCSV list={list} transformer={transform} />
      <BulkOperationSummary list={statusList} mapping={mapping} order={order} />
    </>
  );
};

export default AssigneeList;
