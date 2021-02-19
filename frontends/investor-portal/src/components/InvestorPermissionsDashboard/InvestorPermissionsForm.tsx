import React, { ReactElement, useEffect, useState } from 'react';

import { Button } from '../../lib/components/atoms';
import { LabeledInput } from '../../lib/components/molecules';
import { useInvestorAccessGrantMutation } from '../../lib/hooks';
import {
  PermissionForm,
  SpacingBottom,
} from './InvestorPermissionsDashboard.styled';

type Attendance = {
  bookingRef: string;
  id: string;
  name?: string;
};

type InvestorPermissionsFormProps = {
  defaultSelectionsCount: number | undefined;
  invalidBookingReferences: string[];
  setAttendances: React.Dispatch<React.SetStateAction<Attendance[]>>;
  setInvalidBookingReferences: React.Dispatch<React.SetStateAction<string[]>>;
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>;
};

const InvestorPermissionsForm = ({
  defaultSelectionsCount,
  invalidBookingReferences,
  setAttendances,
  setInvalidBookingReferences,
  setUpdating,
}: InvestorPermissionsFormProps): ReactElement => {
  const [startupSelectionsCount, setStartupSelectionsCount] = useState<
    number | undefined
  >();
  const [bookingReferences, setBookingReferences] = useState<Array<string>>([]);

  const validBookingRefMatcher = new RegExp(/[A-Za-z0-9]{4}-[A-Za-z0-9]{1,}/);
  const bookingRefSeparator = new RegExp(/[^A-Za-z0-9-]/);

  const parseBookingReferencesString = (elements: string) => {
    if (elements === '') {
      setBookingReferences([]);
    } else {
      const sanitizedBookingReferences = elements
        .split(bookingRefSeparator)
        .filter((id) => validBookingRefMatcher.exec(id))
        .map((id) => id.toUpperCase());
      setBookingReferences(sanitizedBookingReferences);
    }
  };

  const { grantInvestorAccessMutation } = useInvestorAccessGrantMutation({
    bookingReferences,
    setAttendances,
    setInvalidBookingReferences,
    setUpdating,
    startupSelectionsCount,
  });

  const grantAccess = async () => {
    setUpdating(true);
    await grantInvestorAccessMutation();
  };

  useEffect(() => {
    if (defaultSelectionsCount) {
      setStartupSelectionsCount(defaultSelectionsCount);
    }
  }, [defaultSelectionsCount]);

  return (
    <>
      <PermissionForm
        onSubmit={async (e) => {
          e.preventDefault();
          await grantAccess();
        }}
      >
        <SpacingBottom>
          <LabeledInput
            label="Insert a booking reference(s) as pasted from single spreadsheet column:"
            type="textarea"
            onBlur={(e) => {
              parseBookingReferencesString(e.target.value);
            }}
            onChange={(e) => {
              parseBookingReferencesString(e.target.value);
            }}
          />
        </SpacingBottom>
        <SpacingBottom>
          <LabeledInput
            className="shortInput"
            defaultValue={defaultSelectionsCount}
            label={`How many start up selections in investor portal per attendee? (default is ${
              defaultSelectionsCount ? defaultSelectionsCount.toString() : ''
            })`}
            max="999"
            min="1"
            type="number"
            onChange={(e) => {
              setStartupSelectionsCount(parseInt(e.target.value, 10));
            }}
          />
        </SpacingBottom>
        <SpacingBottom>
          {bookingReferences?.length !== 0 && (
            <Button type="submit">
              Grant access to {bookingReferences?.length} Investor
              {bookingReferences?.length > 1 ? 's' : ''}
            </Button>
          )}
        </SpacingBottom>
        <SpacingBottom>
          {invalidBookingReferences?.length > 0 && (
            <>
              <strong>
                Invalid booking references: {invalidBookingReferences?.length}
              </strong>
              <p>{invalidBookingReferences?.join(' ')}</p>
            </>
          )}
        </SpacingBottom>
      </PermissionForm>
    </>
  );
};

export default InvestorPermissionsForm;
