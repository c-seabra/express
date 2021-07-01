import React from 'react';
import styled from 'styled-components';

import { SecondaryButton } from '../atoms/Button';
import { getTimeZoneAbbreviation } from '@websummit/tsutils/src/utils/time';
import TextInputField from './TextInputField';

const DateTimeFieldContainer = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const DateTimeField = styled(TextInputField)`
  width: 100%;
`;

const TimeZone = styled(SecondaryButton)`
  height: 40px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-bottom: 3px;
  margin-left: -3px;
`;

type DateTimeInputFieldProps = Omit<
  React.ComponentProps<typeof TextInputField>,
  'type'
> & { ianaTimeZoneName?: string };
const DateTimeInputField = ({
  ianaTimeZoneName,
  className,
  ...props
}: DateTimeInputFieldProps) => {
  if (ianaTimeZoneName) {
    const timeZoneAbbreviation = getTimeZoneAbbreviation(ianaTimeZoneName);

    return (
      <DateTimeFieldContainer className={className}>
        <DateTimeField {...props} type="datetime-local" />
        <TimeZone disabled>{timeZoneAbbreviation}</TimeZone>
      </DateTimeFieldContainer>
    );
  }

  return (
    <TextInputField className={className} {...props} type="datetime-local" />
  );
};

export default DateTimeInputField;
