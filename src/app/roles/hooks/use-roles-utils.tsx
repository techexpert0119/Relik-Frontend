import QueryHook from '@/hooks/queryHook';
import { useEffect, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TableComponent from '../table';
import Permissions from '../permisssions';

function UseRolesUtils() {
  const { QueryParams, AddQueryParams } = QueryHook();
  const tabInQuery = QueryParams.tab;
  useEffect(() => {
    if (!tabInQuery) {
      AddQueryParams({ tab: 'ROLES' });
    }
  }, [tabInQuery]);
  const tabs = useMemo(() => {
    return (
      <Tabs
        activationMode="automatic"
        defaultValue={'ROLES'}
        className="grow mt-6"
      >
        <TabsList className="h-[10]">
          <TabsTrigger
            onClick={() => AddQueryParams({ tab: 'ROLES' })}
            value={'ROLES'}
            className="flex flex-col py-0 "
          >
            <p
              className={`pb-5  transform transition-transform hover:scale-110 ${
                tabInQuery === 'ROLES' ? 'text-[#6941C6] font-bold' : ''
              }`}
            >
              Roles
              {tabInQuery === 'ROLES' && (
                <p className="w-full h-[3px] bg-[#6941C6]  absolute bottom-0 left-0"></p>
              )}
            </p>
          </TabsTrigger>
          <TabsTrigger
            onClick={() => AddQueryParams({ tab: 'PERMISSIONS' })}
            value={'PERMISSIONS'}
            className="flex flex-col py-0 "
          >
            <p
              className={`pb-5  transform transition-transform hover:scale-110 ${
                tabInQuery === 'PERMISSIONS' ? 'text-[#6941C6] font-bold' : ''
              }`}
            >
              Permissions
              {tabInQuery === 'PERMISSIONS' && (
                <p className="w-full h-[3px] bg-[#6941C6]  absolute bottom-0 left-0"></p>
              )}
            </p>
          </TabsTrigger>
        </TabsList>

        <hr className="w-1/2" />
        <TabsContent value={'ROLES'}> {<TableComponent />}</TabsContent>
        <TabsContent value={'PERMISSIONS'}>
          <Permissions />
        </TabsContent>
      </Tabs>
    );
  }, [tabInQuery]);

  return [tabs];
}
export default UseRolesUtils;
