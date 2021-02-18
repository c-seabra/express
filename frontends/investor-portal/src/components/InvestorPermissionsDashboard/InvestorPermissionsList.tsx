import React, { ReactElement, useState } from 'react';

import { Button, Icon, ListItem } from '../../lib/components';
import { ListColumn } from '../../lib/components/atoms';
import { ItemListHeader } from '../../lib/components/molecules';
import { SpacingBottom } from './InvestorPermissionsDashboard.styled';

type Ticket = {
  attendanceId?: string;
  bookingRef: string;
  name?: string;
};

type InvestorPermissionsListProps = {
  tickets: Array<Ticket>;
};

const InvestorPermissionsList = ({
  tickets,
}: InvestorPermissionsListProps): ReactElement => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const toggleDetails = () => setShowDetails((show) => !show);

  return (
    <>
      <SpacingBottom>
        {tickets?.length !== 0 && (
          <Button
            type="button"
            onClick={() => {
              toggleDetails();
            }}
          >
            Toggle detail panel
          </Button>
        )}
      </SpacingBottom>
      <SpacingBottom hidden={!showDetails}>
        <ItemListHeader
          columns={['Booking Reference', 'Attendance ID', 'Name']}
        />
        {tickets.map((ticket) => {
          const { attendanceId, bookingRef, name } = ticket;
          return (
            <ListItem key={bookingRef}>
              <ListColumn columnCount={3}>
                <Icon color={attendanceId ? '#00B66D' : '#E15554'}>
                  {attendanceId ? 'check' : 'close'}
                </Icon>
                {bookingRef}
              </ListColumn>
              <ListColumn columnCount={3}>{attendanceId}</ListColumn>
              <ListColumn columnCount={3}>{name}</ListColumn>
            </ListItem>
          );
        })}
      </SpacingBottom>
    </>
  );
};

export default InvestorPermissionsList;
