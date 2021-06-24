import { useHistoryState } from '@websummit/glue/src/lib/hooks/useHistoryState';
import React, {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import useAttendancesQuery from '../../lib/hooks/useAttendancesQuery';
import { Attendance, Color } from '../../lib/types';
import AppContext from '../app/AppContext';
import Close from '../svgs/Close';
import {
  ListItem,
  ResultsContainer,
  SearchContainer,
  StyledDisplay,
  StyledSearchInput,
} from './AttendanceSearch.styled';

type AttendanceSearchState = {
  searchQuery?: string;
};

const AttendanceSearch = (): ReactElement => {
  const { setAttendances, setColors } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useHistoryState(
    'calendarAdminSearchInput',
    '',
  );
  const [paints, setPaints] = useState<Array<Color>>([]);
  const [selections, setSelections] = useState<Array<Attendance>>([]);
  const [display, setDisplay] = useState<boolean>(false);
  const { results, error, loading } = useAttendancesQuery({
    searchQuery,
  });

  const handleSelect = (att: Attendance) => {
    if (!selections.find((e) => e.id === att.id)) {
      const color = {
        colorHash: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        id: att.id,
      } as Color;
      setSelections([...selections, att]);
      setAttendances?.([...selections, att]);
      setPaints?.([...paints, color]);
      setColors?.([...paints, color]);
      setDisplay(false);
    }
  };

  const handleRemove = (att: Attendance) => {
    const index = selections.indexOf(att);
    selections.splice(index, 1);
    setSelections([...selections]);
    setAttendances?.([...selections]);
    const paint = paints.find((e) => e.id === att.id);
    if (paint) {
      paints.splice(paints.indexOf(paint), 1);
      setPaints?.([...paints]);
      setColors?.([...paints]);
    }
  };

  const hex = (id: string) => {
    return paints?.find((e) => e.id === id)?.colorHash as string;
  };

  const handleSearch = useCallback((query: string) => {
    setDisplay(query.length > 2);
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [handleSearch, searchQuery]);

  return (
    <SearchContainer>
      <StyledSearchInput
        key="calendarAdminSearchInputEl"
        defaultValue={searchQuery}
        placeholder="Search by Attendance name."
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={(e) => setDisplay(e.target.value.length > 2)}
      />
      {display && !loading && !error && (
        <ResultsContainer>
          {results?.map((attendance, i) => (
            <span key={i}>
              {!selections.find((e) => e.id === attendance.id) && (
                <ListItem
                  key={i}
                  className="full-width"
                  onClick={() => handleSelect(attendance)}
                >
                  {attendance.name} - {attendance.bookingRef}
                </ListItem>
              )}
            </span>
          ))}
        </ResultsContainer>
      )}
      <StyledDisplay>
        {selections.map((selection) => (
          <ListItem
            key={selection?.id}
            style={{
              border: `1px solid ${hex(selection?.id)}`,
            }}
          >
            <div aria-hidden="true" onClick={() => handleRemove(selection)}>
              <Close />
            </div>
            <span className="span">
              {selection.name} <i>({selection.bookingRef})</i>
            </span>
          </ListItem>
        ))}
      </StyledDisplay>
    </SearchContainer>
  );
};

export default AttendanceSearch;
