import { createContext, Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { IPage } from '@/data/interfaces/page';
import { IFeature } from '@/data/dtos/feature';
import { IPageVersionHistory } from '@/data/interfaces/page-version-history';

interface IContextValue {
  page?: IPage;
  features?: IFeature[];
  pageVersionHistories?: ReadonlyArray<IPageVersionHistory>;
  setFeatures: Dispatch<SetStateAction<IFeature[]>>;
  setPage: (page: IPage) => void;
  setPageVersionHistories: (
    pageVersionHistories: ReadonlyArray<IPageVersionHistory>
  ) => void;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}

export const PageContext = createContext<IContextValue | undefined>({
  page: undefined,
  features: undefined,
  pageVersionHistories: undefined,
  setFeatures: (v) => v,
  setPage: () => {},
  setPageVersionHistories: () => {},
  disabled: false,
  setDisabled: () => {},
});

export const PageContextProvider: FC<{
  children: ReactNode | ReactNode[];
  value: IContextValue;
}> = (props) => {
  return (
    <PageContext.Provider value={props.value}>
      {props.children}
    </PageContext.Provider>
  );
};
