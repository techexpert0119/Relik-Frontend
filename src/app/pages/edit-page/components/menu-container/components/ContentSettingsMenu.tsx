import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useContext } from 'react';
import { MenuContext } from '@/app/pages/user-single-page/context/menu-context';
import PageLink from './PageLink';
import Status from './Status';

const ContentSettingsMenu = () => {
  const { setMenuType } = useContext(MenuContext) ?? {};

  const close = () => setMenuType?.(null);

  return (
    <section className="bg-primary p-4 rounded-md flex flex-col gap-2">
      <header className="flex flex-1 justify-between items-center text-white">
        <h1 className="text-xl flex items-center gap-2">
          <div>Edit settings</div>
        </h1>

        <Button variant="ghost" size="icon" onClick={close} className="h-6 w-6">
          <X className="h-4 w-4" />
        </Button>
      </header>

      <fieldset className="flex flex-col gap-5">
        <PageLink />
        <Status />
      </fieldset>
    </section>
  );
};

export default ContentSettingsMenu;
