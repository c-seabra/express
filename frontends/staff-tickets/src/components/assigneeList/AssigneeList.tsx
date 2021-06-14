import Badge from '@websummit/components/src/atoms/Badge';
import BoxMessage from '@websummit/components/src/molecules/BoxMessage';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import DownloadCSVButton from '@websummit/components/src/molecules/DownloadCSVButton';
import GroupedProgressBar from '@websummit/components/src/molecules/GroupedProgressBar';
import Legend from '@websummit/components/src/molecules/Legend';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';

import { CreateOrderWorkUnit } from '../../lib/extract/createOrder';
import UploadStatus from '../statusIcon/StatusIcon';

const Flex = styled.div`
  display: flex;
`;

const FlexCentered = styled(Flex)`
  justify-content: center;
`;

const FlexEnd = styled(Flex)`
  justify-content: flex-end;
`;

const createGroupedResults = (list: CreateOrderWorkUnit[]) => {
  const statuses = list.map((e: CreateOrderWorkUnit) => {
    return {
      status: e.status.type,
    };
  });

  return _.countBy(statuses, 'status');
};

const tableShape: ColumnDescriptor<any>[] = [
  {
    header: 'Booking Ref',
    renderCell: (order) =>
      order.reference || order.singleTicket?.bookingRef || '⌛',
    width: '20%',
  },
  {
    header: 'First & last name',
    renderCell: (order) => `${order.firstName} ${order.lastName} ` || 'N/A',
    width: '30%',
  },
  {
    header: 'Email',
    renderCell: (order) => order.email || 'N/A',
    width: '30%',
  },
  {
    header: 'Status',
    renderCell: (order) => {
      return (order.status && <UploadStatus status={order.status} />) || 'N/A';
    },
  },
];

const AssigneeList: React.FC<{ list: CreateOrderWorkUnit[] }> = ({ list }) => {
  if (!list || list?.length < 0) return null;

  const groupedResults = createGroupedResults(list);
  const stacks = [
    {
      color: '#3BB273',
      label: 'Success',
      value: groupedResults.SUCCESS,
    },
    {
      color: '#E15554',
      label: 'Error',
      value: groupedResults.ERROR,
    },
    {
      color: '#78abef',
      label: 'Processing',
      value: groupedResults.PENDING,
    },
    {
      color: '#a8a8a8',
      label: 'Processing',
      value: groupedResults.QUEUED,
    },
  ];

  const labels = stacks.map((elem) => ({
    ...elem,
    label: `${elem.label} (${elem.value || 0})`,
  }));

  return (
    <>
      <Spacing bottom="2rem">
        {list && list.length > 0 && (
          <>
            <Flex>
              <BoxMessage
                backgroundColor="rgb(253, 235, 235)"
                color="#E15554"
                dimension="sm"
                type="warning"
              >
                Before getting new results please refresh this page
              </BoxMessage>
            </Flex>
            <FlexEnd>
              <DownloadCSVButton
                buttonText="Download .csv file"
                data={list.map((elem: any) => {
                  return {
                    'Booking ref':
                      elem.reference || elem.singleTicket?.bookingRef || 'N/A',
                    'First name': elem.firstName || 'N/A',
                    'Last name': elem.lastName || 'N/A',
                    // eslint-disable-next-line
                    'Email used': elem.email || 'N/A',
                    'Ticket Status': elem.status?.message || 'N/A',
                  };
                })}
              />
            </FlexEnd>
          </>
        )}
      </Spacing>

      <Spacing bottom="2rem">
        <ContainerCard title="Grouped results">
          <FlexEnd>
            <Spacing bottom="0.5rem">
              <span>Total: </span>
              <Badge background="#CCC" color="#000">
                <span>
                  {groupedResults.SUCCESS || 0}/{list?.length}
                </span>
              </Badge>
            </Spacing>
          </FlexEnd>
          <Spacing bottom="1rem">
            <Spacing bottom="1rem">
              <Flex>
                <GroupedProgressBar barStacks={stacks} />
              </Flex>
            </Spacing>

            <FlexCentered>
              <Legend labels={labels} position="Horizontal" />
            </FlexCentered>
          </Spacing>
        </ContainerCard>
      </Spacing>

      <Spacing bottom="2rem">
        <ContainerCard noPadding title="Results">
          <Table<any> items={list} tableShape={tableShape} />
        </ContainerCard>
      </Spacing>
    </>
  );
};

export default AssigneeList;
