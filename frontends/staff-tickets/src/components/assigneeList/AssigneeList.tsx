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
    <StyledList>
      <AssigneeListHeader />
      {list.map((order) => (
        <AssigneeItem
          key={order.email}
          bookingRef={order.reference || order.singleTicket?.bookingRef || '⌛'}
          email={order.email}
          firstName={order.firstName}
          lastName={order.lastName}
          status={order.status}
        />
      ))}
    </StyledList>
  );
};

export default AssigneeList;
