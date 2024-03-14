import { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { IAgency } from '@/data/interfaces/agency';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PencilLine } from 'lucide-react';
import { getPublicImageURL } from '@/lib/utils';

const AgencyCard: FC<{ info: IAgency }> = (props) => {
  const { info } = props;
  const navigate = useNavigate();
  return (
    <div className="flex justify-between bg-white rounded-md p-3 border-2">
      <div className="flex flex-wrap items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="uppercase bg-blue-50 text-blue-600 text-xl font-medium">
            {info?.photo ? (
              <img
                className="flex object-fill p-0 m-0  w-full h-full"
                src={getPublicImageURL(info?.photo)}
                alt="avatar"
              />
            ) : (
              <div>{info.businessName[0]}</div>
            )}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-0.5">
          <NavLink
            className="font-bold overflow-hidden overflow-ellipsis whitespace-wrap truncate hover:underline max-w-[260px]"
            to={`/agency/${info._id}`}
          >
            {info.businessName}
          </NavLink>
          <p className="text-description  overflow-hidden overflow-ellipsis whitespace-wrap truncate max-w-[260px]">
            {info?.businessName}
          </p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="self-start">
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => navigate(`/agency/edit/${info?._id}`)}
          >
            <PencilLine className="mr-3 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AgencyCard;
