import React from 'react';
import styled from 'styled-components';

import { AssigneesList } from '../app/App';
import AssigneeItem from '../assigneeItem/AssigneeItem';
import AssigneeItemProvider from '../assigneeItem/AssigneeItemProvider';
import AssigneeListHeader from './AssigneeListHeader';

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const AssigneeList: React.FC<{ list: AssigneesList }> = ({ list }) => {
  if (!list || list?.length < 0) return null;
  return (
    <StyledList>
      <AssigneeListHeader />
      {list.map(({ firstName, lastName, email, bookingRef, autoClaim }) => {
        if (!bookingRef && !email)
          return (
            <AssigneeItem
              bookingRef={bookingRef}
              claimStatus={{
                message: 'Not enough information provided',
                type: 'ERROR',
              }}
              email={email}
              firstName={firstName}
              lastName={lastName}
              status={{
                message: 'Not enough information provided',
                type: 'ERROR',
              }}
            />
          );
        return (
          <AssigneeItemProvider
            key={`${bookingRef}-${email}`}
            autoClaim={autoClaim}
            bookingRef={bookingRef.toUpperCase()}
            email={email}
            firstName={firstName}
            lastName={lastName}
          />
        );
      })}
    </StyledList>
  );
};

export default AssigneeList;
