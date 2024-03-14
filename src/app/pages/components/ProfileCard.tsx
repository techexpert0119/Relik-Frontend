import { FC, useState } from 'react';
import { Eye, MoreHorizontal, RotateCcw, Trash } from 'lucide-react';
import { ViewMode } from '@/data/enums/view-mode';
import { IPage, PageStatus } from '@/data/interfaces/page';
import { NavLink } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { updatePageStatusMutation } from '@/services/api/page-service';
import { getPublicImageURL } from '@/lib/utils';

const ProfileCard: FC<{
  info: IPage;
  view: ViewMode;
  onDataUpdate?: () => void;
}> = (props) => {
  const [open, setOpen] = useState(false);
  const { info, view } = props;
  const updatePageStatus = updatePageStatusMutation(info?._id);

  const renderBagde = () => {
    switch (info.status) {
      case PageStatus.ACTIVE:
        return (
          <div className="bg-green-500 text-xs leading-none text-white px-1 py-[4px] rounded-2xl">
            Active
          </div>
        );
      case PageStatus.ARCHIVED:
        return (
          <div className="bg-orange-400 text-xs leading-none text-white px-1 py-[4px] rounded-2xl">
            Archived
          </div>
        );
      default:
        return (
          <div className="bg-orange-400 text-xs leading-none text-white px-1 py-[4px] rounded-2xl">
            Inactive
          </div>
        );
    }
  };

  const handleArchivePage = () => {
    updatePageStatus.mutate(
      {
        status:
          info.status !== PageStatus.ARCHIVED
            ? PageStatus.ARCHIVED
            : PageStatus.INACTIVE,
      },
      {
        onSuccess: (data) => {
          if (data) setOpen(false);
          props.onDataUpdate?.();
        },
        onError(error) {
          console.log(error);
        },
      }
    );
  };
  return (
    <div className={`bg-white rounded-md p-3 border-2 relative`}>
      <NavLink to={`/pages/${info._id}`}>
        <div
          className={`flex items-center gap-4 ${view === ViewMode.GRID && 'flex-col md:flex-row'} `}
        >
          <div>
            <div className="relative flex flex-col">
              <Avatar className="h-16 w-16 relative">
                <AvatarFallback className="uppercase bg-blue-50 text-blue-600 text-xl font-medium">
                  {info?.pageProfilePhoto ? (
                    <img
                      className="flex object-cover p-0 m-0  w-full h-full"
                      src={
                        typeof info?.pageProfilePhoto === 'string'
                          ? getPublicImageURL(info?.pageProfilePhoto)
                          : getPublicImageURL(info?.pageProfilePhoto.url)
                      }
                      alt="avatar"
                    />
                  ) : (
                    <div>{info.pageName[0]}</div>
                  )}
                </AvatarFallback>
              </Avatar>
              <div className=" flex justify-center absolute bottom-[-5px] left-[15%] items-center  z-20 ">
                {renderBagde()}
              </div>
            </div>
          </div>

          <div
            className={`w-full flex flex-col justify-between gap-1 ${view === ViewMode.GRID && 'items-center md:items-start'}`}
          >
            <NavLink
              className={`w-full font-bold overflow-hidden overflow-ellipsis whitespace-wrap truncate hover:underline max-w-[260px] ${view === ViewMode.GRID && 'text-center md:text-left'}`}
              to={`/pages/${info._id}`}
            >
              {info.pageName}
            </NavLink>
            <p
              className={`w-full text-description text-sm leading-4 mb-1 md:mb-2.5 ${view === ViewMode.GRID ? 'text-center h-8 line-clamp-2 md:text-left md:h-auto md:line-clamp-1' : 'line-clamp-1'}`}
            >
              {info.pageDescription}
            </p>
            <div
              className={`flex ${view === ViewMode.GRID ? 'gap-3 md:gap-6' : 'gap-6'}`}
            >
              <div className="flex items-center  justify-center sm:justify-end ">
                <Eye
                  color="#969ca9"
                  strokeWidth="3px"
                  className="h-4 w-4 mr-1"
                />
                <p className="text-sm text-description font-medium">10</p>
              </div>
              {/* <!--TODO: Since the payment feature is not going to roll out for initial
            release, we are deleting the revenue displayed on the user page's
            thumbanail!--> */}
              {/* <div className="flex items-center   justify-center sm:justify-end">
              <DollarSign
                color="#969ca9"
                strokeWidth="3px"
                className="h-4 w-4"
              />
              <p className="text-sm font-medium text-description">111.11</p>
            </div> */}
            </div>
          </div>
        </div>
      </NavLink>

      <div
        className={`absolute right-3 ${view === ViewMode.GRID ? 'top-3' : 'top-1/2 transform -translate-y-1/2 '}`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger className="self-start">
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setOpen(!open)}>
              {info.status !== PageStatus.ARCHIVED ? (
                <>
                  <Trash className="mr-3 h-4 w-4" />
                  <span>Delete</span>
                </>
              ) : (
                <>
                  <RotateCcw className="mr-3 h-4 w-4" />
                  <span>Restore</span>
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-[30%] max-h-[90%] flex flex-col">
          <DialogHeader>
            <DialogDescription className="text-center font-bold text-lg">
              {info.status !== PageStatus.ARCHIVED ? (
                <>
                  <p>Are you sure you want to archive this page?</p>
                </>
              ) : (
                <>
                  <p>Are you sure you want to restore this page?</p>
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="flex text-lg justify-center items-center gap-5">
            <Button
              onClick={handleArchivePage}
              className="bg-red-500 text-lg hover:bg-red-800 focus:bg-red-500"
            >
              Yes, I'm sure
            </Button>
            <p onClick={() => setOpen(false)} className="cursor-pointer">
              No, cancel
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileCard;
