import React, { ReactNode, useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Plus, SquarePen, Trash2 } from 'lucide-react';
import { MenuContext } from '../../../user-single-page/context/menu-context';
import { cn } from '@/lib/utils';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { useIsPhone } from '@/hooks/is-tablet-hook';

interface IProps {
  editMode?: 'default' | 'page-header' | undefined;
  featureId?: string;
  featureName?: string;
  children?: ReactNode | ReactNode[];
  withDelete?: boolean;
  withCopy?: boolean;
}

const ActionContainer = (props: IProps) => {
  const {
    setMenuType,
    copyFeature: copyFeat,
    deleteFeature: dltFeat,
  } = useContext(MenuContext) ?? {};
  const { features } = useContext(PageContext) ?? {};
  const [showMenu, setShowMenu] = useState(false);
  const {
    children,
    featureId,
    featureName,
    withCopy = false,
    withDelete = false,
  } = props;
  const menuContext = useContext(MenuContext);
  const isPhone = useIsPhone();

  const handleClickAddFeature = () => {
    const featureOrder = features?.find((f) => f._id === featureId)?.order;
    menuContext?.setMenuType('select-feature', {
      orderToPlace: featureOrder ? featureOrder + 1 : 1,
    });
    menuContext?.setTab('content');
  };

  const onEnter = () => setShowMenu(true);
  const onLeave = () => setShowMenu(false);

  const deleteFeature = () => featureId && dltFeat?.(featureId);
  const copyFeature = () => featureId && copyFeat?.(featureId);

  const editFeature = () => {
    if (setMenuType && props.editMode === 'page-header') {
      setMenuType('edit-header', { featureId, featureName });
      return;
    }

    if (setMenuType && featureId) {
      const feature = features?.find((f) => f._id === featureId);
      const featureOrder = features?.find((f) => f._id === featureId)?.order;

      if (feature) {
        setMenuType('add-feature', {
          featureId: featureId,
          featureType: feature.featureId.component,
          featureName: feature.featureId.name,
          canGoBack: true,
          orderToPlace:
            featureOrder !== undefined ? featureOrder + 1 : undefined,
        });
      }
    }
  };

  return (
    <div
      className="w-full relative bg"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {isPhone && (
        <>
          {props.editMode !== 'page-header' ? (
            <>
              <Button
                size="icon"
                onClick={deleteFeature}
                className={cn(
                  'absolute z-10 bottom-[-26px] m-auto left-2 group-hover:flex hidden bg-red-500 hover:bg-red-600',
                  showMenu && 'flex'
                )}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                onClick={copyFeature}
                className={cn(
                  'absolute z-10 bottom-[-20px] m-auto right-14 group-hover:flex hidden',
                  showMenu && 'flex'
                )}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <></>
          )}

          <Button
            size="icon"
            onClick={editFeature}
            className={cn(
              'absolute z-10 bottom-[-26px] m-auto right-2 group-hover:flex hidden',
              showMenu && 'flex'
            )}
          >
            <SquarePen className="h-5 w-5" />
          </Button>
        </>
      )}

      {menuContext?.menuType !== 'version-history' && (
        <Button
          className={cn(
            'absolute z-10 bottom-[-25px] m-auto left-0 right-0 group-hover:flex w-fit hidden',
            showMenu && 'flex'
          )}
          onClick={handleClickAddFeature}
          size="sm"
        >
          <Plus className="h-3 w-3 mr-1" /> {!isPhone ? 'Add element' : 'ADD'}
        </Button>
      )}

      {!isPhone && (
        <>
          {menuContext?.menuType !== 'version-history' && showMenu && (
            <div className="w-[32px] right-[-32px] sm:w-[84px] sm:right-[-84px] h-fit absolute flex flex-col pt-4 pl-0 sm:pl-4 gap-2 min-h-full">
              <Button size="icon" onClick={editFeature}>
                <SquarePen className="h-5 w-5" />
              </Button>

              {withCopy && (
                <Button size="icon" onClick={copyFeature}>
                  <Copy className="h-4 w-4" />
                </Button>
              )}

              {withDelete && (
                <Button
                  size="icon"
                  className="bg-red-500 hover:bg-red-600"
                  onClick={deleteFeature}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </>
      )}

      <div
        className={cn(
          'ring-teal-400 ring-offset-2 rounded-md flex flex-col',
          menuContext?.menuType !== 'version-history' && showMenu && 'ring-4'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ActionContainer;
