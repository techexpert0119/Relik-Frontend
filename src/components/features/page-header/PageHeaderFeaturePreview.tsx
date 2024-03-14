import React, { FC } from 'react';
import { LogoShape } from '@/data/enums/page-theme/logo-shape';
import { cn, getPublicImageURL } from '@/lib/utils';
import LogoTM from '@/app/pages/components/LogoTM';
import { HeaderLayoutType } from '@/data/enums/header-layout-type';
import { IPage } from '@/data/interfaces/page';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const getAvatarSize = (type?: HeaderLayoutType) => {
  switch (type) {
    case HeaderLayoutType.Default:
      return 'h-[150px] w-[150px]';
    case HeaderLayoutType.NoImage:
      return 'h-[240px] w-[240px]';
    case HeaderLayoutType.RightSided:
      return 'h-[150px] w-[150px]';
    case HeaderLayoutType.LeftSided:
      return 'h-[90px] w-[90px]';
    default:
      return '';
  }
};

const ProfileBackground: FC<{ disabled?: boolean; page: IPage }> = (props) => {
  const { page } = props;

  const getShapeClasses = () => {
    switch (page?.theme.logoShape) {
      case LogoShape.Circle:
        return 'rounded-full';
      case LogoShape.Rounded:
        return 'rounded-md';
      default:
        return '';
    }
  };

  return (
    <div
      className={cn(
        'relative border-4 bg-white shadow',
        getAvatarSize(page?.theme.headerLayoutType),
        getShapeClasses()
      )}
    >
      <LazyLoadImage
        alt="profilePhoto"
        src={getPublicImageURL(page?.pageProfilePhoto?.url ?? '')}
        className={cn('h-full w-full object-cover', getShapeClasses())}
      />
    </div>
  );
};

const HeaderBackground: FC<{ page: IPage }> = () => {
  return (
    <div className="flex space-x-4 w-full p-0.5">
      <section
        style={{ marginTop: 0 }}
        className={`bg-white text-black p-4 rounded-md text-sm flex flex-col justify-center items-center space-y-1 w-full h-[300px]`}
      ></section>
    </div>
  );
};

const PageHeaderFeaturePreview: FC<{ page: IPage }> = (props) => {
  const { page } = props;

  return (
    <div
      className="relative rounded-t-md overflow-hidden w-full"
      style={{ color: page?.theme?.fontColor }}
    >
      <LogoTM
        height={44}
        color={page?.theme.logoColor ?? 'black'}
        className="absolute left-4 top-4 z-10"
      />

      {page?.theme.headerLayoutType !== HeaderLayoutType.NoImage &&
        (page?.pageCoverPhoto && typeof page?.pageCoverPhoto === 'object' ? (
          <div className="relative">
            <LazyLoadImage
              src={getPublicImageURL(page?.pageCoverPhoto?.url)}
              alt="photo"
              className="h-[167px] w-full object-cover rounded-b-md"
            />
          </div>
        ) : (
          <HeaderBackground page={page} />
        ))}

      <div className="flex flex-col px-4 gap-4 my-4">
        <div
          className={cn(
            'flex relative flex-col md:flex-row gap-8 items-center',
            page?.theme.headerLayoutType === HeaderLayoutType.NoImage &&
              'md:flex-col text-center'
          )}
        >
          {page?.theme.logoShape &&
            page.theme.logoShape !== LogoShape.Hidden && (
              <div
                className={cn(
                  page?.theme.headerLayoutType === HeaderLayoutType.Default &&
                    'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-[-300px]'
                )}
              >
                <ProfileBackground page={page} />
              </div>
            )}

          <div className="flex flex-col gap-4 w-full">
            {page?.theme.headerLayoutType === HeaderLayoutType.Default ? (
              <div
                className={cn(
                  'w-full space-y-2',
                  page.theme.logoShape !== LogoShape.Hidden && 'mt-20'
                )}
              >
                <p className="text-[28px] md:text-[32px] text-center w-fullfont-[600] max-h-44 break-all">
                  {page?.pageName}
                </p>
                <p className="text-xl md:text-2xl font-[400] text-center overflow-hidden">
                  {page?.pageDescription}
                </p>
              </div>
            ) : (
              <p
                className={cn(
                  'text-[28px] md:text-[32px] text-center font-[600] max-h-44 break-all break-words',
                  page?.theme.headerLayoutType !== HeaderLayoutType.NoImage &&
                    'md:text-start'
                )}
              >
                {page?.pageName}
              </p>
            )}

            {page?.theme.headerLayoutType === HeaderLayoutType.RightSided && (
              <p className="text-[27px] font-[400] text-center md:text-start overflow-hidden break-all">
                {page?.pageDescription}
              </p>
            )}
            {page?.theme.headerLayoutType === HeaderLayoutType.NoImage && (
              <p className="text-[27px] font-[400] text-center overflow-hidden break-all">
                {page?.pageDescription}
              </p>
            )}
          </div>
        </div>

        {page?.theme.headerLayoutType === HeaderLayoutType.LeftSided && (
          <p className="text-[27px] font-[400] text-center md:text-start overflow-hidden break-all">
            {page?.pageDescription}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeaderFeaturePreview;
