import QueryHook from './queryHook';
import { useEffect } from 'react';
import { useMounted } from './useMounted';
import { StorageItem } from '@/data/interfaces/storage-item';

const usePagination = (pageName: string) => {
  const { AddQueryParams, RemoveQueryParam, QueryParams } = QueryHook();

  const isMounted = useMounted();

  const storageName = `${pageName}_pagination`;

  const getPaginationInfoFromStorage = () => {
    try {
      const storedItem: StorageItem<string> = JSON.parse(
        localStorage.getItem(storageName) || '{}'
      );
      if (!Object.keys(storedItem).length) return null;
      if (Date.now() > storedItem.expirationTime) {
        localStorage.removeItem(storageName);
        return null;
      }
      return JSON.parse(storedItem.value);
    } catch {
      return null;
    }
  };

  const setPaginationInfoToStorage = () => {
    const item: StorageItem<string> = {
      value: JSON.stringify(QueryParams),
      expirationTime: Date.now() + 60 * 60 * 1000,
    };
    localStorage.setItem(storageName, JSON.stringify(item));
  };

  useEffect(() => {
    if (isMounted && Object.keys(QueryParams).length)
      setPaginationInfoToStorage();
    else {
      const paginationInfo = getPaginationInfoFromStorage();
      if (paginationInfo && Object.keys(paginationInfo).length)
        AddQueryParams(paginationInfo);
      else AddQueryParams({ pageSize: '9', pageNumber: '0' });
    }
  }, [QueryParams]);

  const queryParams = QueryParams?.['pageSize']
    ? { ...QueryParams }
    : getPaginationInfoFromStorage() ?? { pageSize: '9', pageNumber: '0' };

  return {
    AddQueryParams,
    RemoveQueryParam,
    queryParams,
  };
};

export default usePagination;
