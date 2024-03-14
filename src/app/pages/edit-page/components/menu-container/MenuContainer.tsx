import React, { useContext, useEffect, useRef } from 'react';
import {
  MenuContext,
  MenuType,
} from '@/app/pages/user-single-page/context/menu-context';
import { cn } from '@/lib/utils';
import { useIsTablet } from '@/hooks/is-tablet-hook';
import SelectFeatureMenu from './components/SelectFeatureMenu';
import AddFeatureMenu from '@/app/pages/edit-page/components/menu-container/components/AddFeatureMenu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/pretty-tabs';
import { Image, LayoutGrid } from 'lucide-react';
import ThemeSettings from '@/app/pages/edit-page/components/theme-settings/ThemeSettings';
import PageHeaderSettingsMenu from '@/app/pages/edit-page/components/menu-container/components/page-header-settings-menu/PageHeaderSettingsMenu';
import ContentSettingsMenu from '@/app/pages/edit-page/components/menu-container/components/ContentSettingsMenu';

const dialogCSS = `
  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-background justify-center
  items-center w-full md:inset-0 h-[calc(100%-1rem)] min-h-full
`;

const renderMenu = (menuType: MenuType) => {
  switch (menuType) {
    case 'select-feature':
      return <SelectFeatureMenu />;

    case 'settings':
      return <ContentSettingsMenu />;

    case 'edit-header':
      return <PageHeaderSettingsMenu />;

    case 'add-feature':
      return <AddFeatureMenu />;

    default:
      return null;
  }
};

interface Props {
  readonly className?: string;
}

const MenuContainer = (props: Props) => {
  const { menuType, tab, setTab } = useContext(MenuContext) ?? {};
  const isSmallDevice = useIsTablet();
  const prevMenu = useRef<MenuType>();

  useEffect(() => {
    if (menuType && isSmallDevice) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuType, isSmallDevice]);

  useEffect(() => {
    if (menuType !== prevMenu.current) setTab!('content');

    prevMenu.current = menuType;
  }, [menuType]);

  if (!menuType || menuType === 'version-history') return null;

  return (
    <div
      className={cn(
        'flex-1 bg-background fade-in-25',
        isSmallDevice && dialogCSS,
        props.className
      )}
    >
      <div
        className={cn(
          'flex flex-col justify-center items-center lg:sticky lg:top-48',
          isSmallDevice && 'p-4'
        )}
      >
        <Tabs
          defaultValue="content"
          className="w-full max-w-[496px]"
          value={tab}
          onValueChange={(v) => setTab!(v)}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">
              <LayoutGrid className="h-5 w-5 mr-2" />
              <b>Content</b>
            </TabsTrigger>
            <TabsTrigger value="theme">
              <Image className="h-5 w-5 mr-2" />
              <b>Theme</b>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">{renderMenu(menuType)}</TabsContent>

          <TabsContent value="theme">
            <ThemeSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MenuContainer;
