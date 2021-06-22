import {
  Button,
  SecondaryButton,
} from '@websummit/components/src/atoms/Button';
import DateRangePicker from '@websummit/components/src/molecules/DateRangePicker';
import TextInput from '@websummit/components/src/molecules/TextInput';
import { DateTime } from 'luxon';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const DateInputRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTextInput = styled(TextInput)`
  width: 48%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HelperButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  border-left: 1px solid #dcdfe5;
  padding: 2rem;

  ${SecondaryButton} {
    margin-bottom: 1rem;
  }
`;

const DateInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

const ApplyDateContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const CancelButton = styled(SecondaryButton)`
  margin-right: 1rem;
`;

const dateRangeHelperButtons = [
  {
    end: DateTime.now(),
    label: 'Today',
    start: DateTime.now(),
  },
  {
    end: DateTime.now().minus({ days: 1 }),
    label: 'Yesterday',
    start: DateTime.now().minus({ days: 1 }),
  },
  {
    end: DateTime.now().endOf('month'),
    label: 'This month',
    start: DateTime.now().startOf('month'),
  },
  {
    end: DateTime.now().minus({ month: 1 }).endOf('month'),
    label: 'Last month',
    start: DateTime.now().minus({ month: 1 }).startOf('month'),
  },
  {
    end: DateTime.now().minus({ month: 1 }).startOf('month'),
    label: 'Last three months',
    start: DateTime.now().minus({ month: 3 }).endOf('month'),
  },
];

const DEFAULT_DATE_FORMAT = 'dd.MM.yyyy';

const formatDateForInputs = (date?: DateTime | null) =>
  date?.toFormat(DEFAULT_DATE_FORMAT) || '';

const processDate = (dateInput: string) => {
  const processedDate = DateTime.fromFormat(dateInput, DEFAULT_DATE_FORMAT);
  if (processedDate.invalidReason) {
    return null;
  }

  return processedDate;
};

type DateRangeFilterProps = {
  onApply?: ({
    start,
    end,
  }: {
    end?: DateTime | null;
    start?: DateTime | null;
  }) => void;
  onCancel?: () => void;
  selectedDates?: {
    end?: DateTime | null;
    start?: DateTime | null;
  };
};

const DateRangeFilter = ({
  onApply = () => null,
  onCancel = () => null,
  selectedDates,
}: DateRangeFilterProps) => {
  const [startDate, setStartDate] = useState<DateTime | null | undefined>(
    selectedDates?.start,
  );
  const [endDate, setEndDate] = useState<DateTime | null | undefined>(
    selectedDates?.end,
  );

  const [startInput, setStartInput] = useState(
    formatDateForInputs(selectedDates?.start),
  );
  const [endInput, setEndInput] = useState(
    formatDateForInputs(selectedDates?.end),
  );

  const setDateRange = useCallback(
    (dateRangeHelper: { end: DateTime; start: DateTime }) => () => {
      setStartDate(dateRangeHelper.start);
      setStartInput(formatDateForInputs(dateRangeHelper.start));

      setEndDate(dateRangeHelper.end);
      setEndInput(formatDateForInputs(dateRangeHelper.end));
    },
    [],
  );

  const onChange = ({
    end,
    start,
  }: {
    end: DateTime | null;
    start: DateTime | null;
  }) => {
    setStartDate(start);
    setStartInput(formatDateForInputs(start));

    setEndDate(end);
    setEndInput(formatDateForInputs(end));
  };

  const onClear = () => {
    onApply({ end: null, start: null });

    onCancel();
  };

  const areDatesChosen = !(startDate?.isValid || endDate?.isValid);

  return (
    <Container>
      <DateInputContainer>
        <DateInputRow>
          <StyledTextInput
            label="From"
            placeholder={DEFAULT_DATE_FORMAT}
            value={startInput}
            onChange={(event) => {
              const { value = '' } = (event?.target || {}) as HTMLInputElement;

              setStartInput(value);
              const processedDate = processDate(value);

              if (processedDate) {
                setStartDate(processedDate);
              }
            }}
          />
          <StyledTextInput
            label="To"
            placeholder={DEFAULT_DATE_FORMAT}
            value={endInput}
            onChange={(event) => {
              const { value = '' } = (event?.target || {}) as HTMLInputElement;

              setEndInput(value);
              const processedDate = processDate(value);

              if (processedDate) {
                setEndDate(processedDate);
              }
            }}
          />
        </DateInputRow>
        <DateRangePicker
          endDate={endDate}
          startDate={startDate}
          onChange={onChange}
        />
      </DateInputContainer>
      <HelperButtonsContainer>
        {dateRangeHelperButtons.map(({ label, start, end }) => (
          <SecondaryButton key={label} onClick={setDateRange({ end, start })}>
            {label}
          </SecondaryButton>
        ))}
        <ApplyDateContainer>
          <CancelButton onClick={onClear}>Clear</CancelButton>
          <Button
            disabled={areDatesChosen}
            onClick={() => onApply({ end: endDate, start: startDate })}
          >
            Apply
          </Button>
        </ApplyDateContainer>
      </HelperButtonsContainer>
    </Container>
  );
};

export default DateRangeFilter;
