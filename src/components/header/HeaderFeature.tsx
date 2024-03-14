import { FC, useContext } from 'react';
import { IFeature } from '@/data/dtos/feature';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';

const HeaderFeature: FC<{ feature: IFeature; preview?: boolean }> = ({
  feature,
  preview,
}) => {
  const { page } = useContext(PageContext) ?? {};

  return (
    <div
      className="min-h-[64px] flex text-3xl justify-center items-center px-6"
      style={{ color: page?.theme.fontColor }}
    >
      <div className={`w-full ${preview && 'truncate'}`}>
        {feature.values?.headerValues?.title}
      </div>
    </div>
  );
};

export default HeaderFeature;
