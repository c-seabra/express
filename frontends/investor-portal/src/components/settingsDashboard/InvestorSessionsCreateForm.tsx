import React, { useState } from 'react';

import { Button } from '../../lib/components';
import LabeledInput from '../../lib/components/molecules/LabeledInput';
import { useInvestorSessionCreateMutation } from '../../lib/hooks';
import {
  SpacingBottom,
  StyledGridForm,
} from './InvestorSessionsCreateForm.styled';
import { BorderBottom } from './SettingsDashboard.styled';

type InvestorSessionsCreateFormType = {
  eventTimezone: string;
};

const InvestorSessionsCreateForm: React.FC<InvestorSessionsCreateFormType> = ({
  eventTimezone,
}) => {
  const [count, setCount] = useState<number | undefined>();
  const [endsAt, setEndsAt] = useState<string | undefined>();
  const [startsAt, setStartsAt] = useState<string | undefined>();

  const { createSesionsMutation } = useInvestorSessionCreateMutation({
    count,
    endsAt,
    eventTimezone,
    startsAt,
  });

  return (
    <>
      <BorderBottom>
        <SpacingBottom>
          <StyledGridForm
            onSubmit={async (e) => {
              e.preventDefault();
              await createSesionsMutation();
            }}
          >
            <LabeledInput
              label="Starting Time"
              type="datetime-local"
              value={startsAt}
              onChange={(e) => {
                setStartsAt(e.target.value);
              }}
            />
            <LabeledInput
              label="Ending Time"
              min={startsAt}
              type="datetime-local"
              value={endsAt}
              onChange={(e) => {
                setEndsAt(e.target.value);
              }}
            />
            <LabeledInput
              defaultValue={count}
              label="How many sessions in this block?"
              type="number"
              onChange={(e) => {
                setCount(+e.target.value);
              }}
            />
            <Button className="align-right" type="submit">
              Add Session
            </Button>
          </StyledGridForm>
        </SpacingBottom>
      </BorderBottom>
    </>
  );
};

export default InvestorSessionsCreateForm;
