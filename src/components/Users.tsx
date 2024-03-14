import { AvatarWithStatus } from '@/app/users/components/avatar';
import { cn, getPublicImageURL } from '@/lib/utils';
import { Link } from 'react-router-dom';

const PHOTOS_COUNT = 5;

interface IUserImage {
  image: string;
  link: string;
}
export interface IUser {
  data: Array<IUserImage>;
}

export default function Users({ data }: IUser) {
  const slicedData = data.slice(0, PHOTOS_COUNT + 1);
  return (
    <div className="flex relative">
      {slicedData.map((item, index) => {
        if (index === slicedData.length - 1 && data.length > PHOTOS_COUNT) {
          return (
            <div
              key={index}
              className={cn(
                'h-6 w-6 absolute border-[1.5px] border-white rounded-full'
              )}
              style={{
                zIndex: index,
                left: `${index * 20}px`,
              }}
            >
              <Link to={item.link}>
                <AvatarWithStatus
                  className={{
                    avatar: 'h-full w-full',
                    avatarFallBack: 'bg-[#DFF3F6] text-[#54B8C7] text-xs',
                  }}
                  fallBack={`+${data.length - PHOTOS_COUNT}`}
                />
              </Link>
            </div>
          );
        }
        return (
          <div
            key={index}
            className={cn(
              'h-6 w-6 absolute border-[1.5px] border-white rounded-full'
            )}
            style={{
              zIndex: index,
              left: `${index * 20}px`,
            }}
          >
            <Link to={item.link}>
              <AvatarWithStatus
                className={{ avatar: 'h-full w-full' }}
                fallBack={<img src={getPublicImageURL(item.image)} />}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
