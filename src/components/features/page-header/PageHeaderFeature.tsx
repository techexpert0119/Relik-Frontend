import React, { FC, useContext, useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import Dropzone from 'react-dropzone';
import { FileService } from '@/services/api/file-service';
import { AxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';
import { PageService } from '@/services/api/page-service';
import { LogoShape } from '@/data/enums/page-theme/logo-shape';
import { cn, getPublicImageURL } from '@/lib/utils';
import LogoTM from '@/app/pages/components/LogoTM';
import { HeaderLayoutType } from '@/data/enums/header-layout-type';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MenuContext } from '@/app/pages/user-single-page/context/menu-context';

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

const ProfileBackgroundUploader: FC<{ disabled?: boolean }> = (props) => {
  const menuContext = useContext(MenuContext);
  const { page, setPage } = useContext(PageContext) ?? {};
  const [dropEnter, setDropEnter] = useState(false);
  const { disabled = false } = props;

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

  const remove = () => {
    if (page && setPage) {
      PageService.updatePage(page._id, { pageProfilePhoto: null }).then(
        (response) => {
          setPage(response);
        }
      );
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
      {page?.pageProfilePhoto ? (
        <>
          {menuContext?.menuType !== 'version-history' && (
            <button
              className={cn(
                'absolute h-7 w-7 right-0 top-0 flex justify-center items-center border-0 rounded-full',
                page.theme.logoShape === LogoShape.Circle &&
                  'bg-red-700 shadow-2xl border'
              )}
              onClick={remove}
            >
              <X className="h-5 w-5" strokeWidth={2.5} />
            </button>
          )}
          <LazyLoadImage
            alt="profilePhoto"
            src={getPublicImageURL(page?.pageProfilePhoto?.url)}
            className={cn('h-full w-full object-cover', getShapeClasses())}
          />
        </>
      ) : (
        <>
          <Dropzone
            disabled={
              props.disabled || menuContext?.menuType === 'version-history'
            }
            accept={{ 'image/*': ['.jpg', '.svg', '.png', '.gif'] }}
            onDragEnter={() => setDropEnter(true)}
            onDragLeave={() => setDropEnter(false)}
            onDrop={() => setDropEnter(false)}
            onDropRejected={() => {
              toast({
                title: 'Error',
                description: 'File is or wrong format or too big',
                variant: 'destructive',
              });
            }}
            onDropAccepted={(files) => {
              if (files.length === 1) {
                const file = files[0];

                FileService.uploadImage(file)
                  .then((data) => {
                    if (page && setPage) {
                      PageService.updatePage(page._id, {
                        pageProfilePhoto: data._id,
                      }).then((response) => {
                        setPage(response);
                      });
                    }
                  })
                  .catch((e: AxiosError<{ message: string }>) =>
                    toast({
                      variant: 'destructive',
                      title: 'Error',
                      description: e.response?.data?.message,
                    })
                  );
              }
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="flex space-x-4 w-full h-full justify-center items-center">
                <section
                  {...getRootProps()}
                  style={{ marginTop: 0 }}
                  className={`h-full text-black rounded-md text-sm flex flex-col justify-center items-center space-y-1 w-full
                       ${dropEnter && 'opacity-50'} ${
                         disabled ? 'opacity-50' : 'cursor-pointer'
                       }`}
                >
                  <input {...getInputProps()} />

                  <div className="p-1 rounded-full">
                    <UploadCloud className="h-5 w-5" />
                  </div>
                  <div className="text-center text-gray-500 text-[10px]">
                    <p>
                      <b className="text-gray-700">Click to upload</b>
                    </p>
                  </div>
                </section>
              </div>
            )}
          </Dropzone>
        </>
      )}
    </div>
  );
};

const HeaderBackgroundUploader: FC<{ disabled?: boolean }> = (props) => {
  const menuContext = useContext(MenuContext);
  const { disabled = false } = props;
  const [dropEnter, setDropEnter] = useState(false);
  const { page, setPage } = useContext(PageContext) ?? {};

  return (
    <Dropzone
      disabled={props.disabled || menuContext?.menuType === 'version-history'}
      accept={{ 'image/*': ['.jpg', '.svg', '.png', '.gif'] }}
      onDragEnter={() => setDropEnter(true)}
      onDragLeave={() => setDropEnter(false)}
      onDrop={() => setDropEnter(false)}
      onDropRejected={() => {
        toast({
          title: 'Error',
          description: 'File is or wrong format or too big',
          variant: 'destructive',
        });
      }}
      onDropAccepted={(files) => {
        if (files.length === 1) {
          const file = files[0];

          FileService.uploadImage(file)
            .then((data) => {
              if (page && setPage) {
                PageService.updatePage(page._id, {
                  pageCoverPhoto: data._id,
                }).then((response) => {
                  setPage(response);
                });
              }
            })
            .catch((e: AxiosError<{ message: string }>) =>
              toast({
                variant: 'destructive',
                title: 'Error',
                description: e.response?.data?.message,
              })
            );
        }
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div className="flex space-x-4 w-full">
          <section
            {...getRootProps()}
            style={{ marginTop: 0 }}
            className={`bg-white text-black p-4 border-dashed border border-black rounded-md text-sm flex flex-col justify-center items-center space-y-1 w-full h-[300px]
            ${dropEnter && 'border border-gray-300'} ${
              disabled ? 'opacity-50' : 'cursor-pointer'
            }`}
          >
            <input {...getInputProps()} />

            <div className="bg-gray-50 p-1.5 rounded-full">
              <div className="bg-gray-100 p-1.5 rounded-full">
                <UploadCloud className="h-5 w-5 bg-gray-100" />
              </div>
            </div>
            <div className="text-center text-gray-500">
              <p>
                <b className="text-gray-700">Click to upload</b> or drag and
                drop
              </p>
              <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>
          </section>
        </div>
      )}
    </Dropzone>
  );
};

const PageHeaderFeature = ({}) => {
  const menuContext = useContext(MenuContext);
  const { page, setPage } = useContext(PageContext) ?? {};

  const remove = () => {
    if (page && setPage)
      PageService.updatePage(page._id, { pageCoverPhoto: null }).then(
        (response) => setPage(response)
      );
  };

  return (
    <div
      className="relative rounded-t-md overflow-hidden w-full p-0.5"
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
            {menuContext?.menuType !== 'version-history' && (
              <button className="absolute right-2 top-2" onClick={remove}>
                <X className="h-5 w-5 text-red-500" strokeWidth={3} />
              </button>
            )}

            <LazyLoadImage
              src={getPublicImageURL(page?.pageCoverPhoto?.url)}
              alt="photo"
              className="h-[300px] w-full object-cover rounded-b-md"
            />
          </div>
        ) : (
          <HeaderBackgroundUploader />
        ))}

      <div className="flex flex-col px-8 gap-4 my-4">
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
                <ProfileBackgroundUploader />
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
                <p className="text-3xl md:text-5xl text-center w-fullfont-[600] max-h-44 break-normal">
                  {page?.pageName}
                </p>
                <p className="text-[27px] font-[400] text-center overflow-hidden break-normal">
                  {page?.pageDescription}
                </p>
              </div>
            ) : (
              <p
                className={cn(
                  'text-3xl md:text-5xl text-center font-[600] max-h-44 break-normal',
                  page?.theme.headerLayoutType !== HeaderLayoutType.NoImage &&
                    'md:text-start'
                )}
              >
                {page?.pageName}
              </p>
            )}

            {page?.theme.headerLayoutType === HeaderLayoutType.RightSided && (
              <p className="text-[27px] font-[400] text-center md:text-start overflow-hidden break-normal">
                {page?.pageDescription}
              </p>
            )}
            {page?.theme.headerLayoutType === HeaderLayoutType.NoImage && (
              <p className="text-[27px] font-[400] text-center overflow-hidden break-normal">
                {page?.pageDescription}
              </p>
            )}
          </div>
        </div>

        {page?.theme.headerLayoutType === HeaderLayoutType.LeftSided && (
          <p className="text-[27px] font-[400] text-center md:text-start overflow-hidden break-normal">
            {page?.pageDescription}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeaderFeature;
