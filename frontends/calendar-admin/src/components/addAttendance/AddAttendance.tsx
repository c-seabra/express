import React, { ReactElement, useContext, useEffect, useState } from 'react';

import useAttendancesQuery from '../../lib/hooks/useAttendancesQuery';
import { Attendance } from '../../lib/types/index';
import { DetailsContext } from '../calendar/Context';
import {
  ListItem,
  ResultsContainer,
  SearchContainer,
  StyledSearchInput,
} from './AddAttendance.styled';

type AddAttendanceProps = {
  selections: Attendance[];
  setSelections: (arg: Attendance[]) => void;
};

const AddAttendance = ({
  selections,
  setSelections,
}: AddAttendanceProps): ReactElement => {
  const { getAttendance } = useContext(DetailsContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [display, setDisplay] = useState<boolean>(false);

  const { results, error, loading } = useAttendancesQuery({
    searchQuery,
  });

  const handleSearch = (query: string) => {
    setDisplay(query.length > 2);
    setSearchQuery(query);
  };

  const handleSelect = (att: Attendance) => {
    if (!selections.find((e) => e.id === att.id)) {
      setSelections([...selections, att]);
    }
    getAttendance(att.id);
  };

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  return (
    <SearchContainer>
      <StyledSearchInput
        placeholder="Search by Attendance name."
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {display && !loading && !error && (
        <ResultsContainer>
          {results?.map((attendance, i) => (
            <div key={i}>
              <ListItem key={i} onClick={() => handleSelect(attendance)}>
                {attendance.name} - {attendance.bookingRef}
              </ListItem>
            </div>
          ))}
        </ResultsContainer>
      )}
    </SearchContainer>
  );
};

export default AddAttendance;
