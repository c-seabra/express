import React from 'react';

import BulkOperationCSV from '../../../../packages/glue/src/lib/operations/BulkOperationCSV';
import BulkOperationSummary, {
  StatusMapping,
} from '../../../../packages/glue/src/lib/operations/BulkOperationSummary';
import {
  CreateDiscountWorkUnit,
  StatusType,
} from '../lib/bulkOperation/workUnit';

function transform(elem: CreateDiscountWorkUnit) {
  return {
    Code: elem.code || 'N/A',
    'Preparation Status': elem.prepareStatus?.message || 'N/A',
    'Processing Status': elem.processStatus?.message || 'N/A',
  };
}

const AssigneeList: React.FC<{ list: CreateDiscountWorkUnit[] }> = ({
  list,
}) => {
  const mapping: StatusMapping<StatusType> = {
    ERROR: {
      color: '#E15554',
      label: 'Error',
    },
    PENDING: {
      color: '#78abef',
      label: 'Processing',
    },
    QUEUED: {
      color: '#a8a8a8',
      label: 'Ready to Start',
    },
    SUCCESS: {
      color: '#3BB273',
      label: 'Success',
    },
  };
  const order: StatusType[] = ['SUCCESS', 'ERROR', 'PENDING', 'QUEUED'];
  const statusList = list.map((elem) => elem.processStatus);
  return (
    <>
      <BulkOperationCSV list={list} transformer={transform} />
      <BulkOperationSummary list={statusList} mapping={mapping} order={order} />
    </>
  );
};

export default AssigneeList;
