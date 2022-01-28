import { useState, useCallback } from 'react';

import { QueryKey, UseQueryOptions, UseQueryResult } from 'react-query';

function useLazyQuery<TData, TError, Tvariables>(
  query: (
    variables: Tvariables,
    options?: UseQueryOptions<TData, TError, TData, QueryKey> | undefined
  ) => UseQueryResult<TData, TError>,
  options?: UseQueryOptions<TData, TError, TData, QueryKey> | undefined
) {
  const [enabled, setEnabled] = useState(false);
  const [variables, setVariables] = useState<Tvariables | unknown>(null);
  const queryResult = query(variables as Tvariables, { enabled, ...(options && options) });

  const fetch = useCallback<(variables: Tvariables) => void>((variables) => {
    setEnabled(true);
    setVariables(variables);
  }, []);

  return () => [fetch, queryResult] as const; // Don't really know why I need to return a function here.. but it has to return a function.. if any other data type is returned then this causes issue while implmenting useLazyQuery
}

// How to use:
// useFetchQuery = Fetch query that needs to be lazily loaded;
// const res = useLazyQuery(useFetchQuery,{onSuccess:()=>void});

// The second data here wil return all the query results of react-query
// const [fetch, { isLoading }] = res();
export default useLazyQuery;
