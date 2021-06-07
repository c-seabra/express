import BoxMessage from '@websummit/components/src/molecules/BoxMessage';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import DownloadCSVButton from '@websummit/components/src/molecules/DownloadCSVButton';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import React from 'react';
import styled from 'styled-components';

import { switchCase } from '../../../../ticket-support/src/lib/utils/logic';
import { Status } from '../../lib/extract/bulkOperation';
import { CreateOrderWorkUnit } from '../../lib/extract/createOrder';
import AssigneeItem from '../assigneeItem/AssigneeItem';
import AssigneeListHeader from './AssigneeListHeader';

const Flex = styled.div`
  display: flex;
`;

const FlexEnd = styled(Flex)`
  justify-content: flex-end;
`;

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

// Create
const createGroups = (enumMap: any) => {
  return Object.keys(enumMap)
    .filter((key) => Number.isNaN(Number(enumMap[key])))
    .map((key) => {
      return {
        count: 0,
        name: enumMap[key],
      };
    });
};

type StatusStatGroup = {
    count: number;
    name: string
}

const createGroupedResults = (list: CreateOrderWorkUnit[], groups: any) => {
  list.map((elem) => {
    return groups.map((group: StatusStatGroup) => {
      return switchCase({
        [Status.ERROR]: (group.count += 1),
        [Status.SUCCESS]: (group.count += 1),
      })(0)(elem.status.type);
    });
  });

  return groups;
};

const AssigneeList: React.FC<{ list: CreateOrderWorkUnit[] }> = ({ list }) => {
  if (!list || list?.length < 0) return null;

  const groups = createGroups(Status);
  console.log(groups);
  const groupedResults = createGroupedResults(list, groups);
    console.log(groupedResults);

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
        <ContainerCard title="Grouped results">Test</ContainerCard>
        {groupedResults.map((elem: any) => {
          return <Flex>elem</Flex>;
        })}
      </Spacing>

      <StyledList>
        <AssigneeListHeader />
        {list.map((order) => (
          <AssigneeItem
            key={order.email}
            bookingRef={
              order.reference || order.singleTicket?.bookingRef || '⌛'
            }
            email={order.email}
            firstName={order.firstName}
            lastName={order.lastName}
            status={order.status}
          />
        ))}
      </StyledList>
    </>
  );
};

export default AssigneeList;
