import { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import AgencyTab from '../pages/agency-tab';
import SupperAdminTab from '../pages/supper-admins';
import { PermissionAction, Permissions } from '@/data/enums/permissions';
import QueryHook from '@/hooks/queryHook';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTab from '../pages/pages';
import { useLocation } from 'react-router-dom';
import TalentManagersTab from '../pages/talent-managers';
import { useAuthStore } from '@/stores/auth-store';
import { Role } from '@/data/enums/role';
import AllUsersTab from '../pages/all-users';
import InvitedUsersTab from '../pages/invited-users';
import AgencyAdminTab from '../pages/agency-admins-tab';
import _ from 'lodash';
import { UserInviteInput } from '../components/use-invite-user';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

type textType = 'button' | 'search';
export const useUsersUtils = () => {
  const { user } = useAuthStore();
  const userPermissions = user?.permissions || [];
  const { QueryParams, AddQueryParams, MergeQueryParams } = QueryHook();
  const location = useLocation();
  const query = QueryParams;
  const returnTextByTab = useCallback(
    (textType: textType) => {
      switch (query?.tab) {
        case Permissions.SUPER_ADMIN:
          if (textType === 'button') {
            return 'Invite super admin';
          } else if (textType === 'search') {
            return 'Search for super admin';
          }

        case Permissions.AGENCY_ADMIN:
          if (textType === 'button') {
            return 'Invite admin';
          } else if (textType === 'search') {
            return 'Serach for Admin';
          }

        case Permissions.AGENCY:
          if (textType === 'button') {
            return 'Add agency';
          } else if (textType === 'search') {
            return 'Serach for Agency';
          }

        case Permissions.PAGE:
          if (textType === 'button') {
            return 'Add Page';
          } else if (textType === 'search') {
            return 'Serach for Page';
          }
        case Permissions.TALENT_MANAGER:
          if (textType === 'button') {
            return 'Invite Talent Manager';
          } else if (textType === 'search') {
            return 'Serach for Talent Manager';
          }
        case 'ALL_USERS':
          if (textType === 'button') {
            return 'Add User';
          } else if (textType === 'search') {
            return 'Serach for all users';
          }
        case 'ALL_INVITATION':
          if (textType === 'button') {
            return 'Add User';
          } else if (textType === 'search') {
            return 'Serach for invitations';
          }
        default:
          return '';
      }
    },
    [query?.tab]
  );
  const buttonText = returnTextByTab('button');
  const searchInputPlaceholderText = returnTextByTab('search');
  const tabTriggres = useMemo(() => {
    return [
      ...(user?.role.type === Role.SUPER_ADMIN
        ? [
            {
              permission: [
                `${PermissionAction.CREATE}_${Permissions.SUPER_ADMIN}`,
              ],
              value: 'ALL_USERS',
              label: 'All Users',
              component: <AllUsersTab />,
            },
          ]
        : []),
      {
        permission: [`${PermissionAction.CREATE}_${Permissions.SUPER_ADMIN}`],
        value: Permissions.SUPER_ADMIN,
        label: 'Supper Admins',
        component: <SupperAdminTab />,
      },
      {
        permission: [`${PermissionAction.CREATE}_${Permissions.AGENCY_ADMIN}`],
        value: Permissions.AGENCY_ADMIN,
        label: 'Agency Admins',
        component: <AgencyAdminTab />,
      },
      {
        permission: [
          `${PermissionAction.CREATE}_${Permissions.TALENT_MANAGER}`,
        ],
        value: Permissions.TALENT_MANAGER,
        label: 'Talent managers',
        component: <TalentManagersTab />,
      },

      {
        permission: [`${PermissionAction.CREATE}_${Permissions.AGENCY_ADMIN}`],
        value: Permissions.AGENCY,
        label: 'Agencies',
        component: <AgencyTab />,
      },
      {
        permission: [`${PermissionAction.CREATE}_${Permissions.PAGE}`],
        value: Permissions.PAGE,
        label: 'Pages',
        component: <PageTab />,
      },
      ...(user?.role.type === Role.SUPER_ADMIN ||
      user?.role.type === Role.USER_ADMIN
        ? [
            {
              permission: [
                `${PermissionAction.CREATE}_${Permissions.SUPER_ADMIN}`,
                `${PermissionAction.CREATE}_${Permissions.AGENCY_ADMIN}`,
                `${PermissionAction.CREATE}_${Permissions.TALENT_MANAGER}`,
              ],
              value: 'ALL_INVITATION',
              label: 'All Invitations',
              component: <InvitedUsersTab />,
            },
          ]
        : []),
    ];
  }, [location, query.tab]);

  const validateTabsByUserPermissions = useMemo(() => {
    return tabTriggres?.filter((tab) => {
      return userPermissions?.some((permissions) =>
        tab.permission.includes(permissions)
      );
    });
  }, [userPermissions, location, query?.tab]);
  const handleTabChange = (tab: { value: string }) => {
    MergeQueryParams({ tab: tab.value, searchText: '' });
  };
  const currentCreatePermission = useMemo(() => {
    return tabTriggres.find((trigger) => trigger.value === query?.tab)
      ?.permission;
  }, [query]);
  const debounceFn = _.debounce((text: string | undefined) => {
    AddQueryParams({ searchText: text });
  }, 100);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    debounceFn(event.target.value);
  }
  const tabs = useMemo(() => {
    if (validateTabsByUserPermissions?.length > 0) {
      return (
        <Tabs
          activationMode="automatic"
          defaultValue={query?.tab || validateTabsByUserPermissions[0].value}
          className="grow"
        >
          <TabsList className="h-[10]">
            {validateTabsByUserPermissions?.map((tab) => {
              return (
                <TabsTrigger
                  onClick={() => handleTabChange(tab)}
                  value={tab.value}
                  className="pl-0 pb-0  pr-10 flex flex-wrap"
                >
                  <p
                    className={`pb-5  transform transition-transform hover:scale-110 text-sm ${
                      query?.tab === tab?.value
                        ? 'text-[#6941C6] font-bold'
                        : ''
                    }`}
                  >
                    {tab.label}
                    {query?.tab === tab?.value && (
                      <p className="w-full h-[3px] bg-[#6941C6]  absolute bottom-0 left-0"></p>
                    )}
                  </p>
                </TabsTrigger>
              );
            })}
          </TabsList>
          {query?.tab != Permissions.PAGE && (
            <div className="right-0 top-0 w-full justify-between">
              <div className="flex w-full justify-between my-5 gap-6 ">
                <div>
                  <div className="relative w-80">
                    <Search className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-500 left-3" />
                    <Input
                      type="search"
                      placeholder={searchInputPlaceholderText}
                      autoComplete="email"
                      className="pl-12 border-slate-200 "
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <UserInviteInput buttonText={buttonText} />
              </div>
            </div>
          )}
          <div>
            {validateTabsByUserPermissions?.map((content) => {
              return (
                <TabsContent key={content.value} value={content.value}>
                  {content?.component}
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      );
    } else {
      return <div></div>;
    }
  }, [validateTabsByUserPermissions, query.tab, location]);
  useEffect(() => {
    if (!query?.tab && validateTabsByUserPermissions.length) {
      AddQueryParams({ tab: validateTabsByUserPermissions?.[0]?.value });
    }
  }, [location]);
  return {
    buttonText,
    tabs,
    searchInputPlaceholderText,
    currentCreatePermission,
  };
};
