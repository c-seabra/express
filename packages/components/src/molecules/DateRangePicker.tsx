import 'react-datepicker/dist/react-datepicker.css';

import { DateTime } from 'luxon';
import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import styled, { css } from 'styled-components';

const dateRangePickerStyles = css`
  .react-datepicker {
    border: none;
    font-family: inherit;
  }

  .react-datepicker__month-container {
    margin-right: 2rem;
  }

  .react-datepicker__header {
    background-color: transparent;
    border-bottom: none;
  }
  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    color: #000;
    display: inline-block;
    width: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    margin: 0;
  }

  .react-datepicker__day-name {
    font-size: 12px;
    color: #7f8fa4;
    margin-top: 1.3rem;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range {
    background-color: rgba(0, 103, 233, 0.05);
    color: #000;
    margin: 0;
  }

  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range:not(.react-datepicker__day--range-start):not(.react-datepicker__day--range-end) {
    border-radius: 0;
  }

  .react-datepicker__day-range-start,
  .react-datepicker__day-range-end {
    border-radius: 0.3rem;
  }
  .react-datepicker__day--in-range:not(.react-datepicker__day--range-start):not(.react-datepicker__day--range-end):hover {
    border-radius: 0.3rem;
  }

  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end {
    background-color: rgba(0, 103, 233, 1);
    color: #fff;
  }

  .react-datepicker__day--selected:hover,
  .react-datepicker__day--in-selecting-range:hover,
  .react-datepicker__day--in-range:hover {
    background-color: rgba(0, 103, 233, 0.5);
    border-radius: 0.3rem;
  }
`;

const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 1rem;

  ${dateRangePickerStyles};
`;

const fromJSDate = (date: Date) => {
  const luxonDate = DateTime.fromJSDate(date);

  if (luxonDate.invalidReason) {
    return null;
  }

  return luxonDate;
};

type DateRangePickerProps = Omit<
  ReactDatePickerProps,
  'endDate' | 'onChange' | 'startDate' | 'selected'
> & {
  endDate?: DateTime | null;
  onChange?: ({
    end,
    start,
  }: {
    end: DateTime | null;
    start: DateTime | null;
  }) => void;
  startDate?: DateTime | null;
};

// This component wraps the `DatePicker` library component
// It changes styling to match our design system
// It also changes JS Dates to Luxon dates
const DateRangePicker = ({
  onChange = () => null,
  startDate,
  endDate,
  ...datePickerProps
}: DateRangePickerProps) => {
  const onDatePickerChange = (dates: [start: Date, end: Date]) => {
    const [start, end] = dates;
    onChange({
      end: fromJSDate(end),
      start: fromJSDate(start),
    });
  };

  return (
    <DatePickerWrapper>
      <DatePicker
        disabledKeyboardNavigation
        inline
        selectsRange
        dateFormat="MM/dd/yyyy h:mm aa"
        endDate={endDate?.toJSDate()}
        monthsShown={2}
        selected={startDate?.toJSDate()}
        startDate={startDate?.toJSDate()}
        onChange={onDatePickerChange}
        {...datePickerProps}
      />
    </DatePickerWrapper>
  );
};

export default DateRangePicker;
