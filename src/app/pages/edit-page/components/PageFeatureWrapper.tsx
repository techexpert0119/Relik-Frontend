import { Button } from '@/components/ui/button';
import { IRowFeature } from '@/data/dtos/feature';
import QueryHook from '@/hooks/queryHook';
import UseGetIcon from '../../user-single-page/hooks/use-get-icon';

const renderName = (text: string) => {
  const result = text.replace('_', ' ').toLowerCase();
  return result[0].toUpperCase() + result.slice(1);
};

export const PageFeatureWrapper = ({ feature }: { feature: IRowFeature }) => {
  const { AddQueryParams } = QueryHook();
  const { getIcon } = UseGetIcon();

  return (
    <div
      onClick={() => AddQueryParams({ feature: feature.component })}
      className="flex flex-col items-center "
    >
      <Button className="rounded h-20 w-20" variant="gray">
        {getIcon(feature.component)}
      </Button>
      <p className="text-sm text-white mt-2">{renderName(feature.name)}</p>
    </div>
  );
};
