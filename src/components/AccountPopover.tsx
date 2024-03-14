import { useAuthStore } from '@/stores/auth-store';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronDown, ChevronUp, LogOut, User } from 'lucide-react';
import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getPublicImageURL } from '@/lib/utils';

const AccountPopover = () => {
  const [open, setOpen] = useState(false);
  const { user, logout, agencies } = useAuthStore();
  const close = () => setOpen(false);

  //Please do not remove this part becouse this function is commented
  // const agencyList = [
  //   {
  //     name: 'Personal account',
  //     id: user?.id,
  //   },
  //   ...(agencies?.length
  //     ? agencies?.map((agency: IAgency) => {
  //         return {
  //           name: agency?.businessName,
  //           id: agency?._id,
  //         };
  //       })
  //     : []),
  // ];

  // const hendleChangeAccount = (id: string | undefined) => {
  //   changeAccount.mutate(
  //     { accountId: id },
  //     {
  //       onSuccess: (data) => {
  //         updateUserData({ currentAgency: data?.data?.currentAgency });
  //         navigate('/pages');
  //       },
  //     }
  //   );
  // };

  const findCurrentAgency = useMemo(() => {
    if (user?.currentAgency) {
      return agencies?.find((item) => item?._id === user?.currentAgency);
    }
  }, [user?.currentAgency]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex items-center gap-3">
        {user?.currentAgency ? (
          <Avatar className="h-12 w-12  flex items-center justify-center">
            {findCurrentAgency?.photo ? (
              <img
                className="flex object-cover p-0 m-0  w-full h-full"
                src={getPublicImageURL(findCurrentAgency.photo)}
                alt="avatar"
              />
            ) : (
              <AvatarFallback className="uppercase bg-blue-50 text-blue-600">
                {generateInitials(findCurrentAgency?.businessName)}
              </AvatarFallback>
            )}
          </Avatar>
        ) : (
          <Avatar className="h-12 w-12  flex items-center justify-center">
            {user?.photo ? (
              <img
                className="flex object-cover p-0 m-0  w-full h-full"
                src={getPublicImageURL(user.photo)}
                alt="avatar"
              />
            ) : (
              <AvatarFallback className="uppercase bg-blue-50 text-blue-600">
                {generateInitials(user?.firstName)}
              </AvatarFallback>
            )}
          </Avatar>
        )}

        <div className="flex justify-between items-center gap-4">
          <div className="text-sm hidden md:flex flex-col items-start">
            {user?.currentAgency ? (
              <>
                <p className=" text-[16px] font-bold">
                  {findCurrentAgency?.businessName}
                </p>
              </>
            ) : (
              <>
                <p className=" text-[16px] font-bold">{user?.firstName}</p>
                <p className="text-gray-500 text-[13px]">{user?.email}</p>
              </>
            )}
          </div>

          {!open ? (
            <ChevronDown className="pt-1" />
          ) : (
            <ChevronUp className="pt-1" />
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="flex flex-col gap-2 w-[224px] max-h-[70vh] overflow-y-auto rounded-2xl mt-4 mx-2 px-0"
        onClick={close}
      >
        <Button
          variant="ghost"
          radius="none"
          asChild
          className="justify-start gap-2 px-6 cursor-pointer"
        >
          {user?.isActive ? (
            <NavLink to="/profile/edit">
              <User className="h-4 w-4" /> Profile
            </NavLink>
          ) : (
            <div className="text-gray-400">
              <User className="h-4 w-4" /> Profile
            </div>
          )}
        </Button>
        {/* This menu disabled temporary */}

        {/* {agencies?.length > 0 &&
					agencyList?.map((a) => {
						return (
							<Button
								variant="ghost"
								radius="none"
								asChild
								className="justify-start gap-2 px-6"
							>
								<div
									onClick={() => hendleChangeAccount(a?.id)}
									className={`flex gap-1 items-center cursor-pointer`}
								>
									{a?.id === user?._id ? (
										<>
											<CircleUser className="h-4 w-4" />
											<p
												className={`${
													user?.currentAgency === a?.id ? "font-bold" : ""
												}`}
											>
												{a?.name}
											</p>
										</>
									) : (
										<>
											<Building className="h-4 w-4" />
											<p
												className={`${
													user?.currentAgency === a?.id ? "font-bold" : ""
												}`}
											>
												{a?.name}
											</p>
										</>
									)}
								</div>
							</Button>
						);
					})} */}
        {/* {user?.role?.type != Role?.AGENCY_ADMIN && (
					<>
						<Button
							variant="ghost"
							radius="none"
							asChild
							className="justify-start gap-2 px-6"
						>
							<NavLink to="/agency/create" className="flex gap-1 items-center">
								<BadgePlus className="h-4 w-4" /> Add Agency
							</NavLink>
						</Button>
						<Button
							variant="ghost"
							radius="none"
							asChild
							className="justify-start gap-2 px-6"
						>
							<NavLink to="/agencies" className="flex gap-1 items-center">
								<CircleUserRound className="h-4 w-4" />
								Managed accounts
							</NavLink>
						</Button>
						<Button
							variant="ghost"
							radius="none"
							asChild
							className="justify-start gap-2 px-6"
						>
							<NavLink to="/users" className="flex gap-1 items-center">
								<Users className="h-4 w-4" /> Users
							</NavLink>
						</Button>
					</>
				)} */}

        <Button
          variant="ghost"
          radius="none"
          className="justify-start gap-2 px-6"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default AccountPopover;

export const generateInitials = (name?: string) => {
  let result = '';
  const words = name?.split(' ');

  if (words) {
    if (words.length == 2) {
      result = words[0][0] + words[1][0];
      return result;
    }

    if (words.length > 2 || words.length) {
      result = words[0][0];
      return result;
    }
  }

  return result;
};
