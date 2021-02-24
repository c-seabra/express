import React, { ReactElement, useState } from 'react';

import { Button, Icon, ListItem } from '../../lib/components';
import { ListColumn } from '../../lib/components/atoms';
import { ItemListHeader } from '../../lib/components/molecules';
import { Attendance } from '../../lib/types';
import { SpacingBottom } from './InvestorAccessDashboard.styled';

type InvestorAccessListProps = {
  attendances: Array<Attendance>;
  invalidBookingReferences: string[];
};

const InvestorAccessList = ({
  attendances,
  invalidBookingReferences,
}: InvestorAccessListProps): ReactElement => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const toggleDetails = () => setShowDetails((show) => !show);

  return (
    <>
      <SpacingBottom>
        {(attendances?.length !== 0 ||
          invalidBookingReferences?.length !== 0) && (
          <Button
            type="button"
            onClick={() => {
              toggleDetails();
            }}
          >
            Display entry information
          </Button>
        )}
      </SpacingBottom>
      <SpacingBottom hidden={!showDetails}>
        <ItemListHeader
          columns={['Booking Reference', 'Name', 'Attendance ID']}
        />
        {attendances.map((attendance) => {
          const { id, bookingRef, name } = attendance;
          return (
            <ListItem key={bookingRef}>
              <ListColumn columnCount={3}>
                <Icon color="#00B66D">check</Icon>
                {bookingRef}
              </ListColumn>
              <ListColumn columnCount={3}>{name}</ListColumn>
              <ListColumn columnCount={3}>{id}</ListColumn>
            </ListItem>
          );
        })}
        {invalidBookingReferences.map((bookingRef) => {
          return (
            <ListItem key={bookingRef}>
              <ListColumn columnCount={3}>
                <Icon color="#E15554">close</Icon>
                {bookingRef}
              </ListColumn>
              <ListColumn columnCount={3} />
              <ListColumn columnCount={3} />
            </ListItem>
          );
        })}
      </SpacingBottom>
    </>
  );
};

export default InvestorAccessList;
