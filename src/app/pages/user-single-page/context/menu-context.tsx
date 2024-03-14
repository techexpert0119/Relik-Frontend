import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { PageFeatureType } from '@/data/enums/page-features';
import { PageFeatureService } from '@/services/api/page-feature-service';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { useIsTablet } from '@/hooks/is-tablet-hook';
import { IFeature, IFeatureValues } from '@/data/dtos/feature';

export type MenuType =
  | 'settings'
  | 'select-feature'
  | 'edit-header'
  | 'add-feature'
  | 'version-history'
  | null;

interface IMenuOptions {
  orderToPlace?: number;
  canGoBack?: boolean;
  featureId?: string;
  featureType?: PageFeatureType;
  featureName?: string;
}

export type TabType = 'content' | 'theme' | string;

interface IContextValue {
  menuType?: MenuType;
  options?: IMenuOptions;
  setMenuType: (type: MenuType, options?: IMenuOptions) => void;
  tab?: TabType;
  setTab: (tab: TabType) => void;
  previousId: string;
  setPreviousId: (id: string) => void;
  createFeature: (data: {
    values: IFeatureValues;
    type: PageFeatureType;
  }) => Promise<IFeature[]>;
  copyFeature: (featureId: string) => Promise<IFeature[]>;
  updateFeature: (
    featureId: string,
    values: IFeatureValues
  ) => Promise<IFeature>;
  deleteFeature: (featureId: string) => Promise<void>;
}

export const MenuContext = createContext<IContextValue | undefined>(undefined);

export const MenuContextProvider: FC<{ children: ReactNode | ReactNode[] }> = (
  props
) => {
  const { page, setDisabled, setPage, setFeatures } =
    useContext(PageContext) ?? {};
  const [menuType, setMenuType] = useState<MenuType>();
  const [options, setOptions] = useState<IMenuOptions>();
  const [tab, setTab] = useState<TabType>('content');
  const [previousId, setPreviousId] = useState<string>('');
  const isTablet = useIsTablet();

  const setMenu: IContextValue['setMenuType'] = (type, options) => {
    setMenuType(type);
    setOptions(options);

    if (!type) {
      setOptions(undefined);
    }
  };

  const createFeature = async (data: {
    values: IFeatureValues;
    type: PageFeatureType;
  }): Promise<IFeature[]> => {
    setDisabled?.(true);
    return PageFeatureService.create({
      order: options?.orderToPlace || 0,
      pageId: page!._id,
      feature: data.type,
      values: data.values,
    })
      .then((response) => {
        page &&
          setPage &&
          setPage({
            ...page,
            undoHistoryLength: page.undoHistoryLength + 1,
            redoHistoryLength: 0,
          });
        setFeatures && setFeatures(response);

        if (isTablet) {
          setMenu?.(null);
        } else {
          setMenu('select-feature', {
            orderToPlace: options?.orderToPlace
              ? options.orderToPlace + 1
              : response.length,
          });
        }

        return response;
      })
      .finally(() => setDisabled?.(false));
  };

  const copyFeature = async (featureId: string): Promise<IFeature[]> => {
    setDisabled?.(true);
    return PageFeatureService.copy(featureId)
      .then((response) => {
        page &&
          setPage &&
          setPage({
            ...page,
            undoHistoryLength: page.undoHistoryLength + 1,
            redoHistoryLength: 0,
          });
        setFeatures && setFeatures(response);
        return response;
      })
      .finally(() => setDisabled?.(false));
  };

  const deleteFeature = async (featureId: string): Promise<void> => {
    if (featureId && setDisabled && setFeatures) {
      setDisabled(true);
      return PageFeatureService.delete(featureId)
        .then(() => {
          page &&
            setPage &&
            setPage({
              ...page,
              undoHistoryLength: page.undoHistoryLength + 1,
              redoHistoryLength: 0,
            });
          setMenu(null);
          setFeatures((pv) => [...pv.filter((f) => f._id !== featureId)]);
        })
        .finally(() => {
          setDisabled(false);
        });
    }
  };

  const updateFeature = async (featureId: string, values: IFeatureValues) => {
    return PageFeatureService.update({
      id: options?.featureId,
      values: values,
    }).then((response) => {
      page &&
        setPage &&
        setPage({
          ...page,
          undoHistoryLength: page.undoHistoryLength + 1,
          redoHistoryLength: 0,
        });
      setFeatures &&
        setFeatures((prev) => {
          return prev.map((feature) => {
            if (feature._id === options?.featureId) {
              return response;
            }

            return feature;
          });
        });

      // if (isTablet) setMenu?.(null);
      return response;
    });
  };

  return (
    <MenuContext.Provider
      value={{
        menuType,
        options,
        setMenuType: setMenu,
        tab,
        setTab,
        previousId,
        setPreviousId,
        createFeature,
        deleteFeature,
        updateFeature,
        copyFeature,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};
