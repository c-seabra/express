import useSearchState from '@websummit/glue/src/lib/hooks/useSearchState';
import React, { KeyboardEvent, ReactElement, useEffect, useState } from 'react';

import { StyledSearchInput } from '../../../../investor-portal/src/components/attendanceDashboard/AttendanceTable.styled';
import { ContainerCard } from '../../../../investor-portal/src/lib/components';
import { Select } from '../../../../investor-portal/src/lib/components';
import Loader from '../../../../investor-portal/src/lib/Loading';
import Pagination from '../../../../investor-portal/src/lib/Pagination';
import useAttendancesQuery from '../../lib/hooks/useAttendancesQuery';

type AttendanceSearchState = {
  attendanceAppearanceSelectionsStatus?: string;
  page: string;
  searchQuery?: string;
  type: string;
};


const AttendanceSearch = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const processInitialSearchState = (state: AttendanceSearchState) => {
    if (state.searchQuery) setSearchQuery(state.searchQuery);
  };

  const { searchState, setSearchState } = useSearchState<AttendanceSearchState>(
    {
      processInitialSearchState,
    },
  );

  const {
    results,
    currentPage,
    error,
    loading,
    resetPage,
  } = useAttendancesQuery({
    attendanceAppearanceSelectionsStatus:
      searchState.attendanceAppearanceSelectionsStatus,
    initialPage: searchState.page,
    searchQuery: searchState.searchQuery,
    type: searchState.type,
  });


  useEffect(() => {
    if (currentPage) {
      setSearchState({ ...searchState, page: currentPage });
      setSelectedValues([]);
    }
    // Disabled because additional triggers caused infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const element = e.currentTarget as HTMLInputElement;
      setSearchState((prevState) => ({
        ...prevState,
        page: '',
        searchQuery: element.value,
      }));
      setSearchQuery(element.value);
      setSelectedValues([]);
      resetPage();
    }
  };



  return (
    <>
      <StyledSearchInput
        defaultValue={searchQuery}
        list="l"
        placeholder="Search by Attendance name."
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearchKey}

      />
      <datalist id="l">
        {results?.map((item, i) => (
          <option
            key={i}
            value={item.name}
            >
            {item.name}
          </option>
        ))}
      </datalist>
    </>
  );
};

export default AttendanceSearch;
