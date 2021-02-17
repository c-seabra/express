import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { pathToSearchState, SearchState, searchStateToUrl } from '../utils/url';

type UseSearchStateArgs<T = SearchState> = {
  processInitialSearchState?: (searchState: T) => void;
};

const useSearchState = <T = SearchState>({
  processInitialSearchState,
}: UseSearchStateArgs<T>) => {
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const asPath = window.location.href;

  const [searchState, setSearchState] = useState<T>(
    pathToSearchState(asPath) as T,
  );

  useEffect(() => {
    if (processInitialSearchState) {
      processInitialSearchState(searchState);
    }
  }, []);

  useEffect(() => {
    const state = (searchState as unknown) as SearchState;
    const url = searchStateToUrl({ pathname, searchState: state });
    history.push(url);
  }, [searchState]);

  return {
    searchState,
    setSearchState,
  };
};

export default useSearchState;
