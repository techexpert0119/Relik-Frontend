import { useLocation, useNavigate } from 'react-router-dom';

type QueryParamsType = Record<string, string>;

const QueryHook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const QueryParams: QueryParamsType = Object.fromEntries(
    queryParams.entries()
  );

  const stringify = (
    obj: Record<string, string | number>,
    params?: string | string[][]
  ): string => {
    const searchParams = new URLSearchParams(params);
    Object.entries(obj).forEach(([key, value]) => {
      searchParams.set(key, String(value));
    });
    return searchParams.toString();
  };

  const addQueryParams = (
    params: Record<string, string | number | undefined> = {}
  ): void => {
    const newParams = new URLSearchParams(queryParams);
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, String(value));
    });
    navigate(`?${newParams.toString()}`);
  };

  const mergeQueryParams = (
    params: Record<string, string | number | undefined> = {},
    replace = false
  ): void => {
    const newParams = new URLSearchParams(queryParams);
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, String(value));
    });
    navigate(`?${newParams.toString()}`, { replace });
  };
  const removeQueryParam = (key: string): void => {
    const newParams = new URLSearchParams(queryParams);
    newParams.delete(key);
    navigate(`?${newParams.toString()}`);
  };

  return {
    QueryParams,
    AddQueryParams: addQueryParams,
    MergeQueryParams: mergeQueryParams,
    stringify,
    navigate,
    location,
    RemoveQueryParam: removeQueryParam,
  };
};

export default QueryHook;
