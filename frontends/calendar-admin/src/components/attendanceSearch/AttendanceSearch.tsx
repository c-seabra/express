import useSearchState from '@websummit/glue/src/lib/hooks/useSearchState';
import React, {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
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

  const [searchQuery, setSearchQuery] = useState('');
  const [paints, setPaints] = useState<Array<Color>>([]);
  const [selections, setSelections] = useState<Array<Attendance>>([]);
  const [display, setDisplay] = useState<boolean>(false);

  const processInitialSearchState = (state: AttendanceSearchState) => {
    if (state.searchQuery) setSearchQuery(state.searchQuery);
  };

  const { setSearchState } = useSearchState<AttendanceSearchState>({
    processInitialSearchState,
  });

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

  const isFirstRun = useRef(true);

  const handleSearch = useCallback(
    (query: string) => {
      setDisplay(query.length > 2);
      setSearchState((prevState) => ({
        ...prevState,
        searchQuery: query,
      }));
    },
    [setSearchState],
  );

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    handleSearch(searchQuery);
  }, [setSearchState, handleSearch, searchQuery]);

  return (
    <SearchContainer>
      <StyledSearchInput
        defaultValue={searchQuery}
        placeholder="Search by Attendance name."
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {display && !loading && !error && (
        <ResultsContainer>
          {results?.map((attendance, i) => (
            <div key={i}>
              {!selections.find((e) => e.id === attendance.id) && (
                <ListItem key={i} onClick={() => handleSelect(attendance)}>
                  {attendance.name} - {attendance.bookingRef}
                </ListItem>
              )}
            </div>
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
            <Close onClick={() => handleRemove(selection)} />
            <span>
              {selection.name} <i>({selection.bookingRef})</i>
            </span>
          </ListItem>
        ))}
      </StyledDisplay>
    </SearchContainer>
  );
};

export default AttendanceSearch;
