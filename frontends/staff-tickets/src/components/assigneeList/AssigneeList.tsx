import DownloadCSVButton from '@websummit/components/src/molecules/DownloadCSVButton';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import React from 'react';
import styled from 'styled-components';

import { CreateOrderWorkUnit } from '../../lib/extract/createOrder';
import AssigneeItem from '../assigneeItem/AssigneeItem';
import AssigneeListHeader from './AssigneeListHeader';

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const AssigneeList: React.FC<{ list: CreateOrderWorkUnit[] }> = ({ list }) => {
  if (!list || list?.length < 0) return null;
  return (
    <>
      <Spacing bottom="2rem">
        {list && list.length > 0 && (
          <DownloadCSVButton
            buttonText="Download .CSV file"
            data={list.map((elem: any) => {
              return {
                // 'Booking ref': elem.bookingRef || 'N/A',
                'First name': elem.firstName || 'N/A',
                'Last name': elem.lastName || 'N/A',
                // eslint-disable-next-line
                'Email used': elem.email || 'N/A',
                'Ticket Status': elem.status?.message || 'N/A',
              };
            })}
          />
        )}
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
