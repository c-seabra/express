import React, { ReactElement, useEffect, useState } from 'react';

import { Button } from '../../lib/components/atoms';
import { LabeledInput } from '../../lib/components/molecules';
import { useInvestorAccessGrantMutation } from '../../lib/hooks';
import { Attendance, Dispatcher } from '../../lib/types';
import { AccessForm, SpacingBottom } from './InvestorAccessDashboard.styled';

type InvestorAccessFormProps = {
  defaultSelectionsCount: number | undefined;
  invalidBookingReferences: string[];
  setAttendances: Dispatcher<Attendance[]>;
  setInvalidBookingReferences: Dispatcher<string[]>;
  setUpdating: Dispatcher<boolean>;
};

const InvestorAccessForm = ({
  defaultSelectionsCount,
  invalidBookingReferences,
  setAttendances,
  setInvalidBookingReferences,
  setUpdating,
}: InvestorAccessFormProps): ReactElement => {
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
      const uniqueBookingReferences = Array.from(
        new Set(sanitizedBookingReferences),
      );
      setBookingReferences(uniqueBookingReferences);
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
      <AccessForm
        onSubmit={async (e) => {
          e.preventDefault();
          await grantAccess();
        }}
      >
        <SpacingBottom>
          <LabeledInput
            label="Insert a booking reference(s) as pasted from single spreadsheet column:"
            type="textarea"
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
              setStartupSelectionsCount(+e.target.value);
            }}
          />
        </SpacingBottom>
        <SpacingBottom>
          {bookingReferences?.length !== 0 && (
            <Button type="submit">Grant access</Button>
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
      </AccessForm>
    </>
  );
};

export default InvestorAccessForm;
